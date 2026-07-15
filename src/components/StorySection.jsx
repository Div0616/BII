import { motion, useReducedMotion } from 'framer-motion';
import { TIMELINE_ENTRIES } from '../data/constants';

export default function StorySection() {
  const shouldReduceMotion = useReducedMotion();

  const entryVariants = (i) =>
    shouldReduceMotion
      ? {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.4, delay: i * 0.1 },
          },
        }
      : {
          hidden: { opacity: 0, x: -24 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.1 },
          },
        };

  return (
    <section id="story" className="story-section section-pad">
      <div className="content-wrap">
        <h2 className="section-header">
          <span className="gradient-text">Our Story</span>
        </h2>

        <div className="timeline-wrap">
          <div className="timeline-line" aria-hidden="true" />

          {TIMELINE_ENTRIES.map((entry, i) => (
            <motion.div
              key={i}
              className="timeline-entry"
              variants={entryVariants(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="timeline-dot" aria-hidden="true" />
              <p className="timeline-date">{entry.date}</p>
              <p className="timeline-title">{entry.title}</p>
              {entry.description && (
                <p className="timeline-desc">{entry.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
