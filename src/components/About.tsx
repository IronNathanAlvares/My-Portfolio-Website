export default function About() {
  return (
    <section id="about" className="section about">
      <div className="about-card">
        <div className="about-left">
          <div className="repulsor-badge" aria-hidden="true"></div>
          <h2>About</h2>
          <h3 className="about-title">Nathan Luis Alvares - RPA & AI Practitioner</h3>
          <p className="about-lead">I build intelligent automation that removes repetitive work and unlocks time for people to do higher-value tasks. I specialise in Power Automate (Cloud & Desktop), Automation Anywhere and UiPath, and I combine document processing, integrations and AI to craft reliable end-to-end solutions.</p>
          <div className="about-meta">
            <span className="meta-chip">Rookie of the Year 2024</span>
            <span className="meta-chip">MSc Artificial Intelligence (ongoing)</span>
            <span className="meta-chip">Available Sept 2025 - Ireland</span>
          </div>
        </div>
        <div className="about-right">
          <div className="about-stats">
            <div className="stat">
              <div className="stat-num">92%</div>
              <div className="stat-label">Power Automate</div>
            </div>
            <div className="stat">
              <div className="stat-num">86%</div>
              <div className="stat-label">Automation Anywhere</div>
            </div>
            <div className="stat">
              <div className="stat-num">82%</div>
              <div className="stat-label">UiPath</div>
            </div>
          </div>
          <div className="about-blurb">I enjoy combining OCR, AI Builder and workflow orchestration to create resilient automations. Outside work I train in Taekwondo and Archery ~ discipline that keeps my code sharp.</div>
        </div>
      </div>
    </section>
  );
}
