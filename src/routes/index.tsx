import { useMemo, useState, useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import profileImg from "@/assets/profile.jpeg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Mail, Phone, MapPin, Linkedin, Download, ArrowRight, Code2, Layers,
  Zap, GitBranch, Briefcase, GraduationCap, Award, Languages, Github,
  ExternalLink, Folder, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight, X,
} from "lucide-react";

type Project = {
  title: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
  demo?: string;
  github?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "BRIAPI Dashboard",
    role: "Frontend Developer · PT Bank Rakyat Indonesia",
    period: "Sep 2022 – Sep 2025",
    description:
      "Dashboard web internal untuk produk digital perbankan BRI yang digunakan oleh tim partner & internal untuk monitoring transaksi, pengelolaan API key, serta laporan finansial real-time.",
    highlights: [
      "Implementasi UI sesuai design system & Figma dengan akurasi visual tinggi",
      "State management kompleks menggunakan Redux & Redux Toolkit",
      "Integrasi RESTful API dengan error handling yang stabil",
      "Optimasi performance: code splitting, reusable components, lazy loading",
      "CI/CD pipeline via Jenkins, kolaborasi lintas tim (BE, QA, DevOps)",
    ],
    stack: ["Next.js", "React.js", "TypeScript", "Redux Toolkit", "RESTful API", "Jenkins"],
    featured: true,
  },
  {
    title: "Neo Production",
    role: "full Stack Developer · Neo Production",
    period: "Aug 2024 – Sep 2025",
    description:
      "Situs resmi perusahaan event organizer & paket wisata di Indonesia. Website company profile yang menampilkan layanan, portofolio event, serta katalog paket wisata dengan fokus pada konversi & SEO.",
    highlights: [
      "Desain responsif mobile-first untuk pengalaman optimal di semua device",
      "Optimasi SEO on-page dengan meta tags dinamis & structured data",
      "Page speed tinggi via image optimization & static generation",
      "Komponen reusable untuk maintenance & scalability jangka panjang",
    ],
    stack: ["Next.js", "React.js", "Tailwind CSS", "SEO", "Responsive Design"],
    demo: "https://neoproduction.co.id",
    featured: true,
  },
  {
    title: "Wedding Invitation — Personal Project",
    role: "full Stack Developer",
    period: "Aug 2024 – Sep 2025",
    description:
      "Aplikasi web untuk membuat undangan pernikahan secara online dengan desain yang menarik dan fitur interaktif.",
    highlights: [
      "Desain responsif mobile-first untuk pengalaman optimal di semua device",
      "Optimasi SEO on-page dengan meta tags dinamis & structured data",
      "Page speed tinggi via image optimization & static generation",
      "Komponen reusable untuk maintenance & scalability jangka panjang",
      "Fitur interaktif seperti RSVP, galeri foto, dan peta lokasi acara",
    ],
    stack: ["TypeScript", "JavaScript", "Tailwind CSS", "SEO", "Responsive Design"],
    demo: "https://the-wedding-onggi-resti.vercel.app",
    featured: true,
  },
  {
    title: "Developers BRI",
    role: "frontend Developer & Drupal CMS Developer · PT Bank Rakyat Indonesia",
    period: "2023 – 2024",
    description:
      "Pengembangan & kustomisasi Content Management System berbasis Drupal untuk kebutuhan publikasi internal perusahaan, termasuk modul custom & integrasi dengan sistem internal.",
    highlights: [
      "Custom module Drupal sesuai workflow internal",
      "Integrasi dengan layanan backend internal",
      "Theme kustom yang konsisten dengan brand guideline",
    ],
    stack: ["Drupal", "PHP", "Twig", "MySQL"],
    demo: "https://developers.bri.co.id/id",
    featured: true,
  },
  {
    title: "Backend Service — Golang",
    role: "Backend Developer",
    period: "2023 – 2025",
    description:
      "Pengembangan layanan backend internal menggunakan Golang dengan framework Gin & Fiber untuk mendukung kebutuhan microservice & API internal perusahaan.",
    highlights: [
      "Desain RESTful API performant dengan Gin & Fiber",
      "Integrasi database & validasi request yang aman",
      "Unit testing untuk menjamin kualitas service",
    ],
    stack: ["Golang", "Gin", "Fiber", "REST API", "PostgreSQL"],
    featured: true,
  },
    {
    title: "Digital Sanjaya — Personal Project",
    role: "Full Stack Developer",
    period: "2023 – 2025",
    description:
      "Aplikasi web personal yang menampilkan portofolio dan informasi pribadi terkait jasa yang ditawarkan.",
    highlights: [
      "Desain responsif mobile-first untuk pengalaman optimal di semua device",
      "Optimasi SEO on-page dengan meta tags dinamis & structured data",
      "Page speed tinggi via image optimization & static generation",
      "Komponen reusable untuk maintenance & scalability jangka panjang",
    ],
    stack: ["Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "SEO", "Responsive Design"],
    demo: "https://digital-sanjaya.vercel.app",
    featured: true,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Onggi Sanjaya — Frontend Developer Portfolio" },
      {
        name: "description",
        content:
          "Frontend Developer dengan 2+ tahun pengalaman membangun aplikasi web enterprise menggunakan React.js, Next.js, dan TypeScript.",
      },
      { property: "og:title", content: "Onggi Sanjaya — Frontend Developer" },
      {
        property: "og:description",
        content:
          "Portofolio Onggi Sanjaya — Frontend Developer berpengalaman di enterprise banking & web product.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Portfolio,
});

const skills = {
  Frontend: ["React.js", "Next.js", "TypeScript", "Vue.js", "JavaScript", "HTML5", "CSS3", "Responsive Design"],
  "State Management": ["Redux", "Redux Toolkit", "Context API"],
  Backend: ["Golang (Gin & Fiber)", "Drupal CMS", "RESTful API"],
  Tools: ["Git", "GitHub", "GitLab", "Bitbucket", "Jenkins", "Postman", "Jira"],
  Testing: ["Jest", "Enzyme", "Cypress", "Selenium"],
  Performance: ["Lighthouse", "Web Vitals", "Code Splitting"],
};

function Portfolio() {
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-display font-bold text-lg">
            <span className="text-primary">Onggi Sanjaya</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <Button asChild size="sm" variant="outline">
            <a href="/CV_Onggi_Sanjaya.pdf" download>
              <Download className="size-4" /> CV
            </a>
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-primary)", opacity: 0.12 }}
        />
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-12 items-center relative">
          <div className="space-y-6 animate-[fade-up_0.7s_ease-out]">
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 border border-primary/20">
              <span className="size-2 rounded-full bg-primary mr-2 animate-pulse" />
              Available for opportunities
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
              Hi, I'm <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Onggi Sanjaya
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Frontend Developer dengan <span className="text-foreground font-semibold">2+ tahun</span> pengalaman membangun aplikasi web berbasis produk di lingkungan enterprise banking. Mahir dalam{" "}
              <span className="text-primary font-medium">React.js</span>,{" "}
              <span className="text-primary font-medium">Next.js</span>, dan integrasi RESTful API.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full shadow-[var(--shadow-glow)]">
                <a href="#contact">
                  Get in touch <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#projects">View work</a>
              </Button>
            </div>
            <div className="flex items-center gap-5 text-muted-foreground pt-4">
              <a href="mailto:onggisanjaya@gmail.com" className="hover:text-primary transition-colors"><Mail className="size-5" /></a>
              <a href="https://wa.me/6289531310890" className="hover:text-primary transition-colors"><Phone className="size-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="size-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Github className="size-5" /></a>
            </div>
          </div>
          <div className="relative animate-[float_6s_ease-in-out_infinite] mx-auto md:mx-0">
            <div
              className="absolute inset-0 rounded-3xl blur-2xl"
              style={{ background: "var(--gradient-primary)", opacity: 0.4 }}
            />
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-[var(--shadow-elegant)]">
              <img src={profileImg} alt="Onggi Sanjaya" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="About" title="A little about me" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <FeatureCard
              icon={<Code2 className="size-6" />}
              title="Product-focused"
              text="Membangun aplikasi web yang dipakai langsung pengguna di lingkungan enterprise banking."
            />
            <FeatureCard
              icon={<Layers className="size-6" />}
              title="Pixel-perfect UI"
              text="Implementasi UI/UX dengan akurasi visual tinggi sesuai design system & Figma."
            />
            <FeatureCard
              icon={<Zap className="size-6" />}
              title="Performance-driven"
              text="Code splitting, reusable components, dan optimasi rendering untuk pengalaman cepat."
            />
          </div>

          {/* PROFILE GALLERY */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-2">Galeri Foto</h3>
            <p className="text-center text-muted-foreground mb-8 text-sm">
              Klik foto untuk memperbesar
            </p>
            <ProfileGallery />
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Experience" title="Where I've worked" />
          <Card className="mt-12 p-8 md:p-10 border-border/60" style={{ background: "var(--gradient-card)" }}>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center">
                    <Briefcase className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Frontend Developer</h3>
                    <p className="text-primary font-medium">PT Bank Rakyat Indonesia (BRI)</p>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Sep 2022 – Sep 2025</p>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Mengembangkan & memelihara dashboard web Next.js / React.js untuk produk digital perbankan (BRIAPI Dashboard).",
                "Mengimplementasi UI/UX dengan akurasi visual tinggi sesuai design system & Figma.",
                "Mengelola state aplikasi dengan Redux & Redux Toolkit untuk data kompleks.",
                "Integrasi RESTful API untuk data finansial real-time, dengan error handling yang stabil.",
                "Menerapkan best practice performance: code splitting, reusable components, optimasi rendering.",
                "Berkolaborasi dengan Backend, UI/UX, QA, dan DevOps. CI/CD via Jenkins.",
                "Tambahan: pengembangan Drupal CMS & backend Golang (Gin & Fiber) untuk kebutuhan internal.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader eyebrow="Skills" title="Tools & Technologies" />
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {Object.entries(skills).map(([category, list]) => (
              <Card key={category} className="p-6 border-border/60" style={{ background: "var(--gradient-card)" }}>
                <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="size-4 text-primary" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {list.map((s) => (
                    <Badge key={s} variant="secondary" className="rounded-full bg-primary/10 text-foreground border border-primary/20 hover:bg-primary/20 transition-colors">
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ProjectsSection />

      {/* EDUCATION + CERTS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <Card className="p-8 border-border/60" style={{ background: "var(--gradient-card)" }}>
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <GraduationCap className="size-5 text-primary" /> Education
            </h3>
            <div className="space-y-5">
              <div>
                <p className="font-semibold">Universitas Terbuka</p>
                <p className="text-sm text-muted-foreground">Teknologi Informasi · 2024 – 2025</p>
              </div>
              <div>
                <p className="font-semibold">Cronos Studio Indonesia</p>
                <p className="text-sm text-muted-foreground">Bootcamp Fundamental Frontend Engineer · 2021 – 2022</p>
              </div>
            </div>
          </Card>
          <Card className="p-8 border-border/60" style={{ background: "var(--gradient-card)" }}>
            <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
              <Award className="size-5 text-primary" /> Certifications
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3"><span className="size-1.5 mt-2 rounded-full bg-primary shrink-0" /> Dicoding · Pemrograman Web</li>
              <li className="flex gap-3"><span className="size-1.5 mt-2 rounded-full bg-primary shrink-0" /> Dicoding · Frontend</li>
              <li className="flex gap-3"><span className="size-1.5 mt-2 rounded-full bg-primary shrink-0" /> Dicoding · React JS</li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border/60">
              <h4 className="font-semibold mb-3 flex items-center gap-2"><Languages className="size-4 text-primary" /> Languages</h4>
              <p className="text-sm text-muted-foreground">Bahasa Indonesia (Native) · English (Intermediate)</p>
            </div>
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          <div
            className="absolute inset-0 blur-3xl -z-10"
            style={{ background: "var(--gradient-primary)", opacity: 0.1 }}
          />
          <Badge variant="secondary" className="rounded-full">Contact</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">Let's build something great</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Tertarik berkolaborasi atau diskusi peluang? Saya siap mendengar.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <ContactCard icon={<Mail className="size-5" />} label="Email" value="onggisanjaya@gmail.com" href="mailto:onggisanjaya@gmail.com" />
            <ContactCard icon={<Phone className="size-5" />} label="WhatsApp" value="+62 895-3131-0890" href="https://wa.me/6289531310890" />
            <ContactCard icon={<MapPin className="size-5" />} label="Location" value="Bogor, Indonesia" />
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Onggi Sanjaya. Crafted with React & passion.
      </footer>

      <WhatsAppFab />
    </div>
  );
}

function WhatsAppFab() {
  const phone = "6289531310890";
  const displayPhone = "+62 895-3131-0890";
  const message = encodeURIComponent(
    "Halo Onggi, saya melihat website portofolio Anda dan tertarik untuk berdiskusi lebih lanjut.",
  );
  const href = `https://wa.me/${phone}?text=${message}`;
  const ariaLabel = `Hubungi Onggi Sanjaya via WhatsApp di ${displayPhone} (membuka WhatsApp di tab baru)`;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            title={ariaLabel}
            role="button"
            className="group fixed bottom-6 right-6 z-50 flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="relative flex items-center justify-center size-14 rounded-full text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-110 active:scale-95 transition-transform border border-primary/40 motion-reduce:transform-none motion-reduce:transition-none"
              style={{ background: "var(--gradient-primary)" }}
            >
              <span
                className="absolute inset-0 rounded-full opacity-50 animate-ping motion-reduce:hidden"
                style={{ background: "var(--gradient-primary)" }}
              />
              <MessageCircle className="relative size-6" strokeWidth={2.25} />
            </span>
            <span className="sr-only">{ariaLabel}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="left" sideOffset={12} className="max-w-xs">
          <p className="font-medium">Chat via WhatsApp</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kirim pesan langsung ke {displayPhone}. Biasanya membalas dalam beberapa jam.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <Badge variant="secondary" className="rounded-full mb-3">{eyebrow}</Badge>
      <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
    </div>
  );
}

function FeatureCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <Card className="p-6 border-border/60 hover:border-primary/40 transition-all hover:-translate-y-1" style={{ background: "var(--gradient-card)" }}>
      <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-display font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </Card>
  );
}

function ProjectsSection() {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.stack.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, []);
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.stack.includes(active))),
    [active],
  );

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Projects" title="Selected work" />
        <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
          Beberapa proyek pilihan yang merepresentasikan perjalanan saya sebagai Frontend Developer di lingkungan enterprise & product.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-10" role="tablist" aria-label="Filter proyek berdasarkan teknologi">
          {["All", ...allTags].map((tag) => {
            const isActive = active === tag;
            return (
              <button
                key={tag}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tag)}
                className={
                  "rounded-full px-4 py-1.5 text-xs font-medium border transition-all " +
                  (isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-glow)]"
                    : "bg-primary/5 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground")
                }
              >
                {tag}
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Menampilkan {filtered.length} dari {projects.length} proyek
        </p>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {filtered.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        ) : (
          <Card className="mt-8 p-10 text-center border-border/60" style={{ background: "var(--gradient-card)" }}>
            <p className="text-muted-foreground">Tidak ada proyek dengan teknologi <span className="text-foreground font-medium">{active}</span>.</p>
            <Button variant="outline" size="sm" className="mt-4 rounded-full" onClick={() => setActive("All")}>
              Tampilkan semua
            </Button>
          </Card>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { title, role, period, description, highlights = [], stack = [], demo, github, featured } = project ?? ({} as Project);
  return (
    <Card
      className="p-7 border-border/60 hover:border-primary/40 transition-all hover:-translate-y-1 group flex flex-col relative overflow-hidden"
      style={{ background: "var(--gradient-card)" }}
    >
      {featured && (
        <Badge variant="secondary" className="absolute top-4 right-4 rounded-full bg-primary/15 border border-primary/30 text-primary text-[10px] uppercase tracking-wider">
          Featured
        </Badge>
      )}
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary">
          <Folder className="size-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors leading-tight">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{period}</p>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

      <ul className="space-y-2 mb-5">
        {highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-5 mt-auto">
        {stack.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full bg-primary/10 border border-primary/20 text-xs">
            {t}
          </Badge>
        ))}
      </div>

      {(demo || github) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/60">
          {demo && (
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <a href={demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-3.5" /> Live Demo
              </a>
            </Button>
          )}
          {github && (
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="size-3.5" /> Source
              </a>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

function ContactCard({
  icon, label, value, href,
}: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <Card className="p-5 border-border/60 hover:border-primary/40 transition-all hover:-translate-y-1 h-full" style={{ background: "var(--gradient-card)" }}>
      <div className="text-primary mb-2 flex justify-center">{icon}</div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="font-medium text-sm mt-1 break-all">{value}</p>
    </Card>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

// =====================================================================
// PROFILE GALLERY — responsive grid + lightbox modal
// =====================================================================
type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Tailwind aspect ratio class for the thumbnail */
  aspect: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: profileImg,
    alt: "Foto profil Onggi Sanjaya — potret formal",
    caption: "Foto profil utama",
    aspect: "aspect-square",
  },
  {
    src: profileImg,
    alt: "Foto profil Onggi Sanjaya — orientasi portrait",
    caption: "Portrait",
    aspect: "aspect-[3/4]",
  },
  {
    src: profileImg,
    alt: "Foto profil Onggi Sanjaya — landscape crop",
    caption: "Landscape",
    aspect: "aspect-[4/3]",
  },
  {
    src: profileImg,
    alt: "Foto profil Onggi Sanjaya — wide crop",
    caption: "Wide",
    aspect: "aspect-video",
  },
];

function ProfileGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % galleryItems.length));
  }, []);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length,
    );
  }, []);

  // Keyboard navigation when lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, next, prev, close]);

  const current = openIndex !== null ? galleryItems[openIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {galleryItems.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Buka ${item.caption} dalam mode penuh`}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className={`${item.aspect} w-full overflow-hidden`}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-sm font-medium text-foreground">
                {item.caption}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
        <DialogContent
          className="max-w-5xl w-[95vw] p-0 border-border/60 bg-background/95 backdrop-blur-sm overflow-hidden"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {current?.caption ?? "Foto"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {current?.alt ?? ""}
          </DialogDescription>

          {current && (
            <div className="relative">
              <div className="flex items-center justify-center bg-black/40 max-h-[80vh] overflow-hidden">
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                />
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={close}
                aria-label="Tutup galeri"
                className="absolute top-3 right-3 size-10 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="size-5" />
              </button>

              {/* Prev / Next */}
              {galleryItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-11 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-11 grid place-items-center rounded-full bg-background/80 backdrop-blur border border-border hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              {/* Caption + counter */}
              <div className="flex items-center justify-between gap-4 px-5 py-3 border-t border-border/60 bg-card/60 backdrop-blur">
                <p className="text-sm font-medium">{current.caption}</p>
                <p className="text-xs text-muted-foreground tabular-nums">
                  {(openIndex ?? 0) + 1} / {galleryItems.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
