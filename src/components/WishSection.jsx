import { motion, useReducedMotion } from 'framer-motion';
import { WISH_MESSAGE, NAMES } from '../data/constants';

export default function WishSection() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <section id="wish" className="wish-section section-pad">
      <div className="content-wrap">
        <h2 className="section-header">
          <span className="gradient-text">Happy Birthday</span>
        </h2>

        <motion.div
          className="wish-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="wish-icon" role="img" aria-label="Birthday cake">🎂</span>
          <p className="wish-text">{WISH_MESSAGE}</p>
          <p
            style={{
              marginTop: '20px',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-dark)',
              opacity: 0.5,
              textAlign: 'right',
              letterSpacing: '0.3px',
            }}
          >
            — {NAMES.writer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
