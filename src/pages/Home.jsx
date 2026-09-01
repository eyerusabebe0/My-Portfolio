import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { GitBranch, ExternalLink, Mail, Code, Server, Database, Award } from "lucide-react";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const revealVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const allProjects = [
  {
    name: "Bus Ticket",
    type: "Multi-tenant SaaS",
    image: "/busTicket.png",
    description:
      "A booking platform any bus company can run under its own name — schedules, seat maps, and tickets, fully isolated per tenant.",
    stack: ["Next.js", "Node.js", "PostgreSQL","TailwindCSS"],
    links: [
      { label: "Live demo", href: "https://bus-frontend-kappa.vercel.app/" },
      { label: "Frontend", href: "https://github.com/eyerusabebe0/bus-frontend" },
      { label: "Backend", href: "https://github.com/eyerusabebe0/bus-backend" },
    ],
  },
  {
    name: "Cake Hub",
    type: "Multi-tenant SaaS",
    image: "/cakehub.png",
    description:
      "Bakeries get their own branded ordering page under one shared platform — customers order directly from their tenant's shop.",
    stack: ["React", "Node.js", "MongoDB","TailwindCSS"],
    links: [
      { label: "Live demo", href: "https://cake-hub-nu.vercel.app/tenant/jsweet/" },
      { label: "Frontend", href: "https://github.com/eyerusabebe0/Cake-Hub" },
      { label: "Backend", href: "https://github.com/eyerusabebe0/cake-hub-backend" },
    ],
  },
  {
    name: "Nefsyimar",
    type: "Client project",
    image: "/nefsyimar.png",
    description:
      "A quiet, respectful space for families to build memorial pages for people who have passed away. Built end-to-end for a real client.",
    stack: ["Next.js", "Node.js", "PostgreSQL","TailwindCSS"],
    links: [
      { label: "Live site", href: "https://nefsyimar.ruhamus.com/" },
      { label: "Repo", href: "https://github.com/eyerusabebe0/Nefsyimar" },
    ],
  },
  {
    name: "JHAIR E-Commerce",
    type: "Full-stack",
    image: "/hair.jpg",
    description:
      "A full-stack shopping platform for a hair-care brand — product catalog, cart, and checkout flow from front to back.",
    stack: ["React", "Node.js", "MongoDB","TailwindCSS"],
    links: [
      { label: "Live demo", href: "https://jhair-frontend-radw.vercel.app/" },
      { label: "Repo", href: "https://github.com/eyerusabebe0/JHAIR-E-Commerce" },
    ],
  },
  {
    name: "Property System",
    type: "Full-stack",
    image: "/property.jpg",
    description:
      "A platform for listing, browsing, and managing properties for buying and selling, with a full backend behind it.",
    stack: ["React", "Node.js", "MongoDB","TailwindCSS"],
    links: [
      { label: "Live demo", href: "https://property-app-umber.vercel.app/" },
      { label: "Repo", href: "https://github.com/eyerusabebe0/PropertyApp" },
    ],
  },
  {
    name: "Church Website",
    type: "Frontend",
    image: "/church.png",
    description:
      "A full site for a church community — services, events, and information in one place.",
    stack: ["React", "CSS"],
    links: [
      { label: "Live demo", href: "https://church-website-zeta-six.vercel.app/" },
      { label: "Repo", href: "https://github.com/eyerusabebe0/Church-website" },
    ],
  },
  {
    name: "Dentora",
    type: "Frontend",
    image: "/dentora.png",
    description: "A clean, simple site for a dental clinic to present services and take inquiries.",
    stack: ["React","TailwindCSS"],
    links: [
      { label: "Live demo", href: "https://dentora-swart.vercel.app/" },
      { label: "Repo", href: "https://github.com/eyerusabebe0/Dentora" },
    ],
  },
  {
    name: "Gym House Website",
    type: "Frontend",
    image: "/gym.jpg",
    description: "A fitness studio site with a bold, energetic UI to showcase classes and memberships.",
    stack: ["Next.js","TailwindCSS"],
    links: [      { label: "Live demo", href: "https://gym-front-silk.vercel.app/" },
{ label: "Repo", href: "https://github.com/eyerusabebe0/Gym-front" }],
  },
  {
    name: "Personal Finance Tracker",
    type: "Frontend",
    image: "/flow.jpg",
    description: "A tracker for logging income and expenses and visualizing spending habits over time.",
    stack: ["React","TailwindCSS"],
    links: [{ label: "Repo", href: "https://github.com/eyerusabebe0/Personal-Finance-Tracker" }],
  },
];

const skills = [
  { icon: Code, name: "JavaScript" },
  { icon: Code, name: "React" },
  { icon: Code, name: "Next.js" },
  { icon: Code, name: "Tailwind" },
  { icon: Server, name: "Node.js" },
  { icon: Server, name: "Express" },
  { icon: Database, name: "MongoDB" },
  { icon: Database, name: "PostgreSQL" },
    { icon: Database, name: "MySQL" },
];

