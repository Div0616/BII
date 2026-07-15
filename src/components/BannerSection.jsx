import { BANNER_CAPTION } from '../data/constants';

export default function BannerSection() {
  return (
    <section id="banner" aria-label="Photo banner" className="banner-section">
      {/* Background image */}
      <img
        src={`${import.meta.env.BASE_URL}banner-photo.jpg`}
        alt="Banner photo"
        className="banner-bg"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement.style.background =
            'linear-gradient(135deg, #8A6A52 0%, #5C4433 100%)';
        }}
      />

      {/* Overlay */}
      <div className="banner-overlay" aria-hidden="true" />

      {/* Caption */}
      <p className="banner-text">{BANNER_CAPTION}</p>
    </section>
  );
}
