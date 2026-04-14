const clientProjects = [
  {
    title: "Porter Airlines",
    period: "Nov 2024 - Aug 2025",
    year: "2024-2025",
    description:
      "Streamlined vendor invoice handling using Automation Anywhere and Document Automation, achieving 95-98% accuracy while processing 1,000+ invoices per month. Integrated AWS S3 for secure storage and scalability.",
  },
  {
    title: "Sahu Global",
    period: "Oct 2024 - Feb 2025",
    year: "2024-2025",
    description:
      "Designed invoice automation with Power Automate Desktop and AI Builder, improving accuracy to 95-98% and reducing manual effort. Contributed as Solution Architect.",
  },
  {
    title: "Bank Automation Migration (Bhandari Automobiles)",
    period: "Jan 2024 - Jan 2025",
    year: "2024-2025",
    description:
      "Migrated workflows from Automation Anywhere to Power Automate Desktop, improving scalability and enabling cloud integration.",
  },
  {
    title: "Invoice Processing PoC (WIKA India)",
    period: "Oct 2024 - Nov 2024",
    year: "2024",
    description:
      "Implemented an invoice automation PoC using Power Automate and AI Builder; reduced processing time from 1 hour to under 5 minutes with OCR and ICR at roughly 95-98% accuracy.",
  },
  {
    title: "Invoice Download & Data Entry Migration",
    period: "Apr 2024 - May 2024",
    year: "2024",
    description:
      "Rebuilt invoice workflows in Power Automate Desktop to streamline extraction and Excel entry, improving reliability and throughput.",
  },
];

const academicProjects = [
  {
    title: "EEAI: Multi-Label Email Classification System",
    period: "Mar 2026",
    year: "2026",
    description:
      "A multi-label email classification system with chained and hierarchical modelling paths, reusable TF-IDF dataset building, and exportable evaluation metrics.",
    repoUrl: "https://github.com/ironnathanalvares/eeai",
  },
  {
    title: "Surge Pricing Optimization Using Reinforcement Learning & Markov Decision Processes",
    period: "Mar 2026 - Apr 2026",
    year: "2026",
    description:
      "Designed a surge pricing optimisation model for rideshare demand using a 36-state MDP over 693,000+ Uber and Lyft trips from Boston. Compared Policy Iteration and Value Iteration, built an empirical state transition matrix, and achieved about 20% revenue improvement over baseline pricing while maintaining market stability.",
  },
  {
    title: "Airline Disruption Optimization using Mixed Integer Programming",
    period: "Feb 2026 - Mar 2026",
    year: "2026",
    description:
      "Built a mixed-integer optimisation model for airline schedule recovery across 608 flights and 35 airports. The model handled cancellation decisions, flow balance, aircraft connections, and airport capacity constraints, with sensitivity analysis across 21 disruption levels and AMPL plus HiGHS as the solver stack.",
  },
  {
    title: "Investigating AI-Based Recommendation Systems: Challenges, Approaches, and Future Directions",
    period: "Jan 2026",
    year: "2026",
    description:
      "A review project on recommendation systems covering matrix factorisation, item-based collaborative filtering, Neural Collaborative Filtering, Wide & Deep models, and YouTube-style two-stage architectures. It also analysed cold start, sparsity, fairness, bias, filter bubbles, scalability, and the gap between offline metrics and real business outcomes.",
  },
  {
    title: "Chicago Weather, Crime, and Crash Analytics",
    period: "Nov 2025 - Dec 2025",
    year: "2025",
    description:
      "Built an end-to-end data engineering pipeline to study weather and urban safety in Chicago from 2001 to 2025. Integrated 8.5M crime records, 700K crashes, and 24 years of hourly weather data with PostgreSQL, MongoDB, Dagster, Plotly, and Streamlit.",
    repoUrl: "https://github.com/IronNathanAlvares/chicago-weather-crime-crashes",
  },
  {
    title: "Predictive Modelling and Forecasting of PM2.5 Air Quality in Dublin City",
    period: "Nov 2025 - Dec 2025",
    year: "2025",
    description:
      "Analysed and predicted PM2.5 air quality in Dublin using more than five million raw measurements. Compared nine ML models and several forecasting approaches, with Gradient Boosting and an ensemble forecast performing best for accurate short-term prediction.",
    repoUrl: "https://github.com/IronNathanAlvares/dublin-air-quality-analysis",
  },
  {
    title: "Open Finance under FiDA: Governance, Ethics & Sustainable Development",
    period: "Oct 2025 - Nov 2025",
    year: "2025",
    description:
      "Peer-reviewed research on the EU's proposed FiDA regulation and its impact on governance, data protection, ethics, and sustainable development. The work examined global open finance models and data lifecycle security, while also evaluating fairness, accountability, consumer trust, and Big Tech power.",
  },
  {
    title: "Towards Real-Time Cardiac Digital Twins: Aligning AI Models with Clinical Requirements",
    period: "Oct 2025 - Nov 2025",
    year: "2025",
    description:
      "Reviewed AI approaches for real-time cardiac digital twins that could support clinicians without slow or invasive simulations. Compared nine methods across accuracy, speed, interpretability, and workflow fit, with HeartSimSage emerging as the strongest option for near real-time cardiac mechanics prediction.",
  },
];

