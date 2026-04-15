import { useEffect } from "react";

const MagneticWrap = () => {
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      document.querySelectorAll(".thm-btn, .nav-cta").forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = 120;

        if (dist < threshold) {
          const pull = (1 - dist / threshold) * 8;
          btn.style.transform = `translate(${dx * pull / threshold}px, ${dy * pull / threshold}px)`;
        } else {
          btn.style.transform = "";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
};

export default MagneticWrap;
