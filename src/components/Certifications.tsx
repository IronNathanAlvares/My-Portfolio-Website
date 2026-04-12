'use client';

import { useState } from 'react';
import Image from 'next/image';
import AttachmentModal from './AttachmentModal';

export default function Certifications() {
  const [badgesExpanded, setBadgesExpanded] = useState(false);

  const certs = [
    { title: 'Agentic Process Automation Developer Masterclass', org: 'Automation Anywhere', date: 'May 2025', href: 'https://certificates.automationanywhere.com/360fba8a-1524-444a-a6e7-213bee6167c6#acc.ZykhTMgO' },
    { title: 'Agentic Process Automation Leader Masterclass', org: 'Automation Anywhere', date: 'May 2025', href: 'https://certificates.automationanywhere.com/0f8e9618-55fc-4ef8-a9cf-a8e884e0bd6a#acc.PtlJ9zNn' },
    { title: 'Bot Games Challenges', org: 'Automation Anywhere', date: 'Nov 2024 - Present', href: 'https://drive.google.com/drive/folders/1n50Gt0RKd1chBQ9xN4t-d6h-3raJ9nMR' },
    { title: 'Document Automation Masterclass', org: 'Automation Anywhere', date: 'Nov 2024', href: 'https://certificates.automationanywhere.com/67331051-0992-41f6-a77d-58bc7b190a21#acc.wdEukAtO' },
    { title: 'PixieBrix Professional Certification', org: 'PixieBrix', date: 'Sept 2024', href: 'https://pixiebrix.thinkific.com/certificates/gshhp2wnte' },
    { title: 'PixieBrix + AI Certification', org: 'PixieBrix', date: 'Sept 2024', href: 'https://pixiebrix.thinkific.com/certificates/5h5dhrihre' },
    { title: 'UiPath RPA Course Certificates', org: 'Coursera', date: 'July 2024 - Present', href: 'https://drive.google.com/drive/folders/15PJ02_nvxXafnVwl9NXpXk6k6b4NU6ro' },
    { title: 'Microsoft Applied Skills: Create and manage automated processes by using Power Automate', org: 'Microsoft', date: 'Jan 2024', href: 'https://learn.microsoft.com/en-gb/users/nathanluisalvares-4397/credentials/8296f82d5fcf4b1?ref=https%3A%2F%2Fwww.linkedin.com%2F' },
  ];

  const badges = [
    { title: 'APA Developer', org: 'Automation Anywhere', img: '/images/badges/APA Developer.png' },
    { title: 'APA Leader', org: 'Automation Anywhere', img: '/images/badges/APA Leader.png' },
    { title: 'Document Automation', org: 'Automation Anywhere', img: '/images/badges/Document Automation.png' },
    { title: 'PixieBrix + AI Certification', org: 'PixieBrix', img: '/images/badges/PixieBrix + AI Certification.png' },
    { title: 'PixieBrix Professional Certification', org: 'PixieBrix', img: '/images/badges/PixieBrix Certified Professional.png' },
    { title: 'Power Automate Super User Season 1 2024', org: 'Microsoft', img: '/images/badges/2024-s1_badge.png' },
    { title: 'Power Automate Super User Season 2 2024', org: 'Microsoft', img: '/images/badges/2024-s2_badge.png' },
    { title: 'Power Automate Super User Season 1 2025', org: 'Microsoft', img: '/images/badges/2025-s1_badge.png' },
  ];

  return (
    <section id="certifications" className="section certifications">
      <h2>Certifications</h2>
      <div className="cert-grid">
        {certs.map((c) => (
          <div key={c.title} className="cert-card">
            <div className="cert-title">{c.title}</div>
            <div className="cert-org">{c.org}</div>
            <div className="cert-date">{c.date}</div>
            <a className="cert-repulsor" href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`Open certificate ${c.title}`}>🔗</a>
          </div>
        ))}
      </div>

      <div className={`badges-section ${badgesExpanded ? 'expanded' : ''}`} id="badges-section">
        <div className="badges-header">
          <h3>Badges</h3>
          <button 
            id="badges-toggle" 
            className="badges-toggle" 
            aria-expanded={badgesExpanded}
            aria-controls="badges-grid"
            title={badgesExpanded ? "Hide badges" : "Show badges"}
            onClick={() => setBadgesExpanded(!badgesExpanded)}
            suppressHydrationWarning
          >
            <svg className="repulsor-arc" viewBox="0 0 48 48" width="24" height="24" aria-hidden="true" focusable="false">
              <defs>
                <radialGradient id="badge-gradient" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffedb5" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#e74c3c" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#7a0f0f" stopOpacity="0.7" />
                </radialGradient>
              </defs>
              <circle cx="24" cy="24" r="20" fill="url(#badge-gradient)" opacity="0.95" />
              <circle cx="24" cy="24" r="9" fill="#ffecb3" opacity="0.9" />
            </svg>
            <span className="toggle-label">{badgesExpanded ? 'Hide badges' : 'Show badges'}</span>
          </button>
        </div>

        <div id="badges-grid" className="badges-grid" aria-hidden={!badgesExpanded}>
          {badges.map((b) => (
            <div key={b.title} className="badge-card" role="group" aria-label={b.title}>
              <div className="badge-icon" role="img" aria-label={`${b.title} badge`}>
                <Image 
                  src={b.img} 
                  alt={`${b.title} badge`}
                  width={56}
                  height={56}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="badge-title">{b.title}</div>
              <div className="badge-desc">{b.org}</div>
            </div>
          ))}
        </div>
      </div>

      <h3>Awards, Community & Activities</h3>
      <AwardsTimeline />
    </section>
  );
}

