import React from "react";

function Footer() {
  return (
     <footer className="w-full border-t border-white/10 bg-[#0b1f16] mt-auto">
           <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center text-center gap-6 relative">

        <div >

             <h2 className="text-2xl md:text-3xl font-bold text-white">
            Let’s <span className="text-[#eab308]">Keep in Touch</span>
          </h2>
          <p className="text-white/60 text-sm mt-2">
            I’m always open to new opportunities, internships, and collaborations.
          </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">

          <a
            href="mailto:eyerusabebe0@gmail.com"
            className="text-white/70 hover:text-[#eab308] transition"
          >
            📧 Email Me
          </a>

          <a
            href="https://github.com/eyerusabebe0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-[#eab308] transition"
          >
            🐙 GitHub
          </a>

        </div>

        {/* DIVIDER */}
        <div className="w-full border-t border-white/10"></div>

        {/* COPYRIGHT */}
        <p className="text-white/50 text-xs">
          © {new Date().getFullYear()} Eyerusalem Abebe. Built with React & passion.
        </p>

      </div>
    </footer>
  );
}

export default Footer;