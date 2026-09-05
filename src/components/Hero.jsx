import { motion } from "framer-motion";
import { FlowButton } from "./ui/flow-button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

// Code lines to display in the hero window
const codeLines = [
  { num: 1, content: <span className="c-comment">// crafting digital experiences</span> },
  { num: 2, content: "" },
  { num: 3, content: <><span className="c-keyword">const</span> <span className="c-accent">developer</span> <span className="c-bracket">=</span> <span className="c-bracket">{"{"}</span></> },
  { num: 4, content: <>&nbsp;&nbsp;<span className="c-property">name</span><span className="c-bracket">:</span> <span className="c-string">&apos;Alex Morgan&apos;</span><span className="c-bracket">,</span></> },
  { num: 5, content: <>&nbsp;&nbsp;<span className="c-property">role</span><span className="c-bracket">:</span> <span className="c-string">&apos;Freelance Developer&apos;</span><span className="c-bracket">,</span></> },
  { num: 6, content: <>&nbsp;&nbsp;<span className="c-property">focus</span><span className="c-bracket">:</span> <span className="c-bracket">[</span></> },
  { num: 7, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-string">&apos;React&apos;</span><span className="c-bracket">,</span> <span className="c-string">&apos;Next.js&apos;</span><span className="c-bracket">,</span></> },
  { num: 8, content: <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="c-string">&apos;UI/UX&apos;</span><span className="c-bracket">,</span> <span className="c-string">&apos;Performance&apos;</span></> },
  { num: 9, content: <>&nbsp;&nbsp;<span className="c-bracket">]</span><span className="c-bracket">,</span></> },
  { num: 10, content: <>&nbsp;&nbsp;<span className="c-property">available</span><span className="c-bracket">:</span> <span className="c-value">true</span></> },
  { num: 11, content: <><span className="c-bracket">{"}"}</span><span className="c-bracket">;</span></> },
  { num: 12, content: "" },
  { num: 13, content: <><span className="c-keyword">export default</span> <span className="c-function">createPortfolio</span><span className="c-bracket">(</span><span className="c-accent">developer</span><span className="c-bracket">);</span></> },
];

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero section">
      <div className="hero__inner">
        {/* Text content */}
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="hero__badge-dot" aria-hidden="true" />
            Available for Freelance Projects
          </motion.div>

          <motion.h1
            className="hero__title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            I build digital{" "}
            <span className="hero__title-accent">experiences</span> that turn
            ideas into reality.
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            I&apos;m a freelance web developer focused on creating fast, modern and
            visually compelling websites for brands, startups and businesses.
          </motion.p>

          <motion.div
            className="hero__ctas"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <FlowButton
              text="View My Work"
              variant="accent"
              onClick={scrollToProjects}
            />
            <FlowButton
              text="Let's Talk"
              variant="light"
              onClick={scrollToContact}
            />
          </motion.div>

          <motion.div
            className="hero__status"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            aria-label="Availability status: available for new projects"
          >
            <span className="hero__status-dot" aria-hidden="true" />
            Available for new projects
          </motion.div>
        </div>

        {/* Code visual */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-hidden="true"
        >
          <div className="hero-visual">
            {/* Floating card 1 */}
            <div className="floating-card floating-card--1">
              <div className="floating-card__icon" style={{ background: "rgba(99,102,241,0.15)" }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 2 }}>Performance</div>
                <div style={{ color: "var(--accent-light)" }}>100 / 100</div>
              </div>
            </div>

            {/* Main code window */}
            <div className="code-window">
              <div className="code-window__header">
                <span className="code-window__dot code-window__dot--red" />
                <span className="code-window__dot code-window__dot--yellow" />
                <span className="code-window__dot code-window__dot--green" />
                <span className="code-window__title">portfolio.js</span>
              </div>
              <div className="code-window__body">
                {codeLines.map((line) => (
                  <div key={line.num} className="code-line">
                    <span className="code-line__num">{line.num}</span>
                    <span className="code-line__content">{line.content}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card 2 */}
            <div className="floating-card floating-card--2">
              <div className="floating-card__icon" style={{ background: "rgba(34,197,94,0.15)" }}>
                ✓
              </div>
              <div>
                <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: 2 }}>Project deployed</div>
                <div style={{ color: "#4ade80" }}>nova-landing.vercel.app</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
