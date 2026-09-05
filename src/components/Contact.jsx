import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, GitFork, Globe, Link, ArrowUpRight, CheckCircle } from "lucide-react";
import Button from "./Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@alexmorgan.dev",
    href: "mailto:hello@alexmorgan.dev",
  },
  {
    icon: GitFork,
    label: "GitHub",
    value: "github.com/alexmorgan",
    href: "https://github.com",
  },
  {
    icon: Globe,
    label: "LinkedIn",
    value: "linkedin.com/in/alexmorgan",
    href: "https://linkedin.com",
  },
  {
    icon: Link,
    label: "Instagram",
    value: "@alexmorgan.dev",
    href: "https://instagram.com",
  },
];

const projectTypes = [
  "Select a project type",
  "Landing Page",
  "Web Application",
  "E-Commerce",
  "Portfolio",
  "Dashboard",
  "Website Redesign",
  "Other",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", projectType: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="section" ref={ref} aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact__inner">
          {/* Left: info */}
          <div className="contact__info">
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
            >
              Get In Touch
            </motion.span>

            <motion.h2
              id="contact-heading"
              className="contact__heading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
            >
              Have an idea?{" "}
              <span style={{ color: "var(--accent-light)" }}>
                Let&apos;s build it together.
              </span>
            </motion.h2>

            <motion.p
              className="contact__description"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
            >
              Tell me what you&apos;re working on and let&apos;s turn your idea into a
              polished digital experience. I typically respond within 24 hours.
            </motion.p>

            <motion.div
              className="contact__links"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
              role="list"
              aria-label="Contact links"
            >
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="contact__link-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    <div className="contact__link-icon" aria-hidden="true">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 2, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {link.label}
                      </div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>{link.value}</div>
                    </div>
                    <span className="contact__link-arrow" aria-hidden="true">
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </span>
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Right: form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={4}
          >
            {submitted ? (
              <div className="form-success" role="alert" aria-live="polite">
                <CheckCircle size={20} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Message sent!</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                    Thanks! I&apos;ll get back to you within 24 hours.
                  </div>
                </div>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-project-type" className="form-label">
                    Project Type
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    className="form-control"
                    value={formState.projectType}
                    onChange={handleChange}
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type === "Select a project type" ? "" : type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="form-control"
                    placeholder="Tell me about your project, timeline and budget..."
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  arrow
                  disabled={submitting}
                  aria-label="Send message"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
