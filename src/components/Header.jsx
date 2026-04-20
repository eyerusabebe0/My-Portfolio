import React, { useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Certificates", id: "certificates" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const handleScroll = (id) => {
    setOpen(false);

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#0b1f16] flex justify-between items-center px-4 py-3 z-50 border-b border-white/10">
      

        <button onClick={() => setOpen(true)}>
          <Menu className="text-[#eab308]" />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50
          bg-[#0b1f16]
          border-r border-white/10
          transition-all duration-300
          flex flex-col pt-20
          overflow-hidden

          md:w-16 md:hover:w-52

          ${open ? "w-64" : "w-0 md:w-16"}
        `}
      >
        {/* CLOSE */}
        <div className="md:hidden absolute top-3 right-3">
          <button onClick={() => setOpen(false)}>
            <X className="text-[#eab308]" />
          </button>
        </div>

        {/* LINKS */}
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleScroll(link.id)}
            className="
              flex items-center gap-3
              px-5 py-4
              text-white/80
              hover:text-white
              hover:bg-white/5
              transition
              text-left
              w-full
            "
          >
            <span className="w-2 h-2 rounded-full bg-[#eab308]"></span>
            <span className="text-sm font-medium">{link.name}</span>
          </button>
        ))}
      </div>

      {/* SPACE */}
      <div className="hidden md:block md:ml-16"></div>
    </>
  );
}

export default Header;