import { motion, useReducedMotion } from 'framer-motion';
import { DATES, NAMES } from '../data/constants';

const prefersReducedMotionQuery =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { opacity: 0, y: 22 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
      };

  return (
    <section id="hero" className="hero-section">
      {/* Background image */}
      <img
        src={`${import.meta.env.BASE_URL}hero-photo.jpg`}
        alt={`${NAMES.birthday_person} birthday hero`}
        className="hero-bg"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement.style.background =
            'linear-gradient(135deg, #8A6A52, #5C4433)';
        }}
      />

      {/* Dark overlay for readability */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-eyebrow" variants={itemVariants}>
          we are celebrating
        </motion.p>

        <motion.h1 className="hero-title" variants={itemVariants}>
          Happy Birthday
        </motion.h1>

        <motion.div className="hero-divider" variants={itemVariants} aria-hidden="true" />

        <motion.p className="hero-subtitle" variants={itemVariants}>
          to the love of my life
        </motion.p>

        <motion.p className="hero-date" variants={itemVariants}>
          {DATES.birthday}, {DATES.year}
        </motion.p>

        <motion.a
          href="#story"
          className="hero-cta"
          variants={itemVariants}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Scroll for our story
        </motion.a>
      </motion.div>
    </section>
  );
}
