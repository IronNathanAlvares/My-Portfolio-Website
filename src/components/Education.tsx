export default function Education() {
  return (
    <section id="education" className="section education">
      <h2>Education</h2>
      <div className="edu-cards timeline-edu">
        <div className="edu-card">
          <div className="edu-marker" aria-hidden="true">
            <span className="edu-dot"></span>
            <span className="edu-year">Sep 2025 - Present</span>
          </div>
          <div className="edu-head">
            <div className="edu-left">
              <span className="edu-degree">M.Sc. in Artificial Intelligence</span>
            </div>
            <span className="edu-college">National College of Ireland</span>
          </div>
          <div className="edu-desc">
            <strong>Modules:</strong>
            <div className="chip-list">
              <span className="chip">Data Analytics for AI</span>
              <span className="chip">Data Governance &amp; Ethics</span>
              <span className="chip">Programming for AI</span>
              <span className="chip">Foundations of AI</span>
              <span className="chip">Engineering &amp; Evaluating AI</span>
              <span className="chip">AI-Driven Decision Making</span>
              <span className="chip">Emerging AI Technologies &amp; Sustainability</span>
              <span className="chip">Intelligent Agents &amp; Process Automation</span>
            </div>
            <br />
            <strong>Bootcamps:</strong>
            <div className="chip-list">
              <span className="chip">Python</span>
              <span className="chip">Statistics</span>
              <span className="chip">Technical Writing</span>
            </div>
            <br />
            <strong>Expected involvement:</strong> EpochDev (AI + ML Club), hackathons, collaborative research activities.
          </div>
        </div>
        <div className="edu-card">
          <div className="edu-marker" aria-hidden="true">
            <span className="edu-dot"></span>
            <span className="edu-year">Jul 2019 - Jul 2023</span>
          </div>
          <div className="edu-head">
            <div className="edu-left">
              <span className="edu-degree">B.E. in Computer Science</span>
              <span className="edu-grade">First Class Honours (1.1)</span>
            </div>
            <span className="edu-college">Padre Conceição College of Engineering</span>
          </div>
          <div className="edu-desc">
            <strong>Final Year Project:</strong> Facial Recognition for Student Attendance (Jul 2022 - Jul 2023): Designed a facial recognition system using MTCNN + FaceNet + SVM; achieved 98% recognition accuracy on a custom dataset of 500+ student images.
          </div>
        </div>
      </div>
    </section>
  );
}
