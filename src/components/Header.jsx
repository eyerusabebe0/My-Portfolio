import React, { useEffect, useState } from "react";
import { Menu, X, Home, User, Briefcase, Award, Mail, ExternalLink, FileText } from "lucide-react";

const links = [
  { name: "Intro", id: "home", icon: Home },
  { name: "About", id: "about", icon: User },
  { name: "Work", id: "work", icon: Briefcase },
  { name: "Certificates", id: "certificates", icon: Award },
  { name: "Contact", id: "contact", icon: Mail },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleScroll = (id) => {
    setOpen(false);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full h-14 bg-[var(--bg)]/95 backdrop-blur border-b border-[var(--line)] flex items-center justify-between px-5 z-50">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--accent)] active:scale-95"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* OVERLAY (mobile) */}
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden" />
      )}

      {/* SIDEBAR / RAIL */}
      <aside
        className={`group fixed top-0 left-0 h-full z-50 bg-[var(--bg)] border-r border-[var(--line)]
          flex flex-col justify-between transition-[width] duration-300 ease-out overflow-hidden pointer-events-auto
          md:w-[72px] md:hover:w-64
          ${open ? "w-64" : "w-0 md:w-[72px]"}`}
      >
        <div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="md:hidden absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] active:scale-95"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* logo mark, desktop only */}
          <div className="hidden md:flex items-center h-14 px-6">
          
          </div>

          <nav className="mt-6 md:mt-2 flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleScroll(link.id)}
                  className="relative flex w-full items-center gap-4 px-6 py-3.5 text-left whitespace-nowrap rounded-r-lg transition-colors hover:bg-[var(--surface)] active:scale-[0.99]"
                >
                  <span
                    className={`shrink-0 flex items-center justify-center transition-colors ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text)]"
                    }`}
                  >
                    <Icon size={19} />
                  </span>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      isActive ? "text-[var(--text)]" : "text-[var(--text-muted)]"
                    } ${
                      open
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:delay-75"
                    }`}
                  >
                    {link.name}
                  </span>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2.5px] rounded-r bg-[var(--accent)] shadow-[0_0_8px_rgba(204,155,61,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-1 pb-6">
          {[
            { href: "/resume.pdf", icon: FileText, label: "Resume", external: true },
            { href: "https://github.com/eyerusabebe0", icon: ExternalLink, label: "GitHub", external: true },
            { href: "mailto:eyerusabebe0@gmail.com", icon: Mail, label: "Email", external: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 px-6 py-3 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors whitespace-nowrap"
            >
              <span className="shrink-0">
                <item.icon size={17} />
              </span>
              <span
                className={`text-sm transition-all duration-300 ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:delay-75"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Header;