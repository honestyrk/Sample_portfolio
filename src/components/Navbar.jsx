import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "contact" },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    scrollToSection(href);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className={`navbar${scrolled ? " scrolled" : ""}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      aria-label="Main navigation"
    >
      <div className="navbar__inner">
        {/* Logo */}
        <button
          className="navbar__logo"
          onClick={() => scrollToSection("hero")}
          aria-label="Alex Morgan — home"
        >
          Alex<span>.</span>
        </button>

        {/* Desktop nav */}
        <nav className="navbar__nav" role="navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              className="navbar__link"
              onClick={() => handleNavClick(link.href)}
              aria-label={`Navigate to ${link.label}`}
            >
              {link.label}
            </button>
          ))}
          <div className="navbar__cta">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick("contact")}
              aria-label="Let's work together"
            >
              Let&apos;s Work Together
            </Button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${mobileOpen ? " open" : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden", background: "rgba(10,10,15,0.96)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                className="mobile-menu__link"
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1 }}
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </motion.button>
            ))}
            <Button
              variant="primary"
              className="mobile-menu__cta"
              onClick={() => handleNavClick("contact")}
              aria-label="Let's work together"
            >
              Let&apos;s Work Together
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
