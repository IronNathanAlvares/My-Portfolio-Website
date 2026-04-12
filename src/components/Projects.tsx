export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <h2>Projects</h2>
      <div className="projects-split">
        <div className="client-projects">
          <h3>Client projects</h3>
          <div className="projects-grid">
            <article className="project-card" data-period="2025-10">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2024-2025</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Porter Airlines</h3><div className="period-badge period-badge-inline">Nov 2024 - Aug 2025</div></div>
                <p>Streamlined vendor invoice handling using Automation Anywhere and Document Automation, achieving 95-98% accuracy while processing 1,000+ invoices/month. Integrated AWS S3 for secure storage and scalability.</p>
              </div>
            </article>
            <article className="project-card" data-period="2023-08">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2024-2025</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Sahu Global</h3><div className="period-badge period-badge-inline">Oct 2024 - Feb 2025</div></div>
                <p>Designed invoice automation with Power Automate Desktop and AI Builder, improving accuracy to 95-98% and reducing manual effort. Contributed as Solution Architect.</p>
              </div>
            </article>
            <article className="project-card" data-period="2023-03">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2024-2025</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Bank Automation Migration (Bhandari Automobiles)</h3><div className="period-badge period-badge-inline">Jan 2024 - Jan 2025</div></div>
                <p>Migrated workflows from Automation Anywhere to Power Automate Desktop, improving scalability and enabling cloud integration.</p>
              </div>
            </article>
            <article className="project-card" data-period="2023-01">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2024</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Invoice Processing PoC (WIKA India)</h3><div className="period-badge period-badge-inline">Oct 2024 - Nov 2024</div></div>
                <p>Implemented an invoice automation PoC using Power Automate + AI Builder; reduced processing time from 1 hour to under 5 minutes with OCR/ICR (~95-98% accuracy).</p>
              </div>
            </article>
            <article className="project-card" data-period="2023-01">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2024</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Invoice Download & Data Entry Migration</h3><div className="period-badge period-badge-inline">Apr 2024 - May 2024</div></div>
                <p>Rebuilt invoice workflows in Power Automate Desktop to streamline extraction and Excel entry, improving reliability and throughput.</p>
              </div>
            </article>
          </div>
        </div>

        <div className="academic-projects">
          <h3>Academic projects</h3>
          <div className="projects-grid">
            <article className="project-card">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2022-2023</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Final Year Project - Facial Recognition for Attendance</h3><div className="period-badge period-badge-inline">Jul 2022 - Jul 2023</div></div>
                <p>Designed a facial recognition system using MTCNN + FaceNet + SVM, achieving 98% recognition accuracy on a custom dataset of 500+ student images.</p>
                <div className="project-actions">
                  <a href="https://github.com/IronNathanAlvares/BE-COMP_22-23_Final-Year-Project" target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label="View Final Year Project on GitHub">
                    <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
                    <span className="gh-text">View on GitHub</span>
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2021</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Clothing Management System</h3><div className="period-badge period-badge-inline">Sep 2021 - Oct 2021</div></div>
                <p>C# Windows Forms app with login, billing, and customer management.</p>
                <div className="project-actions">
                  <a href="https://github.com/IronNathanAlvares/Clothing-Management-System" target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label="View Clothing Management System on GitHub">
                    <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
                    <span className="gh-text">View on GitHub</span>
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2020</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Bookshop Management System</h3><div className="period-badge period-badge-inline">Sep 2020 - Oct 2020</div></div>
                <p>C++ project for book inventory and sales management.</p>
                <div className="project-actions">
                  <a href="https://github.com/IronNathanAlvares/Bookshop-Management-System" target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label="View Bookshop Management on GitHub">
                    <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
                    <span className="gh-text">View on GitHub</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="personal-projects">
          <h3>Personal projects</h3>
          <div className="projects-grid">
            <article className="project-card">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2025</span></div>
              <div className="project-body">
                <div className="title-row"><h3>Portfolio website</h3><div className="period-badge period-badge-inline">Oct 2025</div></div>
                <p>A modern portfolio site showcasing projects, interactive J.A.R.V.I.S-themed UI, and a serverless contact form (Vercel) with Node/Nodemailer backend. Built with vanilla HTML/CSS/JS and Three.js for lightweight 3D visuals.</p>
                <div className="project-actions">
                  <a className="live-link" href="https://portfolio-website-nathanluisalvares-projects.vercel.app/" target="_blank" rel="noopener" aria-label="Live site">
                    <img src="/images/live-link-icon.png" alt="Live" style={{width:'20px',height:'20px',verticalAlign:'middle',marginRight:'8px'}} />
                    Live site
                  </a>
                  <a href="https://github.com/IronNathanAlvares/My-Portfolio-Website" target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label="Portfolio GitHub">
                    <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
                    <span className="gh-text">Repo</span>
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2023</span></div>
              <div className="project-body">
                <div className="title-row"><h3>QSTP 2023 Calculator</h3><div className="period-badge period-badge-inline">Aug 2023</div></div>
                <p>Calculator built with HTML, CSS and JavaScript - supports basic arithmetic, keyboard input and a clean responsive UI for mobile and desktop.</p>
                <div className="project-actions">
                  <a href="https://github.com/IronNathanAlvares/QSTP-2023-Calculator" target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label="QSTP 2023 Calculator on GitHub">
                    <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
                    <span className="gh-text">View on GitHub</span>
                  </a>
                </div>
              </div>
            </article>
            <article className="project-card">
              <div className="timeline-marker" aria-hidden="true"><span className="timeline-dot"></span><span className="timeline-year">2023</span></div>
              <div className="project-body">
                <div className="title-row"><h3>ChatGPT SEO Article Generator</h3><div className="period-badge period-badge-inline">Mar 2023</div></div>
                <p>A Streamlit + Python app that uses ChatGPT to generate SEO-optimised articles. Includes prompts, templates and simple UI to set tone, keywords and length.</p>
                <div className="project-actions">
                  <a href="https://github.com/IronNathanAlvares/ChatGPT-SEO-Article-Generator" target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label="ChatGPT SEO Article Generator on GitHub">
                    <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
                    <span className="gh-text">View on GitHub</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
