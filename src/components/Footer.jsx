import { GitFork, Globe, Mail, ArrowUp } from "lucide-react";

const footerLinks = [
  { icon: GitFork, label: "GitHub", href: "https://github.com" },
  { icon: Globe, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@alexmorgan.dev" },
];

const navLinks = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div>
            <div className="footer__logo">
              Alex<span>.</span>
            </div>
            <p className="footer__tagline">
              Building thoughtful digital experiences.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display: "flex",
                gap: "28px",
                listStyle: "none",
                flexWrap: "wrap",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--text-muted)",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "var(--font-primary)",
                      transition: "color 0.2s ease",
                      padding: 0,
                    }}
                    aria-label={`Go to ${link.label}`}
                    onMouseEnter={(e) => (e.target.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="footer__links" role="list" aria-label="Social links">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  role="listitem"
                >
                  <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; 2026 Alex Morgan. All rights reserved.
          </p>
          <button
            className="footer__back-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            Back to top
            <ArrowUp size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
