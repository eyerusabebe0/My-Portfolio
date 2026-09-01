import React from "react";
import { Mail, ExternalLink, FileText } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-7 sm:gap-6 text-center sm:text-left">
          <div>
            <h2 className="font-display text-lg sm:text-2xl text-[var(--text)] leading-snug">
              Open to internships and freelance work.
            </h2>
            <p className="text-[var(--text-muted)] text-xs sm:text-sm mt-2 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Based in Bahir Dar, Ethiopia — happy to work with teams anywhere.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <FileText size={16} />
            </a>
            <a
              href="https://github.com/eyerusabebe0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <ExternalLink size={16} />
            </a>
            <a
              href="mailto:eyerusabebe0@gmail.com"
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="mt-9 sm:mt-10 pt-5 sm:pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-xs text-[var(--text-muted)] opacity-70">
            © {new Date().getFullYear()} Eyerusalem Abebe
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;