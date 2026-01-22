import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/shapee360.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">

        {/* LOGO */}
        <div className="logo">
          <img src={logo} alt="Shape-360" />
        
        </div>

        {/* LINKS */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)}>Services</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

         
        </nav>

      

        {/* HAMBURGER */}
        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
