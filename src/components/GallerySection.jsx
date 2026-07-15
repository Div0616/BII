import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GALLERY_PHOTOS } from '../data/constants';

// Warm gradient placeholders for missing gallery photos
const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #E8927C 0%, #D46A93 100%)',
  'linear-gradient(135deg, #C97B65 0%, #A85580 100%)',
  'linear-gradient(135deg, #8A6A52 0%, #6B3F3A 100%)',
  'linear-gradient(135deg, #D46A93 0%, #E8927C 100%)',
  'linear-gradient(135deg, #6B3F3A 0%, #8A6A52 100%)',
  'linear-gradient(135deg, #A85580 0%, #C97B65 100%)',
  'linear-gradient(135deg, #E8927C 0%, #8A6A52 100%)',
  'linear-gradient(135deg, #D46A93 0%, #6B3F3A 100%)',
];

function PhotoTile({ photo, index, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const tileVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, delay: index * 0.06 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.06 },
        },
      };

  const isFirst = index === 0;

  return (
    <motion.div
      className="gallery-tile"
      style={{ gridRow: isFirst ? 'span 2' : undefined }}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onClick={() => onClick(index)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${photo.alt}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick(index)}
    >
      {!imgFailed ? (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            minHeight: '160px',
            background: PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'rgba(255,255,255,0.65)',
            fontSize: '11px',
            letterSpacing: '1px',
            fontFamily: 'Montserrat, sans-serif',
          }}
          aria-hidden="true"
        >
          <span style={{ fontSize: '1.8rem', opacity: 0.75 }}>🤍</span>
          <span>memory {index + 1}</span>
        </div>
      )}
    </motion.div>
  );
}

function Lightbox({ photos, selectedIndex, onClose }) {
  const shouldReduceMotion = useReducedMotion();
  const photo = photos[selectedIndex];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        onClick={handleOverlayClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Enlarged view of ${photo.alt}`}
      >
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'relative' }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="lightbox-img"
            onError={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(135deg, #8A6A52, #5C4433)';
              e.currentTarget.style.width = '300px';
              e.currentTarget.style.height = '300px';
            }}
          />
        </motion.div>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          &times;
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClose = useCallback(() => setSelectedIndex(null), []);

  return (
    <section id="gallery" className="gallery-section section-pad">
      <div className="content-wrap">
        <h2 className="section-header">
          <span className="gradient-text">Memories With You</span>
        </h2>

        <div className="gallery-grid">
          {GALLERY_PHOTOS.map((photo, i) => (
            <PhotoTile
              key={i}
              photo={photo}
              index={i}
              onClick={setSelectedIndex}
            />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photos={GALLERY_PHOTOS}
          selectedIndex={selectedIndex}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