const certificates = [
  {
    title: "React Development Certificate",
    desc: "Completed a project-based React course at BDU CDC, focused on building real-world applications.",
    href: "/certificates/cert1.jpg",
  },
  {
    title: "AI Hackathon (BDU)",
    desc: "Participated in a 48-hour team hackathon at Bahir Dar Institute of Technology, building AI-based solutions.",
    href: "/certificates/cert2.jpg",
  },
  {
    title: "Sof Omar Technologies",
    desc: "Awarded for completing the Cakhub project with Sof Omar Technologies.",
    href: "/certificates/cert3.png",
  },
];

function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 640 : false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const updateIsMobile = (event) => setIsMobile(event.matches);
    updateIsMobile(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobile);
      return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }

    mediaQuery.addListener(updateIsMobile);
    return () => mediaQuery.removeListener(updateIsMobile);
  }, []);

  const visibleProjects = isMobile && !showAllProjects ? allProjects.slice(0, 4) : allProjects;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    setStatus("sending");
    emailjs
      .send(
        "service_0y4bbx9",
        "template_22dsqqh",
        { from_name: form.name, from_email: form.email, message: form.message },
        "_bwERKvXJMf0AEwCW"
      )
      .then(() => {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setStatus("error");
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-10">
      {/* HERO — compact on mobile, roomier on desktop */}
      <section
        id="home"
        className="min-h-[42vh] sm:min-h-[68vh] md:min-h-[72vh] flex items-center justify-center relative py-8 sm:py-8 md:py-10"
      >
        <div className="absolute -left-16 sm:-left-24 -top-10 w-[260px] sm:w-[420px] md:w-[520px] h-[260px] sm:h-[420px] md:h-[520px] bg-[var(--accent)] opacity-[0.12] blur-[80px] sm:blur-[110px] md:blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute right-0 top-32 w-[160px] sm:w-[240px] md:w-[300px] h-[160px] sm:h-[240px] md:h-[300px] bg-[var(--accent-2)] opacity-[0.08] blur-[70px] md:blur-[110px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto w-full">
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="text-[clamp(1.6rem,6vw,4.8rem)] font-black leading-[0.95] tracking-[-0.03em] sm:tracking-[-0.05em] text-[var(--text)] break-words"
          >
            Hi, I&apos;m <span className="text-[var(--accent)]">Eyerusalem</span>
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="mt-2 sm:mt-4 text-[clamp(0.9rem,2.6vw,2.4rem)] font-medium leading-[1.15] text-[var(--text)] px-2"
          >
            Full-Stack Website Developer
          </motion.p>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="mt-3 sm:mt-5 text-[clamp(0.78rem,1.7vw,1.2rem)] text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto px-4"
          >
            I build clean, functional, user-focused and responsive web applications.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="relative z-20 mt-6 sm:mt-10 flex flex-row items-center justify-center gap-2.5 sm:gap-4 px-4 sm:px-0"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative z-20 flex-1 sm:flex-none sm:w-auto bg-[var(--accent)] text-[var(--bg)] px-4 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-base font-semibold rounded-xl hover:bg-[var(--accent-soft)] transition-all duration-300 ease-out shadow-[0_0_20px_rgba(204,155,61,0.3)] sm:min-w-[180px] text-center whitespace-nowrap pointer-events-auto"
            >
              Hire Me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-20 flex-1 sm:flex-none sm:w-auto border border-[var(--line)] text-[var(--text)] px-4 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-base font-semibold rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 ease-out sm:min-w-[180px] text-center whitespace-nowrap pointer-events-auto"
            >
              View Resume
            </a>
          </motion.div>

          <motion.p
            custom={4}
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="mt-4 sm:mt-8 text-xs sm:text-lg text-[var(--text-muted)] px-4"
          >
            Available for internships &amp; freelance work
          </motion.p>
        </div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="py-14 sm:py-20 md:py-24 border-t border-[var(--line)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={revealVariants}
      >
        <h2 className="font-display text-xl sm:text-2xl text-[var(--accent)] mb-5 sm:mb-6">About</h2>
        <p className="text-[var(--text-muted)] leading-relaxed max-w-2xl text-sm sm:text-base">
          I'm a computer science student at Bahir Dar University who prefers learning by
          shipping. My focus is frontend with React and Next.js, backend by Node.js and
          either PostgreSQL or MongoDB depending on what the project needs. Most of what
          I build is multi-tenant by design — I like solving the harder problem of one
          codebase serving many independent clients, rather than a single one-off site.
        </p>

        {/* SKILLS — card grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          {skills.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2.5 sm:gap-3 bg-[var(--surface)] border border-[var(--line)] rounded-xl p-4 sm:p-5 hover:border-[var(--accent)] hover:bg-[var(--surface-2)] transition-all duration-300 ease-out hover:-translate-y-1"
            >
              <Icon size={20} className="text-[var(--accent)] sm:w-[22px] sm:h-[22px]" />
              <span className="text-xs sm:text-sm text-[var(--text)]">{name}</span>
            </div>
          ))}
        </motion.div>
      </motion.section>

       
            {/* WORK */}
      <motion.section
        id="work"
        className="py-14 sm:py-20 md:py-24 border-t border-[var(--line)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={revealVariants}
      >
        <h2 className="font-display text-xl sm:text-2xl text-[var(--accent)] mb-2">Selected projects</h2>
        <p className="text-[var(--text-muted)] mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base">
          Nine systems built for real users, from schedule-driven booking to a platform
          built to hold someone's memory with care.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[var(--surface)] border border-[var(--line)] rounded-xl overflow-hidden
                transition-all duration-300 hover:border-[var(--accent)]
                hover:shadow-[0_8px_40px_-8px_rgba(204,155,61,0.25)] hover:-translate-y-0.5
                flex flex-col"
            >
              <span className="absolute top-3 right-4 font-display text-4xl font-black text-[var(--line)] group-hover:text-[var(--accent)]/20 transition-colors select-none z-10 hidden sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="w-full shrink-0 aspect-[16/10] overflow-hidden bg-[var(--surface-2)] p-2 sm:p-3 border-b border-[var(--line)] group-hover:border-[var(--accent)]/40 transition-colors">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-3.5 sm:p-6 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-sm sm:text-xl text-[var(--text)] leading-tight">
                    {project.name}
                  </h3>
                </div>
                <span className="text-[10px] sm:text-xs text-[var(--accent-2)] mt-1">
                  {project.type}
                </span>

                <p className="text-[var(--text-muted)] leading-relaxed text-xs sm:text-sm mt-2 sm:mt-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 sm:mt-4">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[9px] sm:text-[11px] text-[var(--text-muted)] border border-[var(--line)] rounded px-1.5 sm:px-2 py-0.5 sm:py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 pt-4 border-t border-[var(--line)]">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                    >
                      {link.label === "Frontend" || link.label === "Backend" || link.label === "Repo" ? (
                        <GitBranch size={14} />
                      ) : (
                        <ExternalLink size={14} />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isMobile && allProjects.length > 4 && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {showAllProjects ? "Show less" : "Show all"}
            </button>
          </div>
        )}
      </motion.section>

      {/* CERTIFICATES */}
      <motion.section
        id="certificates"
        className="py-14 sm:py-20 md:py-24 border-t border-[var(--line)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={revealVariants}
      >
        <h2 className="font-display text-xl sm:text-2xl text-[var(--accent)] mb-6 sm:mb-10">Certificates</h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-4 sm:p-6 hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center">
                  <Award size={16} className="text-[var(--accent)]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-sm sm:text-lg text-[var(--text)] mb-1.5 sm:mb-2 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-3 sm:mb-4">
                    {cert.desc}
                  </p>
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm text-[var(--accent)] hover:text-[var(--accent-soft)] underline underline-offset-4 transition-colors"
                  >
                    View certificate
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="py-14 sm:py-20 md:py-24 border-t border-[var(--line)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={revealVariants}
      >
        <h2 className="font-display text-xl sm:text-2xl text-[var(--accent)] mb-8 sm:mb-10">Contact</h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 sm:space-y-6"
          >
            <p className="text-[var(--text-muted)] leading-relaxed max-w-sm text-sm sm:text-base">
              Have a project in mind, or hiring? Send a message — I read everything myself.
            </p>
            <a
              href="mailto:eyerusabebe0@gmail.com"
              className="flex items-center gap-3 text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm sm:text-base break-all"
            >
              <Mail size={16} className="shrink-0" />
              eyerusabebe0@gmail.com
            </a>
            <a
              href="https://github.com/eyerusabebe0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--text)] hover:text-[var(--accent)] transition-colors text-sm sm:text-base"
            >
              <GitBranch size={16} className="shrink-0" />
              github.com/eyerusabebe0
            </a>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-6"
          >
            <div>
              <input
                name="name"
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--accent)] outline-none py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors text-sm sm:text-base"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--accent)] outline-none py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors text-sm sm:text-base"
                placeholder="Your email"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--accent)] outline-none py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] transition-colors resize-none text-sm sm:text-base"
                placeholder="Your message"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[var(--accent)] text-[var(--bg)] py-3 text-sm font-medium hover:bg-[var(--accent-soft)] transition-colors disabled:opacity-60 rounded-lg"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            {status === "sent" && (
              <p className="text-sm text-[var(--accent)]">Message sent — thanks, I'll reply soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">Something went wrong. Try emailing directly.</p>
            )}
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;