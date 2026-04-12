'use client';

import { useEffect, useRef, useState } from 'react';
import IntroOverlay from '@/components/IntroOverlay';
import JarvisMenu from '@/components/JarvisMenu';
import Header from '@/components/Header';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Projects from '@/components/Projects';
import Recommendations from '@/components/Recommendations';
import Languages from '@/components/Languages';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParallaxWrapper from '@/components/ParallaxWrapper';
import { initGSAPAnimations } from '@/utils/gsapAnimations';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showJarvis, setShowJarvis] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Initialize GSAP animations after intro
    if (!showIntro && mainRef.current) {
      initGSAPAnimations();
    }
  }, [showIntro, initGSAPAnimations]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const toggleJarvisMenu = () => {
    setShowJarvis((v) => !v);
  };

  const closeJarvisMenu = () => {
    setShowJarvis(false);
  };

  return (
    <>
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      <JarvisMenu isOpen={showJarvis} onClose={closeJarvisMenu} />
      <Header onMenuToggle={toggleJarvisMenu} />
      
      <main ref={mainRef} className="site-main-pad">
        <ParallaxWrapper speed={0.3}>
          <About />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.2}>
          <Education />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.25}>
          <Experience />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.3}>
          <Skills />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.2}>
          <Certifications />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.25}>
          <Projects />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.3}>
          <Recommendations />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.2}>
          <Languages />
        </ParallaxWrapper>
        
        <ParallaxWrapper speed={0.15}>
          <Contact />
        </ParallaxWrapper>
      </main>

      <Footer />
    </>
  );
}