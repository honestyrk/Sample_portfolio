import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import Button from "./Button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      aria-label={`Project: ${project.title} — ${project.subtitle}`}
    >
      {/* Color bar on hover */}
      <div
        className="project-card__color-bar"
        style={{ background: project.color }}
        aria-hidden="true"
      />

      {/* Background gradient on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${project.color}18 0%, transparent 60%)`,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.4s ease",
        }}
        className="project-card__bg"
        aria-hidden="true"
      />

      <div className="project-card__number" aria-hidden="true">
        {project.id}
      </div>

      <span className="project-card__category">{project.category}</span>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__subtitle">{project.subtitle}</p>

      <p className="project-card__description">{project.description}</p>

      <div className="project-card__footer">
        <div className="project-card__tags" role="list" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag" role="listitem">
              {tag}
            </span>
          ))}
        </div>
        <div
          className="project-card__link"
          aria-label={`View ${project.title} project`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter") { /* open project */ } }}
        >
          <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section" ref={ref} aria-labelledby="projects-heading">
      <div className="container">
        <div className="projects__header">
          <div className="projects__header-text">
            <motion.span
              className="section-label"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
            >
              Selected Work
            </motion.span>
            <motion.h2
              id="projects-heading"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
            >
              Projects I&apos;ve Built
            </motion.h2>
            <motion.p
              style={{ marginTop: 12 }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
            >
              A selection of projects I&apos;ve designed and developed — each one
              crafted with attention to detail and a focus on results.
            </motion.p>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={3}
          >
            <Button
              variant="secondary"
              arrow
              onClick={() => {}}
              aria-label="View all projects"
            >
              View All
            </Button>
          </motion.div>
        </div>

        <div className="projects__grid" role="list">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
