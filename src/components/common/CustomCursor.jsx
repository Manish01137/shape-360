import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    const addHoverListeners = () => {
      const interactiveEls = document.querySelectorAll(
        "a, button, .thm-btn, .hamburger, .swiper-pagination-bullet, input, textarea, select, .project-card, .svc-card, .service-item, .why-card, .process-card, .extra-card, .testimonial-card, .value-card, .info-card, .nav-cta"
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    let animId;
    const animate = () => {
      circle.current.x += (mouse.current.x - circle.current.x) * 0.15;
      circle.current.y += (mouse.current.y - circle.current.y) * 0.15;
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${circle.current.x}px, ${circle.current.y}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    addHoverListeners();
    animId = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${hovered ? "hovered" : ""} ${hidden ? "hidden" : ""}`}
      />
      <div
        ref={circleRef}
        className={`cursor-circle ${hovered ? "hovered" : ""} ${hidden ? "hidden" : ""}`}
      />
    </>
  );
};

export default CustomCursor;
