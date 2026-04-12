'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [phrase, setPhrase] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [timestamp, setTimestamp] = useState('00:00:00');
  const [command, setCommand] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "J.A.R.V.I.S. ready.",
    "Systems online.",
    "Initializing portfolio activation sequence."
  ];

  const commands = [
    'init_portfolio.sys',
    'loading_user_data...',
    'compiling_assets...',
    'ready_for_activation',
    'awaiting_user_input...'
  ];

  useEffect(() => {
    // Update timestamp
    const timeInterval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimestamp(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    // Type phrases
    let currentPhrase = 0;
    const typePhrase = () => {
      const text = phrases[currentPhrase % phrases.length];
      let i = 0;
      const typing = setInterval(() => {
        if (i <= text.length) {
          setPhrase(text.slice(0, i));
          i++;
        } else {
          clearInterval(typing);
          currentPhrase++;
          setTimeout(typePhrase, 700);
        }
      }, 50);
    };
    typePhrase();

    // Type command line
    let cmdIndex = 0;
    const typeCommands = () => {
      const cmd = commands[cmdIndex % commands.length];
      let charIndex = 0;
      const typing = setInterval(() => {
        if (charIndex < cmd.length) {
          setCommand(cmd.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typing);
          cmdIndex++;
          setTimeout(typeCommands, 1500);
        }
      }, 70);
    };
    setTimeout(typeCommands, 800);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const handleDismiss = () => {
    if (overlayRef.current) {
      overlayRef.current.style.opacity = '0';
      setTimeout(onComplete, 600);
    }
  };

  return (
    <div 
      ref={overlayRef}
      id="arc-intro-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-600"
      onClick={handleDismiss}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          handleDismiss();
        }
      }}
      tabIndex={0}
    >
      <div className="arc-intro-inner relative w-full h-full flex items-center justify-center">
        {/* Left HUD Panel */}
        <div className="hud-panel hud-left" aria-hidden="true">
          <div className="hud-section">
            <div className="hud-title">SYSTEM STATUS</div>
            <div className="hud-item">
              <span className="hud-label">Power Core:</span>
              <span className="hud-value hud-success">ONLINE</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Repulsors:</span>
              <span className="hud-value hud-success">CHARGING</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">AI System:</span>
              <span className="hud-value hud-success">ACTIVE</span>
            </div>
          </div>

          <div className="hud-section">
            <div className="hud-title">DIAGNOSTICS</div>
            <div className="hud-progress-bar">
              <div className="hud-progress-label">Core Temp</div>
              <div className="hud-progress-track">
                <div className="hud-progress-fill" style={{ width: '78%' }}></div>
              </div>
              <div className="hud-progress-value">78°C</div>
            </div>
            <div className="hud-progress-bar">
              <div className="hud-progress-label">Energy</div>
              <div className="hud-progress-track">
                <div className="hud-progress-fill" style={{ width: '92%' }}></div>
              </div>
              <div className="hud-progress-value">92%</div>
            </div>
          </div>

          <div className="hud-section">
            <div className="hud-title">PROTOCOLS</div>
            <div className="hud-list">
              <div className="hud-list-item">► Portfolio Init</div>
              <div className="hud-list-item">► User Interface</div>
              <div className="hud-list-item">► Navigation Ready</div>
            </div>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="hud-panel hud-right" aria-hidden="true">
          <div className="hud-section">
            <div className="hud-title">ALVARES INDUSTRIES</div>
            <div className="hud-item">
              <span className="hud-label">Version:</span>
              <span className="hud-value">Mark MSc AI</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Build:</span>
              <span className="hud-value">2026.08.01 (Graduation)</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Status:</span>
              <span className="hud-value hud-success">LEARNING MODE</span>
            </div>
          </div>

          <div className="hud-section">
            <div className="hud-title">PERFORMANCE</div>
            <div className="hud-metrics">
              <div className="hud-metric">
                <div className="metric-value">98%</div>
                <div className="metric-label">Efficiency</div>
              </div>
              <div className="hud-metric">
                <div className="metric-value">2.5s</div>
                <div className="metric-label">Load Time</div>
              </div>
            </div>
          </div>

          <div className="hud-section">
            <div className="hud-title">LOCATION</div>
            <div className="hud-item">
              <span className="hud-label">Region:</span>
              <span className="hud-value">Ireland</span>
            </div>
            <div className="hud-item">
              <span className="hud-label">Time Zone:</span>
              <span className="hud-value">GMT+0</span>
            </div>
          </div>
        </div>

        {/* Top Status Bar */}
        <div className="hud-status-bar" aria-hidden="true">
          <span className="hud-status-item">A.C.W.N.A. v3.0</span>
          <span className="hud-status-item hud-separator">|</span>
          <span className="hud-status-item">INITIALIZING SYSTEMS</span>
          <span className="hud-status-item hud-separator">|</span>
          <span className="hud-status-item">{timestamp}</span>
        </div>

        {/* Bottom Command Line */}
        <div className="hud-command-line" aria-hidden="true">
          <span className="hud-prompt">$</span>
          <span className="hud-command">{command}</span>
          <span className="hud-cursor">_</span>
        </div>

        {/* Arc Reactor Outline GIF - positioned behind reactor */}
        <div className="arc-outline-wrap" aria-hidden="true" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}>
          <Image 
            src="/images/jarvis-arc-reactor-outline.gif" 
            alt="Arc outline" 
            width={600}
            height={600}
            className="arc-outline"
            unoptimized
          />
        </div>

        {/* Center: Arc Reactor - centered inside outline */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, calc(-50% + 40px))',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Image 
            src="/images/arc-reactor.gif" 
            alt="Arc Reactor" 
            width={300}
            height={300}
            className="arc-intro-img"
            unoptimized
            priority
          />
          <div className="arc-intro-phrases">
            <span id="intro-phrase" aria-live="polite">{phrase}</span>
          </div>
          <div className="arc-intro-text">
            Activate Portfolio - <span className="arc-intro-blink">Click Anywhere</span>
          </div>
        </div>
      </div>
    </div>
  );
}
