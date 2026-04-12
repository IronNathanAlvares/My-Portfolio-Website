import Image from 'next/image';
import Script from 'next/script';

export default function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="footer-link footer-contact">
              <Image className="icon icon-mail" src="/images/email-icon.svg" alt="Email" width={20} height={20} />
              <span>{contactEmail}</span>
            </a>
          )}
          {contactPhone && (
            <a href={`tel:${contactPhone}`} className="footer-link footer-contact" aria-label="Call Nathan">
              <Image className="icon icon-phone" src="/images/phone-icon.png" alt="Phone" width={20} height={20} />
              <span>{contactPhone}</span>
            </a>
          )}
        </div>
        <div className="footer-right">
          <a className="footer-link footer-icon" href="https://www.linkedin.com/in/nathan-luis-alvares-1000061bb/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <Image className="icon icon-linkedin" src="/images/linkedin-logo.png" alt="LinkedIn" width={20} height={20} />
          </a>
          <a className="footer-link footer-icon" href="https://github.com/IronNathanAlvares" target="_blank" rel="noopener" aria-label="GitHub">
            <Image className="icon icon-github" src="/images/github-logo.png" alt="GitHub" width={20} height={20} />
          </a>
          <a className="footer-link footer-icon" href="https://www.instagram.com/nathalvofficial/" target="_blank" rel="noopener" aria-label="Instagram">
            <Image className="icon icon-instagram" src="/images/instagram-logo.svg" alt="Instagram" width={20} height={20} />
          </a>
          <a className="footer-link footer-icon" href="https://x.com/NathAlv23" target="_blank" rel="noopener" aria-label="X (formerly Twitter)">
            <Image className="icon icon-x" src="/images/x-twitter-logo.png" alt="X" width={20} height={20} />
          </a>
          <a className="footer-link footer-icon" href="https://www.youtube.com/@NathanLAlvares" target="_blank" rel="noopener" aria-label="YouTube">
            <Image className="icon icon-youtube" src="/images/YouTube-logo.png" alt="YouTube" width={20} height={20} />
          </a>
        </div>
      </div>
      <div className="footer-flyer-wrap" aria-hidden="true">
        <div className="ironman-flyer">
          <Image src="/images/iron-man-flying.gif" alt="Iron Man flying" width={64} height={32} unoptimized />
        </div>
      </div>
      <div className="footer-copy">© Nathan Luis Alvares - Available Sept 2025</div>
      {/* Load legacy flight animation script after hydration */}
      <Script src="/scripts/ironman-flight.js" strategy="afterInteractive" />
    </footer>
  );
}
