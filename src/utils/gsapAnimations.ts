'use client';

export async function initGSAPAnimations() {
  if (typeof window === 'undefined') return;
  try {
    const gsapMod = await import('gsap');
    const gsap = gsapMod.gsap || (gsapMod as any).default || gsapMod;

    // Simple intro for sections
    const sections = Array.from(document.querySelectorAll('.section')) as HTMLElement[];
    sections.forEach((sec, i) => {
      gsap.fromTo(
        sec,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.1 + i * 0.05, ease: 'power2.out' }
      );
    });
  } catch (e) {
    // gsap not available; ignore
  }
}
