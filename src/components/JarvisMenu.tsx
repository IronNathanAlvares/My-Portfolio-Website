'use client';

import { useEffect, useState } from 'react';

interface JarvisMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JarvisMenu({ isOpen, onClose }: JarvisMenuProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);

  // Set mounted flag on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    
    // Set initial time
    updateTime();
    
    // Update every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = [
    { name: 'About', href: '#about', status: 'PROFILE DATA', icon: 'M12 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z' },
    { name: 'Education', href: '#education', status: 'ACADEMIC RECORDS', icon: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3z' },
    { name: 'Experience', href: '#experience', status: 'WORK HISTORY', icon: 'M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z' },
    { name: 'Skills', href: '#skills', status: 'CAPABILITIES', icon: 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z' },
    { name: 'Certifications', href: '#certifications', status: 'CREDENTIALS', icon: 'M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 13.5l-3-3L9.41 11 11 12.59 14.59 9 16 10.41l-5 5.09z' },
    { name: 'Projects', href: '#projects', status: 'PORTFOLIO', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
    { name: 'Recommendations', href: '#recommendations', status: 'ENDORSEMENTS', icon: 'M21 6v11a1 1 0 0 1-1 1H8l-5 3V6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1z' },
    { name: 'Languages', href: '#languages', status: 'LANGUAGE SKILLS', icon: 'M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.5 7 12 3.5 19.5 7 12 9.5zM4 9.2v6.8L12 22l8-6V9.2L12 15 4 9.2z' },
    { name: 'Contact', href: '#contact', status: 'COMMUNICATIONS', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (!element) return;
      
      // Get the fixed header height
      const header = document.querySelector('.nav') as HTMLElement;
      const headerHeight = header ? header.offsetHeight : 80;
      
      // Get absolute position from document top by walking up the offset parent chain
      let absoluteTop = 0;
      let currentElement: HTMLElement | null = element;
      while (currentElement) {
        absoluteTop += currentElement.offsetTop;
        currentElement = currentElement.offsetParent as HTMLElement | null;
      }
      
      const offsetPosition = absoluteTop - headerHeight - 12;
      
      // Scroll to position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm transition-opacity duration-400 overflow-y-auto ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className={`jarvis-hud relative w-full min-h-full max-w-4xl mx-auto px-8 py-16 transition-transform duration-400 ${isOpen ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scanlines effect */}
        <div className="jarvis-scanlines absolute inset-0 pointer-events-none opacity-10" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)'
          }}
        />

        {/* Header */}
        <div className="jarvis-header flex justify-between items-start mb-12">
          <div className="jarvis-logo">
            <div className="jarvis-text text-3xl font-bold text-cyan-400 tracking-wider">A.C.W.N.A.</div>
            <div className="jarvis-subtitle text-sm text-cyan-400/70">Automate & Code with Nathan Alvares</div>
          </div>
          <button 
            className="jarvis-close text-cyan-400 hover:text-cyan-300 text-3xl w-12 h-12 flex items-center justify-center border border-cyan-400/30 rounded hover:border-cyan-400/60 transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Status Indicator */}
        <div className="jarvis-status flex items-center gap-3 mb-8">
          <span className="status-indicator w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
          <span className="status-text text-cyan-400 text-sm">SYSTEM ONLINE</span>
        </div>

        {/* Navigation Grid */}
        <nav className="jarvis-sections grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <button
              key={section.name}
              onClick={() => handleLinkClick(section.href)}
              className="jarvis-section-link flex items-center gap-4 p-4 border border-cyan-400/20 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-all group"
            >
              <div className="section-icon w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-cyan-400 group-hover:fill-cyan-300 transition-colors">
                  <path d={section.icon} />
                </svg>
              </div>
              <div className="section-info flex-1 text-left">
                <div className="section-name text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">{section.name}</div>
                <div className="section-status text-cyan-400/60 text-xs">{section.status}</div>
              </div>
              <div className="section-arrow text-cyan-400 text-xl group-hover:translate-x-1 transition-transform">→</div>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="jarvis-footer mt-8 flex justify-between items-center text-cyan-400/70 text-sm">
          <span className="jarvis-timestamp" suppressHydrationWarning>
            {mounted ? currentTime : '--:--:--'}
          </span>
          <span className="jarvis-location">LOCATION: IRELAND</span>
        </div>
      </div>
    </div>
  );
}