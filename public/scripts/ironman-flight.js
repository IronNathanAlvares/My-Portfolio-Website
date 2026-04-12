/* Copied from legacy portfolio root ironman-flight.js to run in Next.js footer */
/**
 * Iron Man Dynamic Flight Animation
 * Features:
 * - Flies across the full footer width continuously
 * - Detects obstacles (footer elements) and dodges them vertically
 * - Returns to original flight path when clear
 * - Smooth physics-based transitions
 * - Respects prefers-reduced-motion
 */

(function(){
  class IronManFlight {
    constructor() {
      this.flyer = null;
      this.img = null;
      this.footer = null;
      this.obstacles = [];
      this.x = -200;
      this.y = 0;
      this.targetY = 0;
      this.velocityY = 0;
      this.speed = 2.5;
      this.dodgeHeight = 60;
      this.easing = 0.01;
      this.maxVelocityY = 3;
      this.animationFrame = null;
      this.isActive = false;
      this.footerWidth = 0;
      this.footerLeft = 0;
      this.prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.init();
    }
    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }
    setup() {
      this.flyer = document.querySelector('.ironman-flyer');
      this.img = this.flyer && this.flyer.querySelector('img');
      this.footer = document.querySelector('.site-footer');
      if (!this.flyer || !this.img || !this.footer) { return; }
      if (this.prefersReducedMotion) { this.img.style.transform = 'translateX(0) translateY(0)'; return; }
      this.identifyObstacles();
      window.addEventListener('resize', () => this.handleResize());
      this.handleResize();
      this.start();
    }
    identifyObstacles() {
      const footerInner = this.footer.querySelector('.footer-inner');
      const footerCopy = this.footer.querySelector('.footer-copy');
      this.obstacles = [];
      if (footerInner) {
        const links = footerInner.querySelectorAll('.footer-link, .footer-icon');
        links.forEach(link => this.obstacles.push(link));
        const footerLeft = footerInner.querySelector('.footer-left');
        const footerRight = footerInner.querySelector('.footer-right');
        if (footerLeft) this.obstacles.push(footerLeft);
        if (footerRight) this.obstacles.push(footerRight);
      }
      if (footerCopy) { this.obstacles.push(footerCopy); }
    }
    handleResize() {
      const rect = this.footer.getBoundingClientRect();
      this.footerWidth = rect.width;
      this.footerLeft = rect.left;
    }
    start() { if (this.isActive) return; this.isActive = true; this.animate(); }
    stop() { this.isActive = false; if (this.animationFrame) cancelAnimationFrame(this.animationFrame); }
    checkObstacles() {
      const flyerRect = this.flyer.getBoundingClientRect();
      const ironManLeft = flyerRect.left + this.x;
      const ironManRight = ironManLeft + 64;
      const ironManTop = flyerRect.top + this.y;
      const ironManBottom = ironManTop + 64;
      for (const obstacle of this.obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();
        const horizontalOverlap = ironManRight > obstacleRect.left - 40 && ironManLeft < obstacleRect.right + 40;
        if (horizontalOverlap) {
          const verticalOverlap = ironManBottom > obstacleRect.top && ironManTop < obstacleRect.bottom;
          if (verticalOverlap) return true;
        }
      }
      return false;
    }
    animate() {
      if (!this.isActive) return;
      this.x += this.speed;
      if (this.x > this.footerWidth + 200) { this.x = -200; }
      const shouldDodge = this.checkObstacles();
      this.targetY = shouldDodge ? -this.dodgeHeight : 0;
      const dy = this.targetY - this.y;
      this.velocityY += dy * this.easing;
      this.velocityY *= 0.85;
      this.velocityY = Math.max(-this.maxVelocityY, Math.min(this.maxVelocityY, this.velocityY));
      this.y += this.velocityY;
      this.img.style.transform = `translateX(${this.x}px) translateY(${this.y}px)`;
      this.animationFrame = requestAnimationFrame(() => this.animate());
    }
  }
  let ironManFlight = null;
  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => { ironManFlight = new IronManFlight(); window.ironManFlight = ironManFlight; });
    } else {
      ironManFlight = new IronManFlight();
      window.ironManFlight = ironManFlight;
    }
  }
})();