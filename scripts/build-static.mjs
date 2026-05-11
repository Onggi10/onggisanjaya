/**
 * Build script for static deployment to Vercel/GitHub Pages.
 *
 * 1. Runs `vite build` to generate client + SSR worker bundles
 * 2. Loads the SSR worker and renders the home page "/" to HTML
 * 3. Writes the rendered HTML to dist/client/index.html
 * 4. dist/client/ is now a fully static site ready to deploy
 */
import { spawnSync } from "node:child_process";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.cwd());
const clientDir = resolve(root, "dist/client");
const serverEntry = resolve(root, "dist/server/index.js");

console.log("→ Running vite build...");
const build = spawnSync("npx", ["vite", "build"], { stdio: "inherit", shell: true });
if (build.status !== 0) {
  console.error("vite build failed");
  process.exit(build.status ?? 1);
}

if (!existsSync(serverEntry)) {
  console.error(`Server entry not found at ${serverEntry}`);
  process.exit(1);
}

console.log("→ Pre-rendering routes for static export...");

try {
  const mod = await import(pathToFileURL(serverEntry).href);
  const handler = mod.default;
  if (typeof handler?.fetch !== "function") {
    throw new Error("SSR worker did not export a default { fetch } handler");
  }

  const routesToPrerender = ["/"];

  for (const route of routesToPrerender) {
    const url = `http://localhost${route}`;
    const req = new Request(url, { method: "GET" });
    const res = await handler.fetch(req, {}, {});
    const html = await res.text();

    const filename = route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
    const outPath = resolve(clientDir, filename);
    writeFileSync(outPath, html, "utf8");
    console.log(`  ✓ ${route} → ${outPath} (${html.length} bytes)`);
  }

  console.log("\n✓ Static build ready in dist/client/");
  console.log("  Deploy this folder to Vercel, GitHub Pages, Netlify, etc.");
} catch (err) {
  console.error("Pre-render failed:", err);
  process.exit(1);
}
