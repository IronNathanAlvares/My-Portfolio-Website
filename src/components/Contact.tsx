'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

const IronMan3D = dynamic(() => import('./IronMan3D'), { ssr: false });
const Helmet3D = dynamic(() => import('./Helmet3D'), { ssr: false });

export default function Contact() {
  const formSubmitEndpoint = process.env.NEXT_PUBLIC_FORMSUBMIT_ENDPOINT || '';

  const [countries, setCountries] = useState<any[]>([]);
  const [selectedFlag, setSelectedFlag] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('+1');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>('');
  const [formStatusType, setFormStatusType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    fetch('/data/countries.json').then(r => r.json()).then((list) => {
      setCountries(list);
      const userLang = navigator.language || '';
      const countryFromLocale = userLang.split('-')[1];
      let defaultDial = '+1';
      if (countryFromLocale) {
        const found = list.find((x: any) => x.code === countryFromLocale.toUpperCase());
        if (found) defaultDial = found.dial_code;
      }
      setPhoneCode(defaultDial);
      const foundName = list.find((x:any) => x.dial_code === defaultDial);
      setSelectedFlag(isoToFlag(foundName?.code));
        setSearchText(foundName ? `${defaultDial} ${foundName.name}` : defaultDial);
    }).catch(() => {});
  }, []);

  function isoToFlag(iso?: string) {
    if (!iso) return '';
    return iso.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
  }

  const filteredCountries = useMemo(() => {
    if (!searchText.trim()) return countries;
    const search = searchText.toLowerCase();
    return countries.filter((c: any) => 
      c.name.toLowerCase().includes(search) || 
      c.dial_code.includes(search) ||
      c.code.toLowerCase().includes(search)
    );
  }, [countries, searchText]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email')||'');
    const phone = String(formData.get('phone')||'');
    const message = String(formData.get('message')||'');

    setFormStatus('Sending your message...');
    setFormStatusType('');

    if (!formSubmitEndpoint) {
      setFormStatus('Contact form is not configured yet. Please set NEXT_PUBLIC_FORMSUBMIT_ENDPOINT.');
      setFormStatusType('error');
      return;
    }

    const payload = {
      email,
      phone: `${phoneCode} ${phone}`,
      message,
      _subject: 'Portfolio Contact Form',
      _captcha: 'false',
      _template: 'table',
    };

    try {
      const res = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormStatus('Message sent successfully. Please check your email for FormSubmit activation if this is your first submission.');
        setFormStatusType('success');
        form.reset();
  // Show Jarvis meme GIF and a random send phrase in the send-dialog (next to the GIF)
  const jarvis = document.getElementById('jarvis-send-dialog');
  const jarvisGif = document.getElementById('jarvis-gif');
      const jarvisPhrases = [
        'Jarvis, transmit the message at light speed.',
        'Jarvis, fire the email cannon.',
        'Jarvis, beam this straight to my inbox.',
        'Jarvis, deliver with maximum charisma.',
        'Jarvis, send it before I change my mind.',
        'Jarvis, launch the message — no turning back.',
        'Jarvis, transmit with extra flair.',
        'Jarvis, fire this off like a Stark Industries press release.',
        'Jarvis, send the message and play the Avengers theme.',
        'Jarvis, send it and mark it “urgent but polite.”',
        'Jarvis, send this message faster than my Wi‑Fi drops.',
        'Jarvis, transmit and archive the glory.'
      ];
      function pickJarvisPhrase(){
        return jarvisPhrases[Math.floor(Math.random()*jarvisPhrases.length)];
      }
      // mark Jarvis busy so the idle phrases don't overwrite while sending GIF/dialog is visible
      (window as any).__jarvisBusy = true;
      if (jarvis) {
        jarvis.textContent = pickJarvisPhrase();
        jarvis.hidden = false;
        jarvis.classList.remove('hide');
        jarvis.classList.add('show');
      }
      if (jarvisGif) {
        jarvisGif.hidden = false;
        jarvisGif.style.display = 'block';
        jarvisGif.style.opacity = '0';
        jarvisGif.style.zIndex = '60';
        // force reflow then fade in
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        void jarvisGif.offsetWidth;
        jarvisGif.style.transition = 'opacity 220ms ease';
        jarvisGif.style.opacity = '1';
      }
      // hide after 5.5s and allow idle phrases again
      setTimeout(() => {
        if (jarvisGif) {
          jarvisGif.style.opacity = '0';
          const onEnd = function onEnd() {
            jarvisGif.removeEventListener('transitionend', onEnd);
            jarvisGif.style.display = 'none';
            jarvisGif.hidden = true;
            jarvisGif.style.transition = '';
          };
          jarvisGif.addEventListener('transitionend', onEnd);
        }
        if (jarvis) {
          jarvis.classList.remove('show');
          jarvis.classList.add('hide');
          setTimeout(() => { jarvis.hidden = true; jarvis.classList.remove('hide'); }, 420);
        }
        // allow idle phrases to resume
        (window as any).__jarvisBusy = false;
      }, 5500);
      } else {
        let reason = '';
        try {
          const errData = await res.json();
          reason = errData?.message || errData?.error || '';
        } catch {
          reason = '';
        }

        const friendlyError = reason
          ? `Failed to send message: ${reason}`
          : 'Failed to send message. Please try again in a moment.';
        setFormStatus(friendlyError);
        setFormStatusType('error');
      }
    } catch {
      setFormStatus('Could not reach the contact service. Please check your internet connection and try again.');
      setFormStatusType('error');
    }
  }

  return (
    <section id="contact" className="section contact">
      <h2>Reach Out - I'd Love to Hear From You</h2>
      <p>Have a project, collaboration, or question in mind? Send it my way and I'll get back to you soon. Also, if you've explored my portfolio, I'd love to hear what stood out - or what could be better. Your feedback helps me improve and grow.</p>
      <div className="contact-wrap">
        <div className="form-box">
          <div className="contact-figure" id="ironman-3d" aria-hidden="true">
            {/* Helmet canvas above HUD label */}
            <div className="helmet-canvas" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
              <Helmet3D size={0.95} />
            </div>
            <div id="jarvis-dialog" className="jarvis-dialog" role="status" aria-live="polite" hidden></div>
            <div className="eye left-eye" aria-hidden="true"><span className="pupil"></span></div>
            <div className="eye right-eye" aria-hidden="true"><span className="pupil"></span></div>
            <div className="hud-label">J.A.R.V.I.S.</div>
          </div>

          <form id="contact-form" className="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
              <input id="email" name="email" type="email" required placeholder="like johndoe@gmail.com" />
              <span className="error" id="email-error" aria-live="polite"></span>
            </div>

            <div className="form-row phone-row">
              <label htmlFor="phone">Phone <span aria-hidden="true">*</span></label>
              <div className="phone-inputs">
                <div className="autocomplete-wrapper" aria-haspopup="listbox" aria-owns="phone-code-list">
                  <span id="selected-flag" className="selected-flag" aria-hidden="true">{selectedFlag}</span>
                  <input 
                    id="phone-code-search" 
                    className="phone-search" 
                    placeholder="Type country or +code (e.g. +1 US)" 
                    aria-label="Country code" 
                    autoComplete="off"
                    value={searchText}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    onChange={(e) => {
                      const v = e.currentTarget.value;
                      setSearchText(v);
                      const m = v.match(/^(\+\d{1,3})/);
                      if (m) setPhoneCode(m[1]);
                    }}
                  />
                  {showDropdown && (
                    <ul id="phone-code-list" className="phone-autocomplete" role="listbox" aria-label="Country suggestions">
                      {filteredCountries.slice(0,40).map((c:any, i:number) => (
                        <li key={`${c.code}-${c.dial_code}-${i}`} role="option" onClick={() => { 
                          setPhoneCode(c.dial_code); 
                          setSelectedFlag(isoToFlag(c.code)); 
                          setSearchText(`${c.dial_code} ${c.name}`);
                          setShowDropdown(false);
                        }}>
                          <span className="flag">{isoToFlag(c.code)}</span>
                          <span className="country-name">{c.name}</span>
                          <span className="dial-code">{c.dial_code}</span>
                        </li>
                      ))}
                      {filteredCountries.length === 0 && (
                        <li className="no-results" role="option" aria-disabled="true">
                          No countries found
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                <input type="hidden" id="phone-code" name="phoneCode" value={phoneCode} />
                <input id="phone" name="phone" type="tel" inputMode="tel" pattern="[0-9]{6,15}" placeholder="1234567890" required aria-describedby="phone-error" />
              </div>
              <span className="error" id="phone-error" aria-live="polite"></span>
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Tell me about your project (optional)"></textarea>
            </div>

            <div className="form-row"><button type="submit" className="cta">Send message</button></div>

            <div
              id="form-status"
              role="status"
              aria-live="polite"
              className="form-status"
              style={{ color: formStatusType === 'error' ? '#ff7a7a' : formStatusType === 'success' ? '#9ef7b8' : undefined }}
            >
              {formStatus}
            </div>
          </form>

          <div className="jarvis-area" style={{ position: 'relative' }}>
            <div id="jarvis-gif" className="jarvis-gif" hidden>
              <img src="/images/jarvis-hud.gif" alt="JARVIS HUD" />
            </div>
            {/* Send dialog for form submissions — appears above the GIF on the left side */}
            <div id="jarvis-send-dialog" className="jarvis-send-dialog" role="status" aria-live="polite" hidden></div>
          </div>
        </div>
        <p className="privacy-note">By sending, you agree to be contacted about your inquiry. I won't share your contact details.</p>
      </div>
    </section>
  );
}
