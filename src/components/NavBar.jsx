import { useEffect, useRef, useState } from 'react';

const NAV_TABS = [
  { label: 'Home',       id: 'hero'    },
  { label: 'Story',      id: 'story'   },
  { label: 'Gallery',    id: 'gallery' },
  { label: 'Wish',       id: 'wish'    },
  { label: 'Voice Note', id: 'voice'   },
];

export default function NavBar() {
  const [active, setActive] = useState('hero');
  const observerRef = useRef(null);

  useEffect(() => {
    const sectionIds = NAV_TABS.map((t) => t.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-60px 0px 0px 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="nav-bar" aria-label="Page navigation">
      <div className="nav-inner">
        {NAV_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`nav-link ${active === tab.id ? 'active' : ''}`}
            onClick={() => handleClick(tab.id)}
            aria-current={active === tab.id ? 'true' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
