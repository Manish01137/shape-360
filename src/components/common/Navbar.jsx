import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/shapelogo.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Shape-360 Logo" />
          <span className="logo-text">Shape-360</span>
        </div>

        {/* Navigation */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)}>Services</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          <button className="nav-btn mobile-btn">Get Started</button>
        </nav>

        <button className="nav-btn desktop-btn">Get Started</button>

        {/* Hamburger */}
        <div className={`hamburger ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
