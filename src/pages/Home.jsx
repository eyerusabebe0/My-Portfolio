import React from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Code,
  Cpu,
  Server,
  Database,
  Mail,
  Github,
  ExternalLink,
} from "lucide-react";




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

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  // submit
 const handleSubmit = (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    emailjs
      .send(
        "service_0y4bbx9",   
        "template_22dsqqh",           
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "_bwERKvXJMf0AEwCW"
      )
      .then(() => {
        alert("Message sent successfully ✅");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send message ❌");
      });
  }
};
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">

      
      <div
        className="fixed inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('bg.jpg')",
        }}
      />

      {/* DARK + YELLOW OVERLAY */}
      <div className="fixed inset-0 bg-[#0b1f16]/70 backdrop-blur-sm" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-20 flex flex-col items-center">

        {/* HERO */}
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={fadeUp}
          className="text-center max-w-3xl mb-24"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Hi, I'm <span className="text-[#eab308]">Eyerusalem</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-white/80 mt-3">
            Full-Stack Developer
          </h2>

          <p className="text-white/60 mt-5">
            I build clean, functional, user-focused and responsive web applications.
          </p>
        </motion.section>

        {/* CTA BUTTONS (HIRE ME + RESUME) */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={2}
  variants={fadeUp}
  className="max-w-3xl mb-20 text-center"
>
  <div className="flex flex-col md:flex-row items-center justify-center gap-4">

    {/* HIRE ME BUTTON */}
    <a
      href="#contact"
      className="bg-[#eab308] text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
    >
      Hire Me
    </a>

    {/* RESUME BUTTON */}
    <a
      href="/resume.pdf"
      target="_blank"
      className="border border-white/30 text-white px-6 py-2 rounded-md hover:border-[#eab308] hover:text-[#eab308] transition"
    >
      View Resume
    </a>

  </div>

  <p className="text-white/60 mt-4 text-sm">
    Available for internships & freelance work
  </p>
</motion.section>

        {/* ABOUT */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          variants={fadeUp}
          className="max-w-3xl mb-24"
        >
          <h2 className="text-2xl font-semibold text-[#eab308] mb-4">
            About Me
          </h2>

          <p className="text-white/70 leading-relaxed">
            I am a Computer Science student at Bahir Dar University. I enjoy building real-world web applications. <br /><br /> My focus is frontend development with React and backend with Node.js. I value clean code, simple design, and solving real problems. <br /><br /> Currently improving through projects and consistent practice.
          </p>
        </motion.section>

        {/* SKILLS */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
          variants={fadeUp}
          className="max-w-4xl w-full mb-24"
        >
          <h2 className="text-2xl font-semibold text-[#eab308] mb-6 text-center">
            Skills
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              [Code, "JavaScript"],
              [Cpu, "React"],
              [Cpu, "Next.js"],
              [Code, "Tailwind"],
              [Server, "Node.js"],
              [Server, "Express"],
              [Database, "MongoDB"],
              [Database, "MySQL"],
            ].map(([Icon, name], i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-lg flex flex-col items-center gap-2 hover:bg-white/20 transition"
              >
                <Icon className="text-[#eab308]" />
                <span className="text-white/80">{name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
          variants={fadeUp}
          className="max-w-3xl w-full mb-24"
        >
          <h2 className="text-2xl font-semibold text-[#eab308] mb-6">
          Selected Projects
          </h2>

          <div className="space-y-6">

            {/* PROJECT 1 */}
            <div className="bg-white/10 p-5 rounded-lg border border-white/20">
              <img
                src="/gym.jpg"
                className="rounded mb-3"
              />

              <h3 className="font-semibold">Gym House Website</h3>
              <p className="text-white/70 text-sm">
                Fitness website UI with modern design.
              </p>

              <a
                href="https://github.com/eyerusabebe0/Gym-front"
                className="text-[#eab308] flex items-center gap-2 mt-3"
              >
                <Github size={16} /> GitHub
              </a>
            </div>

            {/* PROJECT 2 */}
            <div className="bg-white/10 p-5 rounded-lg border border-white/20">
            <img
                src="/hair.jpg"
                className="rounded mb-3"
              />
              <h3 className="font-semibold">E-commerce App</h3>
              <p className="text-white/70 text-sm">
                Full-stack shopping platform.
              </p>

              <div className="flex gap-4 mt-3 text-[#eab308]">
                <a href="https://jhair-frontend-radw.vercel.app/" className="flex items-center gap-1">
                  <ExternalLink size={16} /> Demo
                </a>
                <a href="https://github.com/eyerusabebe0/JHAIR-E-Commerce" className="flex items-center gap-1">
                  <Github size={16} /> GitHub
                </a>
              </div>
            </div>

            {/* PROJECT 3 */}
            <div className="bg-white/10 p-5 rounded-lg border border-white/20">
            <img
                src="/property.jpg"
                className="rounded mb-3"
              />
              <h3 className="font-semibold">Property System</h3>
              <p className="text-white/70 text-sm">
               Full stack property buying and selling  platform.
              </p>
              <div className="flex gap-4 mt-3 text-[#eab308]">
               <a href="https://property-app-umber.vercel.app/" className="text-[#eab308] flex items-center gap-1">
                  <ExternalLink size={16} /> Demo
                </a>
              <a href="https://github.com/eyerusabebe0/PropertyApp" className="text-[#eab308] flex items-center gap-2 mt-3">
                <Github size={16} /> GitHub
              </a>
              </div>
            </div>

            <div className="bg-white/10 p-5 rounded-lg border border-white/20">
            <img
                src="/flow.jpg"
                className="rounded mb-3"
              />
              <h3 className="font-semibold">Finance Tracker</h3>
              <p className="text-white/70 text-sm">
               Full stack finance tracker
              </p>

              <a href="https://github.com/eyerusabebe0/Personal-Finance-Tracker" className="text-[#eab308] flex items-center gap-2 mt-3">
                <Github size={16} /> GitHub
              </a>
            </div>


          </div>
        </motion.section>

        {/* CERTIFICATES */}
<motion.section
  id="certificates"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={5}
  variants={fadeUp}
  className="max-w-4xl w-full mb-24"
>
  <h2 className="text-2xl font-semibold text-[#eab308] mb-6 text-center">
    Certificates
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {/* CERT 1 */}
    <div className="bg-white/10 p-5 rounded-lg border border-white/20 hover:bg-white/20 transition">
      <h3 className="font-semibold text-lg mb-2">
        React Development Certificate
      </h3>

      <p className="text-white/70 text-sm mb-3">
        Completed a project-based React course at BDU CDC, focusing on building real-world applications.
      </p>

      <a
        href="/certificates/cert1.jpg"
        target="_blank"
        className="text-[#eab308] text-sm underline"
      >
        View Certificate
      </a>
    </div>

    {/* CERT 2 */}
    <div className="bg-white/10 p-5 rounded-lg border border-white/20 hover:bg-white/20 transition">
      <h3 className="font-semibold text-lg mb-2">
        AI Hackathon (BDU)
      </h3>

      <p className="text-white/70 text-sm mb-3">
        Participated in a 48-hour team hackathon at Bahir Dar Institute of Technology, building innovative AI-based solutions.
      </p>

      <a
        href="/certificates/cert2.jpg"
        target="_blank"
        className="text-[#eab308] text-sm underline"
      >
        View Certificate
      </a>
    </div>

  </div>
</motion.section>
        {/* CONTACT */}
     <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={5}
      variants={fadeUp}
      className="max-w-5xl mx-auto px-4"
    >
      <h2 className="text-3xl font-semibold text-[#eab308] text-center mb-10">
        Contact Me
      </h2>

      {/* GRID LAYOUT */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE - CONTACT INFO */}
        <div className="space-y-6">
          
          {/* EMAIL */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
            <Mail className="text-[#eab308]" />
            <a
              href="mailto:eyerusabebe0@gmail.com"
              className="text-white hover:underline"
            >
              eyerusabebe0@gmail.com
            </a>
          </div>

          {/* GITHUB */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
            <Github className="text-[#eab308]" />
            <a
              href="https://github.com/eyerusabebe0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              github.com/eyerusabebe0
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <input
              name="name"
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
               value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              rows="4"
               value={form.message}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white outline-none"
              placeholder="Your Message"
            />
            {errors.message && (
              <p className="text-red-400 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#eab308] text-black py-2 rounded hover:bg-yellow-400 flex justify-center items-center gap-2"
          >
            <Mail size={16} /> Send Message
          </button>
        </form>
      </div>
    </motion.section>

      </div>
    </div>
  );
}

export default Home;