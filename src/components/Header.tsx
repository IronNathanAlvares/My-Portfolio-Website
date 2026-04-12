'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the heavy 3D component so initial hero text renders fast
const IronMan3D = dynamic(() => import('./IronMan3D'), { ssr: false, loading: () => <div className="hero-visual-fallback" aria-hidden="true" /> });

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const text = "RPA/AI Developer and Currently pursuing a MSc in Artificial Intelligence.";
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let i = 0; // current character index
    let mode: 'typing' | 'deleting' = 'typing';
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (mode === 'typing') {
        if (i <= text.length) {
          setDisplay(text.slice(0, i));
          i++;
          const speed = i < 10 ? 90 : i < 30 ? 45 : 26 + Math.random() * 40;
          timeout = setTimeout(tick, speed);
        } else {
          // pause at end then start deleting
          timeout = setTimeout(() => { mode = 'deleting'; tick(); }, 2000);
        }
      } else {
        if (i > 0) {
          setDisplay(text.slice(0, i));
          i--;
          const del = 18 + Math.random() * 28;
          timeout = setTimeout(tick, del);
        } else {
          // pause at empty then start typing again
          timeout = setTimeout(() => { mode = 'typing'; tick(); }, 900);
        }
      }
    };

    tick();
    return () => { if (timeout) clearTimeout(timeout); };
  }, []);

  return (
    <header className="site-header">
      <nav className="nav">
        <a className="site-brand" href="#" aria-label="Automate - Code with Nathan Alvares">
          <Image src="/images/automate-logo.png" alt="Automate & Code with Nathan Alvares" width={160} height={40} className="site-logo" />
        </a>
        <button className="nav-toggle" aria-expanded="false" aria-controls="jarvis-menu-overlay" onClick={onMenuToggle}>
          <span className="btn-text">J.A.R.V.I.S.</span>
        </button>
        <ul id="main-nav" className="nav-list">
          <li><button id="back-to-top" className="nav-btn" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} hidden={true} aria-hidden="true">Back to top</button></li>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certifications</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="hero hero-shell">
        <div className="hero-content">
          <h1 className="hero-heading">Hi, I'm <span className="name repulsor-flicker">Nathan Luis Alvares<span className="repulsor-glow" /></span></h1>
          <h2 className="hero-subline" aria-live="polite">
            <span id="typing-effect">{display}</span><span className="typing-cursor" aria-hidden="true">|</span>
          </h2>
          <p className="hero-tagline">I architect end‑to‑end automations that fuse RPA, AI, and orchestration so people can focus on meaningful work.</p>
          <div className="hero-actions" role="group" aria-label="Primary actions">
            <a className="cta" href="#contact">Get in touch</a>
            <a className="cta cta-secondary" href="/CV_file/Nathan Luis Alvares - MSc AI - Available September 2025 CV.pdf" download>Download CV</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hud-rings">
            <span className="hud-ring ring-a" />
            <span className="hud-ring ring-b" />
            <span className="hud-core" />
          </div>
          <IronMan3D id="ironman-hero" scale={1.0} />
        </div>
      </div>
    </header>
  );
}