const personalProjects = [
  {
    title: "Labhair (Built at Craicathon)",
    period: "Mar 2026",
    year: "2026",
    description:
      "Built in 5-6 hours at my first hackathon with Frank O'Kelly and Joseph McSweeney, guided by Patrick Curran. Labhair is a voice-first Irish learning app with AI conversation, speech input, voice playback, Culture Cards, and a Pint Dash mini game.",
    repoUrl: "https://github.com/Joseph-MCS/craicathon_project",
  },
  {
    title: "Agent League 2026 - Chaos Kitchen - Interactive Cooking Game (React + TypeScript)",
    period: "Feb 2026",
    year: "2026",
    description:
      "An interactive cooking game built with React, TypeScript, and Vite for the GitHub Copilot Creative Apps Challenge. It uses Ollama and Mistral to generate recipes dynamically, combines agent-style prompt flows with modular mini-games, and was designed for offline, low-latency AI generation.",
    repoUrl: "https://github.com/IronNathanAlvares/AgentsLeague_CreativeApps_ChaosKitchen",
  },
  {
    title: "Cú Chain",
    period: "Mar 2026",
    year: "2026",
    description:
      "A governance and treasury tool for GAA clubs on Solana, built for the Colosseum Solana Hackathon 2026. It includes multi-sig treasury approvals, on-chain AGM voting, automated grant reporting, inter-club payment rails, and NFT membership credentials.",
  },
];

function ProjectCard({
  title,
  period,
  year,
  description,
  repoUrl,
}: {
  title: string;
  period: string;
  year: string;
  description: string;
  repoUrl?: string;
}) {
  return (
    <article className="project-card">
      <div className="timeline-marker" aria-hidden="true">
        <span className="timeline-dot"></span>
        <span className="timeline-year">{year}</span>
      </div>
      <div className="project-body">
        <div className="title-row">
          <h3>{title}</h3>
          <div className="period-badge period-badge-inline">{period}</div>
        </div>
        <div className="project-description">
          <p>{description}</p>
        </div>
        {repoUrl ? (
          <div className="project-actions">
            <a href={repoUrl} target="_blank" rel="noopener" className="gh-btn gh-bottom-right" aria-label={`View ${title} on GitHub`}>
              <img src="/images/github-logo.png" alt="GitHub" className="gh-icon" />
              <span className="gh-text">View on GitHub</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <h2>Projects</h2>
      <div className="projects-split">
        <div className="client-projects">
          <h3>Client projects</h3>
          <div className="projects-grid">
            {clientProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        <div className="academic-projects">
          <h3>Academic projects</h3>
          <div className="projects-grid">
            {academicProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>

        <div className="personal-projects">
          <h3>Personal projects</h3>
          <div className="projects-grid">
            {personalProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
