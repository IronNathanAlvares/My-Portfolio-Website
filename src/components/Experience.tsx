'use client';

import { useState, useEffect, useRef } from 'react';
import AttachmentModal from './AttachmentModal';

interface AttachmentItem {
  type: 'image' | 'pdf' | 'link';
  src: string;
  title?: string;
  desc?: string;
}

const MONTHS: Record<string, number> = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7, sep: 8, sept: 8, september: 8,
  oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11
};

function parseMonthYear(str: string): Date | null {
  if (!str) return null;
  str = str.trim();
  
  // Handle 'Present' or variations
  if (/present|now|ongoing/i.test(str)) return new Date();

  // Try formats like "Apr 2025", "April 2025"
  const m = str.match(/([A-Za-z]+)\s+(\d{4})/);
  if (m) {
    const mon = m[1].toLowerCase();
    const year = parseInt(m[2], 10);
    const mi = MONTHS[mon];
    if (typeof mi === 'number') return new Date(year, mi, 1);
  }

  // Fallback: year only
  const y = str.match(/(\d{4})/);
  if (y) return new Date(parseInt(y[1], 10), 0, 1);

  return null;
}

function parseRange(text: string): { start: Date; end: Date } | null {
  if (!text) return null;
  const parts = text.split('-').map(s => s.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  
  const start = parseMonthYear(parts[0]);
  let end = null;
  if (parts.length > 1) end = parseMonthYear(parts[1]);
  if (!end) end = start || new Date();
  
  return { start: start || end, end };
}

function monthsBetween(start: Date, end: Date): number {
  // Inclusive month calculation: count months between (year, month) inclusive.
  // Example: Jul 2020 - Jul 2020 => 1 month. Jul 2020 - Sep 2020 => 3 months.
  const sy = start.getFullYear();
  const sm = start.getMonth();
  const ey = end.getFullYear();
  const em = end.getMonth();
  const months = (ey - sy) * 12 + (em - sm) + 1;
  return Math.max(0, months);
}

function formatMonths(m: number): string {
  if (m <= 0) return '0 months';
  if (m < 12) return m === 1 ? '1 month' : m + ' months';
  const yrs = Math.floor(m / 12);
  const rem = m % 12;
  if (rem === 0) return yrs === 1 ? '1 year' : yrs + ' years';
  return yrs + ' yr ' + rem + ' mo';
}

export default function Experience() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState<AttachmentItem[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Aggregate attachment buttons after component mounts
    if (!sectionRef.current) return;

    // Auto-sort: do two independent passes so professional and internship sections
    // are ordered separately and won't mix entries across sections.
    function sortArticlesInContainer(container: Element | null) {
      if (!container) return;
      const articles = Array.from(container.querySelectorAll('article')) as HTMLElement[];
      if (articles.length <= 1) return;
      const mapped = articles.map(a => {
        const dateEl = a.querySelector('.role-date-badge, .role-date') as HTMLElement | null;
        const txt = dateEl ? (dateEl.textContent || '').trim() : '';
        const parsed = parseRange(txt || '');
        const keyDate = parsed ? parsed.start : new Date(1970,0,1);
        return { el: a, date: keyDate };
      });
      mapped.sort((x, y) => y.date.getTime() - x.date.getTime());
      mapped.forEach(m => container.appendChild(m.el));
    }

    // Professional: sort each company-block's roles separately
    const profBlocks = sectionRef.current.querySelectorAll('.professional-experience .company-block');
    profBlocks.forEach(b => {
      const container = b.querySelector('.company-roles, .internship-list');
      sortArticlesInContainer(container);
    });

    // Additionally, sort the company-block order inside the professional section
    // by the most recent end date of roles within each block (newest companies first).
    const profWrapper = sectionRef.current.querySelector('.professional-experience');
    if (profWrapper) {
      const blocks = Array.from(profWrapper.querySelectorAll('.company-block')) as HTMLElement[];
      const mappedBlocks = blocks.map(b => {
        const dates = Array.from(b.querySelectorAll('.role-date-badge, .role-date')).map(d => (d.textContent || '').trim());
        const parsedDates = dates.map(txt => parseRange(txt || '')).filter(Boolean) as { start: Date; end: Date }[];
        // pick the most recent end date
        const mostRecent = parsedDates.length ? parsedDates.reduce((acc, cur) => acc.end.getTime() > cur.end.getTime() ? acc : cur).end : new Date(1970,0,1);
        return { el: b, date: mostRecent };
      });
      mappedBlocks.sort((x, y) => y.date.getTime() - x.date.getTime());
      mappedBlocks.forEach(m => profWrapper.appendChild(m.el));
    }

    // Internships / Other Experience: sort roles within each block, then sort company-blocks
    const internBlocks = sectionRef.current.querySelectorAll('.internship-experience .company-block');
    internBlocks.forEach(b => {
      const container = b.querySelector('.internship-list, .company-roles');
      sortArticlesInContainer(container);
    });

    // Sort internship company-block order by most recent end date (newest first)
    const internWrapper = sectionRef.current.querySelector('.internship-experience');
    if (internWrapper) {
      const blocks = Array.from(internWrapper.querySelectorAll('.company-block')) as HTMLElement[];
      const mappedBlocks = blocks.map(b => {
        const dates = Array.from(b.querySelectorAll('.role-date-badge, .role-date')).map(d => (d.textContent || '').trim());
        const parsedDates = dates.map(txt => parseRange(txt || '')).filter(Boolean) as { start: Date; end: Date }[];
        const mostRecent = parsedDates.length ? parsedDates.reduce((acc, cur) => acc.end.getTime() > cur.end.getTime() ? acc : cur).end : new Date(1970,0,1);
        return { el: b, date: mostRecent };
      });
      mappedBlocks.sort((x, y) => y.date.getTime() - x.date.getTime());
      mappedBlocks.forEach(m => internWrapper.appendChild(m.el));
    }

    const containers = sectionRef.current.querySelectorAll('.role-attachments');
    containers.forEach(container => {
      // Skip if already unified
      if (container.querySelector('.attachment-aggregate-btn')) return;

      const buttons = Array.from(container.querySelectorAll('.attachment-btn:not(.attachment-aggregate-btn)')) as HTMLButtonElement[];
      
      if (buttons.length <= 1) return; // Leave single buttons alone

      // Hide original buttons and mark them hidden for accessibility
      buttons.forEach(btn => {
        try {
          btn.style.display = 'none';
          btn.setAttribute('aria-hidden', 'true');
          btn.classList.add('attachment-original-hidden');
        } catch (e) {}
      });

      // Create aggregate button
      const aggregateBtn = document.createElement('button');
      aggregateBtn.className = 'attachment-btn attachment-aggregate-btn';
      aggregateBtn.setAttribute('aria-label', `Open ${buttons.length} attachments`);
      aggregateBtn.textContent = `Attachments (${buttons.length})`;
      
      // Store button data in data attributes
      const itemsData = buttons.map(b => ({
        type: b.getAttribute('data-type') || 'link',
        src: b.getAttribute('data-src') || '',
        title: b.getAttribute('data-title') || '',
        desc: b.getAttribute('data-desc') || ''
      }));
      aggregateBtn.setAttribute('data-items', JSON.stringify(itemsData));

  // Insert the aggregate button at the beginning of the attachments container
  container.insertBefore(aggregateBtn, container.firstChild);
    });

    // Process duration for all role cards
    const roles = sectionRef.current.querySelectorAll('.role-card, .internship-card');
    roles.forEach(role => {
      // Skip if already processed
      if (role.classList.contains('role-badge-processed')) return;

      const dateEl = role.querySelector('.role-date-badge, .role-date') as HTMLElement;
      const dateText = dateEl ? dateEl.textContent?.trim() : '';
      const parsed = parseRange(dateText || '');
      
      if (parsed) {
        const months = monthsBetween(parsed.start, parsed.end);
        
        // Create duration element
        const durEl = document.createElement('span');
        durEl.className = 'role-duration';
        durEl.textContent = formatMonths(months);
        durEl.setAttribute('role', 'note');
        durEl.setAttribute('aria-hidden', 'false');

        // Create or find wrapper
        let wrap = role.querySelector('.role-badge-wrap') as HTMLElement;
        if (!wrap) {
          wrap = document.createElement('div');
          wrap.className = 'role-badge-wrap';
          role.insertBefore(wrap, role.firstChild);
        }

        // Move date badge into wrapper
        if (dateEl && dateEl.parentNode !== wrap) {
          wrap.appendChild(dateEl);
        }

        // Add duration to wrapper
        wrap.appendChild(durEl);
        
        // Mark as processed
        role.classList.add('role-badge-processed');
      }
    });

    // Add click handler using event delegation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.attachment-btn') as HTMLButtonElement;
      if (!btn) return;

      e.preventDefault();

      // Check if this is an aggregate button
      if (btn.classList.contains('attachment-aggregate-btn')) {
        const itemsData = btn.getAttribute('data-items');
        if (itemsData) {
          try {
            const items = JSON.parse(itemsData) as AttachmentItem[];
            setModalItems(items.filter(i => i.src));
            setStartIndex(0);
            setModalOpen(true);
          } catch (err) {
            console.error('Failed to parse items data:', err);
          }
        }
        return;
      }

      // Single button
      const type = (btn.getAttribute('data-type') || 'link') as 'image' | 'pdf' | 'link';
      const src = btn.getAttribute('data-src') || '';
      const title = btn.getAttribute('data-title') || '';
      const desc = btn.getAttribute('data-desc') || '';

      if (!src) return;

      setModalItems([{ type, src, title, desc }]);
      setStartIndex(0);
      setModalOpen(true);
    };

    const section = sectionRef.current;
    section.addEventListener('click', handleClick);

    return () => {
      section.removeEventListener('click', handleClick);
    };
  }, []);

  const handleAttachmentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const btn = e.currentTarget;

    // Check if this is an aggregate button
    if (btn.classList.contains('attachment-aggregate-btn')) {
      const itemsData = btn.getAttribute('data-items');
      if (itemsData) {
        try {
          const items = JSON.parse(itemsData) as AttachmentItem[];
          setModalItems(items.filter(i => i.src));
          setStartIndex(0);
          setModalOpen(true);
        } catch (err) {
          console.error('Failed to parse items data:', err);
        }
      }
      return;
    }

    // Single button
    const type = (btn.getAttribute('data-type') || 'link') as 'image' | 'pdf' | 'link';
    const src = btn.getAttribute('data-src') || '';
    const title = btn.getAttribute('data-title') || '';
    const desc = btn.getAttribute('data-desc') || '';

    if (!src) return;

    setModalItems([{ type, src, title, desc }]);
    setStartIndex(0);
    setModalOpen(true);
  };

  return (
    <>
      <section id="experience" className="section experience" ref={sectionRef}>
        <h2>Experience</h2>

      <div className="professional-experience">
        <h3 className="section-subhead">Professional Experience</h3>

        <div className="company-block" data-company="Tangentia" data-company-desc="Canadian based global IT consulting and technology services firm" data-location="Goa, India">
          <div className="company-header">
            <div className="company-name">Tangentia</div>
            <div className="company-meta">
              <span className="company-desc">Canadian based global IT consulting and technology services firm</span>
              <span className="company-location" aria-label="Location">
                <span className="loc-text">Goa, India</span>
                <span className="work-mode">On-site</span>
              </span>
            </div>
          </div>

          <div className="company-roles">
            <article className="role-card role-senior">
              <div className="role-badge">Junior</div>
              <h4 className="role-title">Junior Software Developer</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>April 2025 - Aug 2025</span>
              <ul>
                <li>Promoted to the AI Practice Team after 12+ months; contributed to Automation Anywhere APA client use cases (self-learning), enhancing process efficiency by up to 40%.</li>
                <li>Acted as Level 3 (L3) support for client projects, delivering 20+ change requests across 3 enterprise clients with high on-time completion and minimal post-release defects.</li>
                <li>Delivered 20+ change requests across 3 enterprise clients, securing 100% on-time deployment with zero post-release defects.</li>
                <li>Authored 10+ Technical Specification Documents (TSDs) and piloted 4 new tools (Bizagi, UiPath, Copilot Studio, Power Apps) to expand automation capabilities.</li>
              </ul>
            </article>

            <article className="role-card role-mid">
              <div className="role-badge">Junior</div>
              <h4 className="role-title">Junior Robotic Process Automation (RPA) / Artificial Intelligence (AI) Developer</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Jan 2024 - Mar 2025</span>
              <ul>
                <li>Awarded Rookie of the Year 2024 for impactful client solutions.</li>
                <li>Led requirements-gathering sessions with clients, translating business needs into clear technical specifications and automation workflows.</li>
                <li>Implemented data extraction and reporting workflows, minimising manual email handling by 80% (~15 hours saved per week).</li>
                <li>Produced 1+ Solution Design Documents (SDDs) guiding projects worth €100k+ in client value.</li>
                <li>Partnered with business analysts, testers, and developers to deliver 6+ automation use cases across SharePoint, OneDrive, Planner, and Outlook, cutting repetitive admin tasks by 30%.</li>
                <li>Presented automation solutions to non-technical stakeholders, ensuring adoption and smooth handover.</li>
              </ul>
              <div className="role-attachments">
                <button className="attachment-btn" data-type="image" data-src="/images/awards/rookie-of-the-year-2024.jpg" data-title="Rookie of the Year 2024" data-desc="Awarded for outstanding performance in 2024" onClick={handleAttachmentClick}>Preview Award</button>
                <button className="attachment-btn" data-type="image" data-src="/images/awards/rpa-workshop-presenter.jpg" data-title="RPA Workshop Presenter" data-desc="Momento of conducting RPA workshop in AITD college" onClick={handleAttachmentClick}>Preview Award</button>
              </div>
            </article>

            <article className="role-card role-junior">
              <div className="role-badge">Intern</div>
              <h4 className="role-title">Trainee RPA Developer</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Sep 2023 - Jan 2024</span>
              <ul>
                <li>Automated Attendance System: Built with Power Automate Desktop; maintained 100% on-time logging, reduced manual effort by 98%, and achieved 99.5% accuracy (maintained through Aug 2025).</li>
                <li>Created 6 automation use-cases across SharePoint, OneDrive, Planner, and Outlook, cutting repetitive admin tasks by 30%.</li>
                <li>Built 10+ bots in Power Automate Cloud & Desktop during training, achieving 95%+ accuracy in test scenarios.</li>
              </ul>
            </article>
          </div>
        </div>
      </div>

      <div className="internship-experience">
        <h3 className="section-subhead">Internship & Other Experience</h3>

        {/* Separate MyCaptain company-block for Java Programming Intern (standalone experience) */}
        <div className="company-block" data-company="MyCaptain" data-company-desc="E-Learning Providers" data-location="Remote (Goa, India)">
          <div className="company-header">
            <div className="company-name">MyCaptain</div>
            <div className="company-meta">
              <span className="company-desc">E-Learning Providers</span>
              <span className="company-location" aria-label="Location">
                <span className="loc-text">Remote (Goa, India)</span>
                <span className="work-mode">Remote</span>
              </span>
            </div>
          </div>

          <div className="internship-list">
            <article className="internship-card">
              <div className="role-badge">Intern</div>
              <h4 className="role-title">Java Programming Intern</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Jul 2020 - Jul 2020</span>
              <div className="role-meta sr-only">July 2020 - July 2020</div>
              <ul>
                <li>Learned the basics of Java programming (constants, variables, operators) theoretically.</li>
                <li>Downloaded and installed the IDE/JDK to run programs and prepare for guided mentoring.</li>
                <li>Attended mentor meetings where doubts were resolved and topics beyond the book were explained.</li>
                <li>Worked on projects:</li>
                <ol>
                  <li>Running your first program</li>
                  <li>Challenge: Methods and Packages</li>
                  <li>Loops and arrays</li>
                  <li>Class and objects</li>
                  <li>Prime number challenge</li>
                  <li>What is Fibonacci?</li>
                </ol>
              </ul>
              <div className="role-attachments">
                <button className="attachment-btn" data-type="pdf"
                  data-src="/pdf_files/MyCaptain Java Programming workshop certificate.pdf"
                  data-title="Java Workshop Certificate"
                  data-desc="Certificate for completing the Java programming workshop." onClick={handleAttachmentClick}>PDF</button>
                <button className="attachment-btn" data-type="pdf"
                  data-src="/pdf_files/MyCaptain Java Programming workshop Letter of Completion.pdf"
                  data-title="Letter of Completion"
                  data-desc="Official letter of completion for the Java workshop." onClick={handleAttachmentClick}>PDF</button>
              </div>
            </article>
          </div>
        </div>

        <div className="company-block" data-company="Verzeo" data-company-desc="Indian EdTech startup" data-location="Remote (Goa, India)">
          <div className="company-header">
            <div className="company-name">Verzeo</div>
            <div className="company-meta">
              <span className="company-desc">Indian EdTech startup</span>
              <span className="company-location" aria-label="Location">
                <span className="loc-text">Remote (Goa, India)</span>
                <span className="work-mode">Remote</span>
              </span>
            </div>
          </div>
          <div className="internship-list">
            <article className="internship-card">
              <div className="role-badge">Intern</div>
              <h4 className="role-title">Web Development Intern - Verzeo</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Feb 2021 - Apr 2021</span>
              <ul>
                <li>Applied HTML, CSS, JavaScript and Bootstrap to deliver two functional web projects during an 8-week internship.</li>
              </ul>
              <div className="role-attachments">
                <button className="attachment-btn" data-type="image" data-src="/images/awards/verzeo-completion-certificate.png" data-title="Verzeo Completion Certificate" data-desc="Completion certificate from Verzeo" onClick={handleAttachmentClick}>Certificate</button>
              </div>
            </article>
          </div>
        </div>

        <div className="company-block" data-company="Freethink LLP" data-company-desc="IT services and IT Consulting" data-location="Hybrid (Goa, India)">
          <div className="company-header">
            <div className="company-name">Freethink LLP</div>
            <div className="company-meta">
              <span className="company-desc">IT services and IT Consulting</span>
              <span className="company-location" aria-label="Location">
                <span className="loc-text">Hybrid (Goa, India)</span>
                <span className="work-mode">Hybrid</span>
              </span>
            </div>
          </div>
          <div className="internship-list">
            <article className="internship-card">
              <div className="role-badge">Intern</div>
              <h4 className="role-title">Software Developer Intern - Freethink LLP</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Aug 2022 - Oct 2022</span>
              <ul>
                <li>Collaborated with a team of four to learn and implement Vue.js and its framework, Quasar, demonstrating the ability to work effectively in a team environment and quickly learn new technologies.</li>
                <li>Successfully completed three projects, including a login page, table dashboard with filtering and sorting, and analytics charts using Google Charts.</li>
                <li>Developed proficiency in project management and time management skills, delivering all projects on time and ensuring high-quality work.</li>
                <li>Effectively documented work in a detailed report, showcasing strong communication skills and the ability to clearly articulate technical concepts and project details.</li>
              </ul>
              <div className="role-attachments">
                <button className="attachment-btn" data-type="image" data-src="/images/awards/software-developer-intern-freethink-certificate.jpg" data-title="Freethink Completion Certificate" data-desc="Completion certificate from Freethink LLP" onClick={handleAttachmentClick}>Certificate</button>
              </div>
            </article>
          </div>
        </div>

        <div className="company-block" data-company="MyCaptain" data-company-desc="E-Learning Providers" data-location="Remote (Goa, India)">
          <div className="company-header">
            <div className="company-name">MyCaptain</div>
            <div className="company-meta">
              <span className="company-desc">E-Learning Providers</span>
              <span className="company-location" aria-label="Location">
                <span className="loc-text">Remote (Goa, India)</span>
                <span className="work-mode">Remote</span>
              </span>
            </div>
          </div>

          <div className="company-roles">
            <article className="role-card role-mid">
              <div className="role-badge">Apprentice</div>
              <h4 className="role-title">Community Leader</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Nov 2020 - Jan 2021</span>
              <ul>
                <li>Promoted to the role of Community Leader, demonstrating strong leadership skills and a track record of success.</li>
                <li>Managed a team to achieve sales goals, showcasing management and communication skills.</li>
              </ul>
            </article>

            <article className="role-card role-junior">
              <div className="role-badge">Apprentice</div>
              <h4 className="role-title">Campus Ambassador</h4>
              <span className="role-date-badge"><span className="dot" aria-hidden="true"></span>Oct 2020 - Nov 2020</span>
              <ul>
                <li>Completed marketing projects; sold over 10 individual courses and 5 course packs.</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <AttachmentModal 
      isOpen={modalOpen}
      items={modalItems}
      startIndex={startIndex}
      onClose={() => setModalOpen(false)}
    />
  </>
  );
}