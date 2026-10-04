import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { number: "3", suffix: "+", label: "Years Experience" },
  { number: "20", suffix: "+", label: "Projects Completed" },
  { number: "15", suffix: "+", label: "Happy Clients" },
  { number: "100", suffix: "%", label: "Commitment" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section" ref={ref} aria-labelledby="about-heading">
      <div className="container">
        <div className="about__inner">
          {/* Text */}
          <div className="about__text-content">
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
            >
              About Me
            </motion.span>

            <motion.h2
              id="about-heading"
              className="about__heading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
            >
              A Ramkumar Details is here!
            </motion.h2>

            <motion.p
              className="about__description"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
            >
              I&apos;m Ramkumar, a freelance web developer with over three years of
              experience building high-quality digital products. I specialize in
              frontend development with React and Next.js, turning complex design
              visions into performant, accessible and beautiful websites.
            </motion.p>

            <motion.p
              className="about__description"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
            >
              My approach blends technical precision with an eye for design. I care
              deeply about performance, responsiveness and user experience — because
              great software isn&apos;t just functional, it&apos;s a pleasure to use.
            </motion.p>

            <motion.p
              className="about__description"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={4}
            >
              Whether you&apos;re a startup launching your first product or an
              established brand looking to modernize your web presence, I bring the
              same level of care and craftsmanship to every project.
            </motion.p>
          </div>

          {/* Stats */}
          <div>
            <div className="about__stats" role="list" aria-label="Statistics">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  role="listitem"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i + 2}
                >
                  <div className="stat-item__number" aria-label={`${stat.number}${stat.suffix}`}>
                    {stat.number}
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="stat-item__label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
