import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { VOICE_NOTE_CAPTION } from '../data/constants';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function VoiceSection() {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setPlaying(false);

    const onLoaded = () => {
      setDuration(audio.duration);
      // Attempt autoplay as soon as metadata is ready
      audio.play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          // Autoplay was blocked — wait for first user interaction
          const resumeOnInteraction = () => {
            audio.play()
              .then(() => setPlaying(true))
              .catch(() => { });
            document.removeEventListener('click', resumeOnInteraction);
          };
          document.addEventListener('click', resumeOnInteraction, { once: true });
        });
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => { });
    }
    setPlaying(!playing);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="voice" className="voice-section section-pad">
      <div className="content-wrap">
        <h2 className="section-header">
          <span className="gradient-text">Voice Note</span>
        </h2>

        <motion.div
          className="player-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="player-caption">{VOICE_NOTE_CAPTION}</p>

          {/* Hidden native audio element */}
          <audio ref={audioRef} src="/Standard recording 2.mp3" preload="auto" />

          <div className="player-controls">
            {/* Play / Pause button */}
            <motion.button
              className={`play-btn ${playing ? 'playing' : ''}`}
              onClick={togglePlay}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label={playing ? 'Pause audio' : 'Play audio'}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </motion.button>

            {/* Progress + time */}
            <div className="player-track-wrap">
              <div
                className="progress-bar-track"
                ref={progressRef}
                onClick={handleProgressClick}
                role="slider"
                aria-label="Audio progress"
                aria-valuenow={Math.round(currentTime)}
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                tabIndex={0}
                onKeyDown={(e) => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  if (e.key === 'ArrowRight') audio.currentTime = Math.min(duration, currentTime + 5);
                  if (e.key === 'ArrowLeft') audio.currentTime = Math.max(0, currentTime - 5);
                }}
              >
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="player-times">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