// ------------ Awards (sorted latest-first) --------------
type Award = {
  title: string;
  org: string;
  date: string; // e.g. "Feb 2025" or "Oct 2023 - Present"
  desc: string;
  img?: string; // single image
  imgs?: string[]; // multiple images (e.g. badge seasons)
};

function monthToIndex(mon: string): number {
  const map: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    sept: 8,
    oct: 9,
    nov: 10,
    dec: 11,
  };
  return map[mon.toLowerCase()] ?? 0;
}

// Convert the visible date label into a sortable timestamp.
// Strategy: if it's a range like "Mon YYYY - Present", sort by the start month/year;
// otherwise sort by that single month/year. This keeps current activities below
// more recent point-in-time awards (e.g., Feb 2025 > Oct 2023 - Present).
function parseSortDate(label: string): number {
  // Stable (SSR + CSR) parsing: avoid Date.now to prevent hydration diff.
  // Ongoing ("Present") entries get a fixed large sentinel so order is deterministic.
  const PRESENT_SENTINEL = Number.MAX_SAFE_INTEGER - 1000; // big but stable
  const range = /^(\w+)\s+(\d{4})\s*-\s*(Present|(\w+)\s+(\d{4}))$/i;
  const single = /^(\w+)\s+(\d{4})$/i;

  const rangeMatch = label.match(range);
  if (rangeMatch) {
    const startMon = rangeMatch[1];
    const startYear = parseInt(rangeMatch[2], 10);
    const presentLiteral = rangeMatch[3];
    const endMon = rangeMatch[4];
    const endYearStr = rangeMatch[5];
    if (/present/i.test(presentLiteral)) {
      return PRESENT_SENTINEL; // deterministic highest value for ongoing items
    }
    if (endMon && endYearStr) {
      const endMonth = monthToIndex(endMon);
      const endYear = parseInt(endYearStr, 10);
      return new Date(endYear, endMonth, 1).getTime();
    }
    return new Date(startYear, monthToIndex(startMon), 1).getTime();
  }

  const singleMatch = label.match(single);
  if (singleMatch) {
    const mon = singleMatch[1];
    const year = parseInt(singleMatch[2], 10);
    return new Date(year, monthToIndex(mon), 1).getTime();
  }
  return 0;
}

function AwardsTimeline() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewItems, setPreviewItems] = useState<Array<{ type: 'image' | 'pdf' | 'link'; src: string; title?: string; desc?: string }>>([]);
  const [previewStart, setPreviewStart] = useState(0);

  const awards: Award[] = [
    {
      title: 'Activities & Interests',
      org: 'National College of Ireland',
      date: 'Sept 2025 - Present',
      desc: 'Pursuing Taekwondo, Archery and Basketball to develop discipline, focus and teamwork.',
    },
    {
      title: 'Power Automate Super User (3x)',
      org: 'Microsoft',
      date: 'Oct 2023 - Present',
      desc: 'Recognised by Microsoft for expertise & community contributions across multiple seasons.',
      imgs: [
        '/images/awards/2024-s1_badge.png',
        '/images/awards/2024-s2_badge.png',
        '/images/awards/2025-s1_badge.png',
      ],
    },
    {
      title: 'RPA Workshop Presenter',
      org: 'Tangentia & AITD',
      date: 'Feb 2025',
      desc: 'Subject Matter Expert presenter at Agnel Institute of Technology & Design.',
      img: '/images/awards/rpa-workshop-presenter.jpg',
    },
    {
      title: 'Rookie of the Year 2024',
      org: 'Tangentia',
      date: 'Jan 2025',
      desc: 'Awarded by CEO Vijay Thomas for delivering high-impact automation solutions.',
      img: '/images/awards/rookie-of-the-year-2024.jpg',
    },
  ];

  const sorted = [...awards].sort((a, b) => parseSortDate(b.date) - parseSortDate(a.date));

  const openPreview = (a: Award, idx = 0) => {
    const items = (a.imgs?.length ? a.imgs : a.img ? [a.img] : [])
      .map((src) => ({ type: 'image' as const, src, title: a.title, desc: a.desc }));
    if (!items.length) return;
    setPreviewItems(items);
    setPreviewStart(Math.min(Math.max(idx, 0), Math.max(items.length - 1, 0)));
    setIsPreviewOpen(true);
  };

  const closePreview = () => setIsPreviewOpen(false);

  return (
    <div className="awards-grid timeline-awards">
      {sorted.map((a) => {
        const ongoing = /-\s*Present$/i.test(a.date);
        return (
        <div key={`${a.title}-${a.date}`} className={`award-row ${ongoing ? 'award-ongoing' : ''}`}>        
          <div className="award-marker">
            <span className="award-dot"></span>
            <span className="award-year">{a.date}</span>
          </div>
          <div className="award-body">
            <div className="award-title">{a.title}</div>
            <div className="award-org">{a.org}</div>
            <div className="award-desc">{a.desc}{ongoing && <span className="ongoing-label" style={{marginLeft:'0.5rem', padding:'0.15rem 0.45rem', fontSize:'0.65rem', border:'1px solid rgba(255,255,255,0.35)', borderRadius:'6px', textTransform:'uppercase', letterSpacing:'0.5px'}}>Ongoing</span>}</div>
          </div>
          {(a.img || a.imgs) && (
            <div className="award-actions">
              <button 
                className="award-preview-btn"
                aria-label={`Preview ${a.title}`}
                onClick={() => openPreview(a)}
              >
                Preview
              </button>
            </div>
          )}
        </div>
      );})}
      <AttachmentModal 
        isOpen={isPreviewOpen}
        items={previewItems}
        startIndex={previewStart}
        onClose={closePreview}
      />
    </div>
  );
}
