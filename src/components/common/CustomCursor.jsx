import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const particles = useRef([]);
  const lightning = useRef([]);
  const frameCount = useRef(0);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseDown = () => {
      // Burst particles on click
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.3;
        const speed = 2 + Math.random() * 4;
        particles.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 1 + Math.random() * 2,
          type: "burst",
        });
      }
      // Create lightning bolts on click
      for (let i = 0; i < 3; i++) {
        createLightning(mouse.current.x, mouse.current.y);
      }
    };

    const addHoverListeners = () => {
      document.querySelectorAll(
        "a, button, .thm-btn, .hamburger, .swiper-pagination-bullet, input, textarea, select, .svc-card, .service-item, .why-card, .process-card, .extra-card, .testimonial-card, .value-card, .info-card, .nav-cta, .hscroll-card, .landing-card, .cs-card, .cs-landing-card, .blog-card, .blog-featured-card, .team-card, .career-card, .pricing-card, .ad-pricing-card, .faq-question, .chatbot-fab"
      ).forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    function createLightning(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const length = 30 + Math.random() * 50;
      const points = [{ x, y }];
      let cx = x, cy = y;
      const segments = 5 + Math.floor(Math.random() * 5);

      for (let i = 0; i < segments; i++) {
        const stepLen = length / segments;
        cx += Math.cos(angle) * stepLen + (Math.random() - 0.5) * 20;
        cy += Math.sin(angle) * stepLen + (Math.random() - 0.5) * 20;
        points.push({ x: cx, y: cy });
      }

      lightning.current.push({ points, life: 1, width: 1 + Math.random() * 1.5 });
    }

    let animId;
    const animate = () => {
      frameCount.current++;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Dot follow
      dotPos.current.x += (mx - dotPos.current.x) * 0.3;
      dotPos.current.y += (my - dotPos.current.y) * 0.3;
      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }

      // === AMBIENT ORB GLOW ===
      const orbRadius = hovered ? 60 : 35;
      const pulse = Math.sin(frameCount.current * 0.03) * 0.3 + 0.7;
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, orbRadius);
      grad.addColorStop(0, `rgba(201, 168, 76, ${0.12 * pulse})`);
      grad.addColorStop(0.5, `rgba(201, 168, 76, ${0.04 * pulse})`);
      grad.addColorStop(1, "rgba(201, 168, 76, 0)");
      ctx.beginPath();
      ctx.arc(mx, my, orbRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // === ELECTRIC ARCS (continuous micro-lightning around cursor) ===
      if (frameCount.current % 3 === 0) {
        const arcCount = hovered ? 3 : 1;
        for (let i = 0; i < arcCount; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = hovered ? 25 + Math.random() * 20 : 15 + Math.random() * 12;
          const sx = mx + Math.cos(a) * r;
          const sy = my + Math.sin(a) * r;
          const ex = mx + Math.cos(a + (Math.random() - 0.5) * 1.5) * (r + 8 + Math.random() * 15);
          const ey = my + Math.sin(a + (Math.random() - 0.5) * 1.5) * (r + 8 + Math.random() * 15);

          ctx.beginPath();
          ctx.moveTo(sx, sy);
          // Jagged line
          const midX = (sx + ex) / 2 + (Math.random() - 0.5) * 10;
          const midY = (sy + ey) / 2 + (Math.random() - 0.5) * 10;
          ctx.lineTo(midX, midY);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = `rgba(201, 168, 76, ${0.3 + Math.random() * 0.3})`;
          ctx.lineWidth = 0.5 + Math.random() * 0.8;
          ctx.stroke();
        }
      }

      // === ORBITING ENERGY DOTS ===
      const orbitCount = hovered ? 6 : 3;
      const orbitR = hovered ? 30 : 18;
      for (let i = 0; i < orbitCount; i++) {
        const baseAngle = (Math.PI * 2 * i) / orbitCount;
        const speed = hovered ? 0.02 : 0.015;
        const a = baseAngle + frameCount.current * speed;
        const wobble = Math.sin(frameCount.current * 0.05 + i) * 4;
        const ox = mx + Math.cos(a) * (orbitR + wobble);
        const oy = my + Math.sin(a) * (orbitR + wobble);
        const dotSize = 1.5 + Math.sin(frameCount.current * 0.08 + i) * 0.8;

        ctx.beginPath();
        ctx.arc(ox, oy, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${0.5 + Math.sin(frameCount.current * 0.06 + i) * 0.3})`;
        ctx.fill();

        // Tiny glow
        ctx.beginPath();
        ctx.arc(ox, oy, dotSize * 3, 0, Math.PI * 2);
        const dGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, dotSize * 3);
        dGrad.addColorStop(0, "rgba(201, 168, 76, 0.15)");
        dGrad.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.fillStyle = dGrad;
        ctx.fill();
      }

      // === CLICK LIGHTNING BOLTS ===
      for (let i = lightning.current.length - 1; i >= 0; i--) {
        const bolt = lightning.current[i];
        bolt.life -= 0.06;
        if (bolt.life <= 0) {
          lightning.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        for (let j = 1; j < bolt.points.length; j++) {
          ctx.lineTo(bolt.points[j].x, bolt.points[j].y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.life * 0.8})`;
        ctx.lineWidth = bolt.width * bolt.life;
        ctx.stroke();

        // Glow layer
        ctx.strokeStyle = `rgba(201, 168, 76, ${bolt.life * 0.4})`;
        ctx.lineWidth = bolt.width * bolt.life * 3;
        ctx.stroke();
      }

      // === CLICK BURST PARTICLES ===
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.025;
        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.life * 0.7})`;
        ctx.fill();

        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life * 4, 0, Math.PI * 2);
        const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.life * 4);
        pGrad.addColorStop(0, `rgba(255, 255, 255, ${p.life * 0.15})`);
        pGrad.addColorStop(1, "rgba(201, 168, 76, 0)");
        ctx.fillStyle = pGrad;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("resize", resize);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    addHoverListeners();
    animId = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [hovered]);

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`cc-canvas ${hidden ? "cc-hidden" : ""}`}
      />
      <div
        ref={dotRef}
        className={`cc-core ${hovered ? "cc-core--hover" : ""} ${hidden ? "cc-hidden" : ""}`}
      />
    </>
  );
};

export default CustomCursor;
