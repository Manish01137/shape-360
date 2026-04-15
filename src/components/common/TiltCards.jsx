import { useEffect } from "react";

const TiltCards = () => {
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      document.querySelectorAll(".tilt-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 400) {
          const rotateX = (dy / rect.height) * -8;
          const rotateY = (dx / rect.width) * 8;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        } else {
          card.style.transform = "";
        }
      });
    };

    const handleMouseLeave = () => {
      document.querySelectorAll(".tilt-card").forEach((card) => {
        card.style.transform = "";
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return null;
};

export default TiltCards;
