'use client';

export default function Languages() {
  const levelMap: Record<string, number> = {
    'C2': 100, 'C1': 90, 'B2': 70, 'B1': 55, 'A2': 30, 'A1': 10, 'A0': 3,
    'native': 100, 'fluent': 90, 'proficient': 80, 'advanced': 70,
    'intermediate': 55, 'conversational': 40, 'basic': 25, 'beginner': 10,
    'novice': 3, 'just-started': 3
  };

  const langs = [
    { name: 'English', level: 'fluent' },
    { name: 'Portuguese', level: 'beginner' },
    { name: 'Spanish', level: 'basic' },
    { name: 'Japanese', level: 'novice' },
    { name: 'Korean', level: 'novice' },
  ];

  const getWidth = (level: string) => {
    return levelMap[level] || 0;
  };

  return (
    <section id="languages" className="section languages">
      <h2>Languages</h2>
      <div className="languages-section" id="languages-before-contact">
        <div className="language-chips">
          {langs.map((l) => (
            <span key={l.name} className="language-chip" data-level={l.level} data-lang={l.name} tabIndex={0} aria-label={`${l.name}: ${l.level}`}>
              <span className="lang-name">{l.name}</span>
              <span className="lang-pill" aria-hidden="true">
                <span className="lang-fill" style={{ width: `${getWidth(l.level)}%` }}></span>
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
