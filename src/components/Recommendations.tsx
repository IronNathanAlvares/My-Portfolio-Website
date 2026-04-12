'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export default function Recommendations() {
  const recs = [
    { name: 'Inacio Fernandes', sub: 'August 10, 2025 - Inacio managed Nathan Luis directly', text: `I had the pleasure of working with Nathan in my Innovation and Presales team, where he consistently showcased exceptional skills and dedication. He contributed meaningfully to multiple POCs and innovative use cases, always bringing fresh ideas and practical solutions. One highlight was when Nathan assisted me during an engineering college workshop to teach students RPA. I was genuinely impressed by his problem-solving abilities when students faced difficulties, as well as his clear and engaging way of explaining complex concepts. Nathan also independently solutioned a project with remarkable attention to detail, ensuring every aspect was thought through and executed perfectly. A fun fact that makes me even prouder - Nathan was my junior in school and higher secondary, and seeing his growth and achievements firsthand has been truly inspiring. His technical expertise, innovative mindset, and ability to work autonomously make him an invaluable asset to any team. I strongly recommend Nathan for any role that values creativity, problem-solving, and precision in execution.` },
    { name: 'Shrigouri Jumnalkar', sub: "July 25, 2025 - Shrigouri was senior to Nathan Luis but didn't manage Nathan Luis directly", text: `Nathan-he's sharp, driven, and genuinely curious about technology. He's got a strong grasp of RPA and has been actively exploring the Microsoft Power Platform, always eager to try out new things and learn on the go. What I appreciate most is how straightforward and clear he is, both in his work and communication. You always know where things stand with him, which makes collaboration easy. He's smart, reliable, and definitely someone to keep an eye on in the automation space.` },
    { name: 'Nilofer Shaikh', sub: 'July 24, 2025 - Nilofer worked with Nathan Luis but on different teams', text: `As someone from the HR team, I didn't work directly with Nathan Alvares but his presence was truly admirable. During his time at Tangentia as an RPA Developer, Nathan consistently stood out for his humility, kindness, and disciplined nature. Despite not being part of the same team, I often observed how respectful and well-mannered he was in his interactions across departments. He carried himself with quiet confidence and always maintained a positive, professional attitude. His balanced technical skill with such a genuine and humble personality makes Nathan someone who leaves a lasting impression, and I'm confident he will continue to bring value and positivity wherever he goes.` },
    { name: 'Abhay Naik', sub: "February 1, 2025 - Abhay was senior to Nathan Luis but didn't manage Nathan Luis directly", text: `Nathan demonstrated a keen interest in RPA development and was always eager to learn new skills. He was a valuable addition to the team and showcased his ability to adapt to challenging situations.` },
    { name: 'Mandar Borkar', sub: 'January 28, 2025 - Mandar worked with Nathan Luis on the same team', text: `I had the pleasure of starting my journey as a trainee alongside Nathan at Tangentia. As we transitioned into Junior Developers, we worked on the same project, which allowed me to witness Nathan's growth firsthand. One of the things I truly admire about Nathan is his dedication to continuously learning new tools and techniques. His curiosity and commitment to staying updated with the latest technologies were always evident. Nathan was also a great teammate. Whenever I faced challenges or had doubts while coding, he was always ready to help. His ability to break down complex problems and explain them clearly made a significant difference in my own learning process.` },
    { name: 'Anushka Bakshi', sub: 'January 14, 2025 - Anushka worked with Nathan Luis on the same team', text: `I had the privilege of working with Nathan, and I can confidently say that he is an exceptional professional in the field of Power Automate and a highly valued member of the Microsoft community. His expertise is evident in the numerous badges and accolades he has earned, showcasing his commitment to continuous learning and excellence. Nathan has an incredible knack for problem-solving. He approaches challenges with a unique perspective, breaking them down into manageable steps and delivering efficient, impactful solutions.` },
    { name: 'Jassim Shaji', sub: 'July 29, 2025 - Jassim worked with Nathan Luis on the same team', text: `Although I haven't had the opportunity to work directly with Nathan, I've consistently heard great things about his contributions especially his work with the Porter Airlines client. My colleague, who collaborated with him closely, spoke highly of his professionalism, clarity in communication, and ability to handle complex use cases with ease.` },
  ];

  // Carousel logic: 3 per slide
  const perSlide = 3;
  const slides = useMemo(() => {
    const out: typeof recs[] = [];
    for (let i = 0; i < recs.length; i += perSlide) out.push(recs.slice(i, i + perSlide));
    return out;
  }, []);

  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import('gsap');
        const gsap = (mod as any).gsap || (mod as any).default || mod;
        if (!mounted || !trackRef.current || !viewportRef.current) return;
        // Use viewport width instead of track width for accurate slide positioning
        const slideWidth = viewportRef.current.clientWidth;
        gsap.to(trackRef.current, { x: -idx * slideWidth, duration: 0.6, ease: 'power2.inOut' });
      } catch {}
    })();
    return () => { mounted = false; };
  }, [idx]);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="recommendations" className="section recommendations">
      <h2>Recommendations</h2>
      <div ref={viewportRef} className="rec-carousel-viewport" style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
        <div ref={trackRef} className="rec-carousel-track" style={{ display: 'flex', width: `${slides.length * 100}%`, transition: 'none' }}>
          {slides.map((group, gi) => (
            <div key={gi} className="rec-slide" style={{ 
              width: `${100 / slides.length}%`, 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '16px',
              padding: '0 4px',
              flexShrink: 0
            }}>
              {group.map((r) => (
                <article key={r.name} className="rec-card">
                  <div className="rec-avatar" aria-hidden="true"></div>
                  <div className="rec-body">
                    <div className="rec-meta">
                      <div className="rec-name">{r.name}</div>
                      <div className="rec-sub">{r.sub}</div>
                    </div>
                    <div className="rec-text"><p>{r.text}</p></div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="rec-controls">
        <button className="rec-prev" onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)} aria-label="Previous">◀</button>
        <div className="rec-dots">
          {slides.map((_, i) => (
            <button 
              key={i} 
              className={`rec-dot ${i === idx ? 'active' : ''}`}
              aria-label={`Go to slide ${i + 1}`} 
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
        <button className="rec-next" onClick={() => setIdx((i) => (i + 1) % slides.length)} aria-label="Next">▶</button>
      </div>
    </section>
  );
}