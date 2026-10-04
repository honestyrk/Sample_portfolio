import { motion } from "framer-motion";
import AnimatedButton from "./ui/AnimatedButton";
import LycorisFlower from "./ui/LycorisFlower";

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
  { num: 4, content: <>&nbsp;&nbsp;<span className="c-property">name</span><span className="c-bracket">:</span> <span className="c-string">&apos;Ramkumar&apos;</span><span className="c-bracket">,</span></> },
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
    <section id="hero" className="hero section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Lycoris red-chrome spider lily — WebGL background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <LycorisFlower
          crimson="#e3131b"
          florets={6}
          seed={7}
          alive={true}
          offsetX={0.42}
          offsetY={0.05}
          size={0.95}
          elevation={14}
          spinInit={0.4}
          stemFrac={0.45}
        />
      </div>
      <div className="hero__inner" style={{ position: 'relative', zIndex: 1 }}>
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
            We Build Websites for our{" "}
            <span className="hero__title-accent">Families</span>
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
            <AnimatedButton
              text="Click This"
              onClick={scrollToProjects}
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
      </div>
    </section>
  );
}
