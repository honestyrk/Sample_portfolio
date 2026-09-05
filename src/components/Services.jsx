import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "../data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.article
      className="service-card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      aria-label={`Service: ${service.title}`}
    >
      <div className="service-card__top">
        <span className="service-card__number" aria-hidden="true">
          {service.number}
        </span>
        <div className="service-card__icon-wrap" aria-hidden="true">
          <Icon size={20} strokeWidth={1.75} />
        </div>
      </div>

      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__description">{service.description}</p>

      <div className="service-card__tags" role="list" aria-label="Related technologies">
        {service.tags.map((tag) => (
          <span key={tag} className="service-tag" role="listitem">
            {tag}
          </span>
        ))}
      </div>

      <div
        className="service-card__arrow"
        aria-hidden="true"
      >
        <ArrowUpRight size={16} strokeWidth={2} />
      </div>
    </motion.article>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section" ref={ref} aria-labelledby="services-heading">
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
        >
          What I Offer
        </motion.span>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <motion.h2
            id="services-heading"
            style={{ maxWidth: 520 }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={1}
          >
            What I Can Build For You
          </motion.h2>
          <motion.p
            style={{ maxWidth: 360 }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
          >
            From idea to deployment, I provide end-to-end frontend
            development services tailored to your goals.
          </motion.p>
        </div>

        <div className="services__grid" role="list">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
