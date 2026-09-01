import React, { useEffect, useRef } from "react";

const DUST_COLORS = ["#CC9B3D", "#5B7CFF", "#F0E4C8", "#2954E5"];
const ORB_COLORS = ["#CC9B3D", "#2954E5"];

function ParticleBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, dpr, dust, orbs, animationId, t = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const dustCount = Math.min(90, Math.floor((width * height) / 18000));
    dust = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.4 + 0.5,
      color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
      phase: Math.random() * Math.PI * 2,
      speed: 0.008 + Math.random() * 0.01,
    }));

    // a handful of large, soft glowing orbs drifting slowly in the background
    const orbCount = 4;
    orbs = Array.from({ length: orbCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      r: 120 + Math.random() * 160,
      color: ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)],
      phase: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.004,
    }));

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    const step = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      // soft glowing orbs, blended additively for a nebula-like feel
      ctx.globalCompositeOperation = "lighter";
      orbs.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.r) o.x = width + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;

        const pulse = 0.85 + Math.sin(t * o.speed + o.phase) * 0.15;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * pulse);
        grad.addColorStop(0, o.color + "22");
        grad.addColorStop(1, o.color + "00");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";

      // connecting constellation lines between nearby dust particles
      for (let i = 0; i < dust.length; i++) {
        for (let j = i + 1; j < dust.length; j++) {
          const a = dust[i];
          const b = dust[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "#5B7CFF";
            ctx.globalAlpha = (1 - dist / 115) * 0.12;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // twinkling dust with gentle magnetic pull toward the cursor
      dust.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (mouse.current.x !== null) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const pull = (150 - dist) / 150;
            p.x += (dx / dist) * pull * 0.6;
            p.y += (dy / dist) * pull * 0.6;
          }
        }

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const twinkle = 0.3 + Math.abs(Math.sin(t * p.speed + p.phase)) * 0.5;
        const glowR = p.r * 3;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        grad.addColorStop(0, p.color + "cc");
        grad.addColorStop(1, p.color + "00");

        ctx.globalAlpha = twinkle;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = Math.min(1, twinkle + 0.3);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) animationId = requestAnimationFrame(step);
    };

    step();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

export default ParticleBackground;