import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "../data/skills";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section" ref={ref} aria-labelledby="skills-heading">
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
        >
          Expertise
        </motion.span>

        <motion.h2
          id="skills-heading"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
        >
          Skills &amp; Technologies
        </motion.h2>

        <motion.p
          style={{ marginTop: 16, maxWidth: 520 }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
        >
          A curated set of tools and technologies I use to design and build
          modern digital experiences.
        </motion.p>

        <div className="skills__grid">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.id}
              className="skill-category"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + 3}
            >
              <div className="skill-category__label" aria-label={`${category.label} skills`}>
                {category.label}
              </div>
              <div className="skill-tags" role="list">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag" role="listitem">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
