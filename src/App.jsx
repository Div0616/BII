import './index.css';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import BannerSection from './components/BannerSection';
import WishSection from './components/WishSection';
import VoiceSection from './components/VoiceSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Section 1 — Hero (no sticky nav above it) */}
      <HeroSection />

      {/* Sticky navigation — sits just below the hero */}
      <NavBar />

      {/* Section 2 — Our Story */}
      <StorySection />

      {/* Section 3 — Gallery */}
      <GallerySection />

      {/* Section 4 — Banner */}
      <BannerSection />

      {/* Section 5 — Wish Card */}
      <WishSection />

      {/* Section 6 — Voice Note Player */}
      <VoiceSection />

      {/* Footer */}
      <Footer />
    </>
  );
}
