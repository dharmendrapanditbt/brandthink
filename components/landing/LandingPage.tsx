'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { LandingConfig } from './configs';

/* ══ SVG ICONS ══════════════════════════════════════════════ */
const IcoDiagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M50.4759 48.9527H48.8509V18.8906C48.8509 18.0493 48.1688 17.3672 47.3275 17.3672H41.2338C40.3925 17.3672 39.7104 18.0493 39.7104 18.8906V48.9527H36.6636V29.0467C36.6636 28.2054 35.9815 27.5233 35.1401 27.5233H29.0465C28.2051 27.5233 27.5231 28.2054 27.5231 29.0467V48.9527H24.4762V34.6326C24.4762 33.7912 23.7941 33.1092 22.9528 33.1092H16.8591C16.0178 33.1092 15.3357 33.7912 15.3357 34.6326V48.9527H12.2889V38.2888C12.2889 37.4474 11.6068 36.7654 10.7655 36.7654H4.67181C3.83048 36.7654 3.14839 37.4474 3.14839 38.2888V48.9527H1.52342C0.682084 48.9527 0 49.6348 0 50.4761C0 51.3174 0.682084 51.9995 1.52342 51.9995H50.4759C51.3172 51.9995 51.9993 51.3174 51.9993 50.4761C51.9993 49.6348 51.3172 48.9527 50.4759 48.9527Z" fill="black"/><path d="M1.52342 32.7339C11.0314 32.7339 21.3421 29.3192 30.5563 23.1188C37.7727 18.2626 43.7883 12.059 47.5249 5.70663L49.0045 11.2282C49.1869 11.9089 50.0675 12.4969 50.8702 12.3054C51.6886 12.1102 52.1651 11.2523 51.9474 10.4396L49.4527 1.12947C49.2349 0.316882 48.4 -0.165533 47.587 0.0523152L38.2769 2.54696C37.4642 2.76471 36.982 3.60005 37.1997 4.41274C37.4176 5.22543 38.2525 5.70785 39.0655 5.4899L45.0632 3.88279C41.5771 9.94051 35.8157 15.907 28.8552 20.5909C20.1385 26.4567 10.4318 29.687 1.52342 29.687C0.682084 29.687 0 30.3691 0 31.2105C0 32.0518 0.682084 32.7339 1.52342 32.7339Z" fill="black"/></svg>
);
const IcoBullhorn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M0 20.1568V25.6305C0 27.1396 1.22769 28.3673 2.7368 28.3673H3.19292V17.4199H2.7368C1.22769 17.42 0 18.6477 0 20.1568Z" fill="black"/><path d="M5.01758 16.9636V28.8233C5.01758 30.8354 6.65456 32.4724 8.66672 32.4724H16.4211V13.3145H8.66672C6.65456 13.3145 5.01758 14.9514 5.01758 16.9636Z" fill="black"/><path d="M14.5965 33.6807H9.12277C8.78243 33.6807 8.50659 33.9566 8.50659 34.2968V46.1565C8.50659 48.0053 10.0108 49.5096 11.8597 49.5096C13.7085 49.5096 15.2128 48.0054 15.2128 46.1565V34.2968C15.2128 33.9566 14.9368 33.6807 14.5965 33.6807Z" fill="black"/><path d="M45.614 15.6543V30.1327C49.2089 29.6821 52 26.6087 52 22.8936C52 19.1784 49.2089 16.1049 45.614 15.6543Z" fill="black"/><path d="M18.2456 32.7949L37.4035 41.4159V4.37109L18.2456 12.9921V32.7949Z" fill="black"/><path d="M42.9557 2.78669C42.4256 2.44402 41.7917 2.39608 41.2162 2.65506L39.228 3.54973V42.2366L41.2162 43.1313C41.7916 43.3902 42.4256 43.3422 42.9557 42.9996C43.4855 42.657 43.7895 42.0985 43.7895 41.4675V4.31896C43.7895 3.68785 43.4856 3.12936 42.9557 2.78669Z" fill="black"/><path d="M24.2214 37.106C24.1756 36.982 24.0819 36.8815 23.9613 36.8273L22.2977 36.0787C22.2321 36.0492 22.1633 36.0352 22.0957 36.0352C21.9114 36.0352 21.7349 36.1391 21.6505 36.3161C20.6483 38.4177 18.6704 39.8458 16.3597 40.1364C16.1132 40.1673 15.9282 40.377 15.9282 40.6255V42.4605C15.9282 42.5999 15.9871 42.7326 16.0904 42.826C16.1814 42.9084 16.2994 42.9534 16.4211 42.9534C16.4375 42.9534 16.4538 42.9526 16.4703 42.951C19.8103 42.6162 22.774 40.5225 24.2049 37.4871C24.2612 37.3674 24.2671 37.23 24.2214 37.106Z" fill="black"/></svg>
);
const IcoAuction = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M21.9302 43.875H4.05518C3.60644 43.875 3.24268 44.2388 3.24268 44.6875V48.75C3.24268 49.1987 3.60644 49.5625 4.05518 49.5625H21.9302C22.3789 49.5625 22.7427 49.1987 22.7427 48.75V44.6875C22.7427 44.2388 22.3789 43.875 21.9302 43.875Z" fill="black"/><path d="M17.8679 38.1875H8.11792C7.47204 38.1894 6.85314 38.4468 6.39643 38.9035C5.93972 39.3602 5.68231 39.9791 5.68042 40.625V42.25H20.3054V40.625C20.3035 39.9791 20.0461 39.3602 19.5894 38.9035C19.1327 38.4468 18.5138 38.1894 17.8679 38.1875Z" fill="black"/><path d="M15.0148 18.7607L22.8053 10.9702L31.3351 19.5L23.5446 27.2906L15.0148 18.7607Z" fill="black"/><path d="M22.0896 6.8113L26.2212 2.67966C26.3736 2.52731 26.5802 2.44172 26.7957 2.44172C27.0111 2.44172 27.2177 2.52731 27.3701 2.67966L39.556 14.8656C39.7083 15.0179 39.7939 15.2245 39.7939 15.44C39.7939 15.6554 39.7083 15.8621 39.556 16.0144L35.4243 20.1461C35.272 20.2984 35.0654 20.384 34.8499 20.384C34.6344 20.384 34.4278 20.2984 34.2755 20.1461L22.0896 7.96018C21.9372 7.80783 21.8516 7.6012 21.8516 7.38574C21.8516 7.17029 21.9372 6.96365 22.0896 6.8113Z" fill="black"/><path d="M12.0062 18.0436C11.8538 17.8913 11.6472 17.8057 11.4317 17.8057C11.2162 17.8057 11.0095 17.8913 10.8572 18.0436L6.72487 22.1759C6.57252 22.3283 6.48694 22.5349 6.48694 22.7504C6.48694 22.9659 6.57252 23.1725 6.72487 23.3249L18.9124 35.5124C19.0647 35.6647 19.2714 35.7503 19.4868 35.7503C19.7023 35.7503 19.909 35.6647 20.0613 35.5124L24.1935 31.3801C24.3459 31.2277 24.4315 31.0211 24.4315 30.8056C24.4315 30.5901 24.3459 30.3834 24.1935 30.2311L12.0062 18.0436Z" fill="black"/><path d="M47.6642 38.4069L31.2029 21.9375L25.9867 27.1537L42.4561 43.615C43.1467 44.3056 44.0834 44.6936 45.0601 44.6936C46.0368 44.6936 46.9736 44.3056 47.6642 43.615C48.3548 42.9244 48.7428 41.9876 48.7428 41.0109C48.7428 40.0342 48.3548 39.0975 47.6642 38.4069Z" fill="black"/></svg>
);
const IcoSpeedometer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M24.4766 3.57031C18.604 3.9074 13.0969 6.18941 8.70117 10.107L15.4994 16.9052C18.0577 14.7753 21.1641 13.4882 24.4766 13.1855V3.57031Z" fill="black"/><path d="M13.3443 19.0579L6.54621 12.2598C2.62529 16.6543 0.340439 22.1618 0.0012207 28.0358H9.61685C9.92154 24.7227 11.2114 21.616 13.3443 19.0579Z" fill="black"/><path d="M42.3832 28.0358H51.9988C51.6596 22.1618 49.3749 16.6543 45.4538 12.2598L38.6558 19.0579C40.7887 21.6159 42.0785 24.7227 42.3832 28.0358Z" fill="black"/><path d="M42.381 31.084C42.1674 33.4304 41.4978 35.3875 40.7058 36.9573C41.4784 38.1488 42.1225 39.1557 42.5481 39.8244C43.7069 41.6456 43.4503 43.9833 41.9241 45.5097C41.5535 45.8803 41.1301 46.1789 40.6714 46.3996L42.2546 47.983C42.5526 48.281 42.9432 48.4299 43.3337 48.4299C43.7244 48.4299 44.1149 48.281 44.4127 47.983C48.9753 43.4209 51.6358 37.4678 51.9999 31.084H42.381Z" fill="black"/><path d="M9.61898 31.084H0C0.364102 37.4678 3.02453 43.4209 7.58702 47.9831C7.88501 48.2811 8.27552 48.43 8.66602 48.43C9.05653 48.43 9.44714 48.281 9.74513 47.9831L14.3674 43.3605C14.9633 42.7645 14.9633 41.7982 14.3674 41.2023C13.1612 39.996 10.1227 36.6188 9.61898 31.084Z" fill="black"/><path d="M43.2988 10.107C38.9031 6.1893 33.396 3.9074 27.5234 3.57031V13.1855C30.8358 13.4882 33.9423 14.7753 36.5006 16.9052L43.2988 10.107Z" fill="black"/><path d="M29.3849 26.2016C27.5185 24.3352 24.4816 24.3352 22.6151 26.2016C20.7487 28.068 20.7487 31.1049 22.6151 32.9713C24.973 35.3292 36.5608 42.728 37.8744 43.5639C38.4768 43.9473 39.2646 43.8607 39.7696 43.3559C40.2744 42.851 40.361 42.0632 39.9776 41.4607C39.1416 40.1472 31.7428 28.5593 29.3849 26.2016Z" fill="black"/></svg>
);
const CaretRight = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 5l7 7-7 7M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ArrowUpRight = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.66 6.34H7.34v2h6.9L5.64 16.95l1.41 1.41 8.61-8.6v6.9h2V6.34z"/></svg>);
const SmallCaret = () => (<svg width="10" height="14" viewBox="0 0 192 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"/></svg>);
const CaretCircle = () => (<svg className="btl-pt-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 8l4 4-4 4M13 8l3 4-3 4" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IcoLaptopPhone = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="1.5" y="5" width="13" height="9" rx="1"/><path d="M.5 17h15" strokeLinecap="round"/><rect x="17" y="8" width="5.5" height="11" rx="1"/><path d="M19.2 17h1.1" strokeLinecap="round"/></svg>);
const IcoThumbsUp = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 10.5h2.2L11 3.6a1.9 1.9 0 012.9 2.2l-1 4.7h5.2a1.9 1.9 0 011.8 2.4l-1.7 6A2 2 0 0116.3 20H6" strokeLinejoin="round"/><rect x="2" y="10" width="4" height="10" rx="1"/></svg>);
const IcoGraphBars = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 20.5h18" strokeLinecap="round"/><rect x="4" y="13" width="3.4" height="6"/><rect x="10.3" y="9" width="3.4" height="10"/><rect x="16.6" y="4.5" width="3.4" height="14.5"/></svg>);
const IcoRocket = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2.5c3.2 2.2 5 5.6 5 9.4v3.7l-2.6 2.2H9.6L7 15.6v-3.7c0-3.8 1.8-7.2 5-9.4z" strokeLinejoin="round"/><circle cx="12" cy="10" r="1.9"/><path d="M9.6 18l-1.4 3.5M14.4 18l1.4 3.5" strokeLinecap="round"/></svg>);
const IcoMail = () => (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2.5 6.5l9.5 7 9.5-7" strokeLinecap="round"/></svg>);
const IcoGraph = () => (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 20h18" strokeLinecap="round"/><rect x="5" y="12" width="3" height="6"/><rect x="10.5" y="8" width="3" height="10"/><rect x="16" y="4" width="3" height="14"/></svg>);
const IcoCursor = () => (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 3l14 8-6 1.6L10.5 19 5 3z" strokeLinejoin="round"/></svg>);
const IcoSpeed = () => (<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 17a9 9 0 1118 0" strokeLinecap="round"/><line x1="12" y1="17" x2="16.5" y2="10.5" strokeLinecap="round"/></svg>);
const IconGoogleLine = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M21 12h-9v3h5.5" strokeLinecap="round"/></svg>);
const IconFacebookLine = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14 8h2V5h-2a3 3 0 00-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.6c0-.4.2-.6.6-.6H14z" strokeLinejoin="round"/></svg>);
const IconLinkedInLine = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="7.5" cy="7.5" r="1"/><line x1="7.5" y1="10.5" x2="7.5" y2="17" strokeLinecap="round"/><path d="M11 17v-6.5M11 13c0-2.5 5-2.5 5 0V17" strokeLinecap="round"/></svg>);
const IcoCircleArrow = ({ up }: { up: boolean }) => (<svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="10"/>{up ? <path d="M12 16.5V7.8M7.9 11.9L12 7.8l4.1 4.1" strokeLinecap="round" strokeLinejoin="round"/> : <path d="M12 7.5v8.7M7.9 12.1L12 16.2l4.1-4.1" strokeLinecap="round" strokeLinejoin="round"/>}</svg>);

/* ══ ANIMATED HEADING ════════════════════════════════════════ */
function TypedHeading({ prefix, strings }: { prefix: string; strings: string[] }) {
  const [strIdx, setStrIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'erasing'>('typing');
  const charIdx = useRef(0);
  const current = strings[strIdx];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (charIdx.current < current.length) {
        timer = setTimeout(() => { charIdx.current++; setDisplayed(current.slice(0, charIdx.current)); }, 70);
      } else {
        timer = setTimeout(() => setPhase('waiting'), 1600);
      }
    } else if (phase === 'waiting') {
      setPhase('erasing');
    } else if (phase === 'erasing') {
      if (charIdx.current > 0) {
        timer = setTimeout(() => { charIdx.current--; setDisplayed(current.slice(0, charIdx.current)); }, 35);
      } else {
        setStrIdx(i => (i + 1) % strings.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [phase, displayed, current, strings]);

  return (
    <h1 className="btl-h1">
      {prefix} <span className="btl-typed-word">{displayed}<span className="btl-typed-cursor" aria-hidden="true">|</span></span>
    </h1>
  );
}

/* ══ LEAD FORM ═══════════════════════════════════════════════ */
function LeadForm({ primary = false, budgetOptions, location }: { primary?: boolean; budgetOptions: string[]; location: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('Last Name'),
          email: data.get('Email'),
          phone: data.get('Mobile'),
          company: data.get('Company'),
          budget: data.get('LEADCF1'),
          message: data.get('Description'),
          location,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      window.location.href = '/thank-you/';
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="btl-form" onSubmit={handleSubmit}>
      <div className="btl-fg">
        <label className="btl-lbl" htmlFor="Last Name">Full Name <span className="btl-req">*</span></label>
        <input id="Last Name" name="Last Name" className="btl-inp" required maxLength={80} disabled={status === 'sending'} />
      </div>
      <div className="btl-fg">
        <label className="btl-lbl" htmlFor="Email">Email <span className="btl-req">*</span></label>
        <input id="Email" name="Email" type="email" className="btl-inp" required maxLength={100} disabled={status === 'sending'} />
      </div>
      <div className="btl-fg">
        <label className="btl-lbl" htmlFor="Mobile">Phone Number <span className="btl-req">*</span></label>
        <input id="Mobile" name="Mobile" type="tel" className="btl-inp" required maxLength={30} pattern="[0-9()#&+*\-=. ]+" title="Only numbers and phone characters are accepted." disabled={status === 'sending'} />
      </div>
      <div className="btl-fg">
        <label className="btl-lbl" htmlFor="LEADCF1">What&apos;s your monthly budget? <span className="btl-req">*</span></label>
        <select id="LEADCF1" name="LEADCF1" className="btl-sel" required defaultValue={budgetOptions[0]} disabled={status === 'sending'}>
          {budgetOptions.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div className="btl-fg">
        <label className="btl-lbl" htmlFor="Company">Company Name <span className="btl-req">*</span></label>
        <input id="Company" name="Company" className="btl-inp" required maxLength={100} disabled={status === 'sending'} />
      </div>
      <div className="btl-fg">
        <label className="btl-lbl" htmlFor="Description">Tell Us About Your Project <span className="btl-req">*</span></label>
        <textarea id="Description" name="Description" className="btl-ta" rows={4} required disabled={status === 'sending'} />
      </div>
      {status === 'error' && <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '0.75rem' }}>Something went wrong. Please try again or call us directly.</p>}
      <button type="submit" className="btl-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Submit'}</button>
    </form>
  );
}

/* ══ NAV ══════════════════════════════════════════════════════ */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [{ label: 'About Us', href: '#about_us' }, { label: 'Services', href: '#services' }, { label: 'Our Clients', href: '#client' }];
  return (
    <nav className="btl-nav">
      <div className="btl-nav-inner">
        <a href="#" className="btl-logo"><img src="/images/BrandThink_Logo.png" alt="BrandThink" /></a>
        <ul className="btl-links">{links.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
        <a href="#form" className="btl-nav-cta">Get a Free Quote now</a>
        <button className="btl-burger" onClick={() => setOpen(o => !o)} aria-label="Menu"><span /><span /><span /></button>
      </div>
      {open && (
        <div className="btl-mob">
          {links.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a href="#form" className="btl-nav-cta" style={{ width: 'fit-content' }}>Get a Free Quote now</a>
        </div>
      )}
    </nav>
  );
}

/* ══ HERO ══════════════════════════════════════════════════════ */
const HERO_BADGES = [
  { img: '/images/Google-Review-Logo-scaled.png', title: '500+ Verified Reviews' },
  { img: '/images/pp-1.png', title: 'Outcome-Focused Approach' },
  { img: '/images/marketing.png', title: 'Strategic Execution' },
];
const TRUSTED = [
  { src: '/images/flipkart.png', alt: 'Flipkart' },
  { src: '/images/Tally.png', alt: 'Tally Education' },
  { src: '/images/fixderma.png', alt: 'Fixderma' },
  { src: '/images/nikon.png', alt: 'Nikon' },
];

function Hero({ config }: { config: LandingConfig }) {
  const { h1, sub, formTitle } = config.hero;
  return (
    <section className="btl-hero">
      <div className="btl-hero-inner">
        <div className="btl-hero-left">
          {h1.type === 'animated' ? <TypedHeading prefix={h1.prefix} strings={h1.strings} /> : <h1 className="btl-h1">{h1.text}</h1>}
          <h3 className="btl-hero-sub">{sub}</h3>
          <div className="btl-badges">
            {HERO_BADGES.map(b => (<div className="btl-badge" key={b.title}><h3 className="btl-badge-title">{b.title}</h3><figure className="btl-badge-img"><img src={b.img} alt="" /></figure></div>))}
          </div>
        </div>
        <div className="btl-hero-right" id="form">
          <h3 className="btl-form-title">{formTitle}</h3>
          <div className="btl-form-card"><LeadForm primary budgetOptions={config.budgetOptions} location={config.location} /></div>
        </div>
      </div>
      <div className="btl-trusted" id="client">
        <div className="btl-trusted-inner">
          <h6 className="btl-trusted-lbl">Trusted by</h6>
          <div className="btl-trusted-grid">{TRUSTED.map(t => (<div className="btl-trusted-cell" key={t.alt}><img src={t.src} alt={t.alt} /></div>))}</div>
        </div>
      </div>
    </section>
  );
}

/* ══ ABOUT ══════════════════════════════════════════════════════ */
function About({ config }: { config: LandingConfig }) {
  const { h2, sub, p1, p2 } = config.about;
  return (
    <section className="btl-about" id="about_us">
      <div className="btl-about-inner">
        <h2 className="btl-about-eyebrow">About Us</h2>
        <h2 className="btl-about-h2">{h2}</h2>
        {sub && <p className="btl-about-sub">{sub}</p>}
        <div className="btl-about-cols">
          <div className="btl-about-img-wrap"><img src="/images/about-team.jpeg" alt="BrandThink analytics dashboard" /></div>
          <div className="btl-about-body"><p>{p1}</p><p>{p2}</p></div>
        </div>
      </div>
    </section>
  );
}

/* ══ SERVICES ══════════════════════════════════════════════════ */
function Services({ config }: { config: LandingConfig }) {
  const { h2, cta, paidSearchBody } = config.services;
  const cards = [
    { icon: <IcoDiagram />, title: 'Paid Search Dominance', body: paidSearchBody },
    { icon: <IcoBullhorn />, title: 'Paid Social Acquisition', body: 'Stop scrolling and start converting. We transform traditional social feeds into active digital storefronts, leveraging custom creative hooks and real-time data analysis to steadily lower your cost-per-acquisition.' },
    { icon: <IcoAuction />, title: 'Enterprise Commerce', body: 'Media management built specifically for high-volume digital stores. We build cross-channel architectures and budget pacing models designed to accelerate your daily transaction velocity without hurting your product margins.' },
    { icon: <IcoSpeedometer />, title: 'Precision Data', body: 'First-party tracking solutions that completely remove data blind spots. We implement clean, server-side data dashboards to protect your tracking, isolate core unit economics, and give you total clarity over your actual marketing return.' },
  ];
  return (
    <section className="btl-services" id="services">
      <div className="btl-services-inner">
        <div className="btl-services-left">
          <h4 className="btl-services-eyebrow">Our Services</h4>
          <h2 className="btl-services-h2">{h2}</h2>
          <img className="btl-services-img" src="/images/management-image.png" alt="Strategy illustration" />
          <a href="#form" className="btl-link-btn"><CaretRight /><span>{cta}</span></a>
        </div>
        <div className="btl-svc-grid">
          {cards.map(s => (<article className="btl-svc-card" key={s.title}><div className="btl-svc-icon">{s.icon}</div><h3 className="btl-svc-title">{s.title}</h3><p className="btl-svc-body">{s.body}</p></article>))}
        </div>
      </div>
    </section>
  );
}

/* ══ WHY CHOOSE US ══════════════════════════════════════════════ */
const WHY = [
  { title: 'Unit-Economic Clarity', img: '/images/2.webp', pos: 'center center', order: 'img-first' },
  { title: 'Rigorous Testing Iterations', img: '/images/6.webp', pos: 'center left', order: 'text-first' },
  { title: 'Audience Targeting Precision', img: '/images/4.webp', pos: 'center center', order: 'img-first' },
  { title: 'Dynamic Capital Allocation', img: '/images/5.webp', pos: 'center center', order: 'text-first' },
];
function WhyChooseUs({ config }: { config: LandingConfig }) {
  return (
    <section className="btl-why">
      <div className="btl-why-inner">
        <h2 className="btl-why-h2">Why Choose Us</h2>
        <p className="btl-why-sub">{config.whySub}</p>
        <div className="btl-why-grid">
          {WHY.map(w => (<div className={`btl-why-card btl-why--${w.order}`} key={w.title}><div className="btl-why-img" style={{ backgroundImage: `url(${w.img})`, backgroundPosition: w.pos }} role="img" aria-label={w.title}/><div className="btl-why-text"><h2 className="btl-why-title">{w.title}</h2><a href="#form" className="btl-why-btn"><SmallCaret /><span>Contact Us Now</span></a></div></div>))}
        </div>
      </div>
    </section>
  );
}

/* ══ STATS ══════════════════════════════════════════════════════ */
const STATS = [
  { icon: <IcoLaptopPhone />, num: '150+', lbl: 'Projects Delivered' },
  { icon: <IcoThumbsUp />, num: '97%', lbl: 'Client Satisfaction Rate' },
  { icon: <IcoGraphBars />, num: '98%+', lbl: 'Performance Index' },
  { icon: <IcoRocket />, num: '120+', lbl: 'Websites Optimised' },
];
function Stats() {
  return (
    <section className="btl-stats">
      <div className="btl-stats-inner">
        {STATS.map(s => (<div className="btl-stat" key={s.lbl}><span className="btl-stat-ico">{s.icon}</span><span className="btl-stat-txt"><span className="btl-stat-num">{s.num}</span><span className="btl-stat-lbl">{s.lbl}</span></span></div>))}
      </div>
    </section>
  );
}

/* ══ TECHNOLOGY ══════════════════════════════════════════════════ */
function Technology({ config }: { config: LandingConfig }) {
  const TECH = [
    { icon: <IcoDiagram />, title: 'AI-Led Strategy', desc: 'AI-driven analysis catches a ROAS drop or rising CPA early, not at month-end.' },
    { icon: <IcoBullhorn />, title: 'AEO and GEO Implementation', desc: config.aeoDesc },
    { icon: <IcoAuction />, title: 'Campaign Management', desc: 'Campaigns, budgets, and reporting tracked in one system as you scale spend.' },
    { icon: <IcoSpeedometer />, title: 'Performance Tracking', desc: 'Real-time tracking on CPL and ROAS, so issues get caught early.' },
  ];
  return (
    <section className="btl-tech">
      <div className="btl-tech-inner">
        <h4 className="btl-tech-eyebrow">TECHNOLOGY WE USE</h4>
        <h2 className="btl-tech-h2">Strengthen Every Campaign With AI Integrated Techonology</h2>
        <p className="btl-tech-body">We optimise for traditional Google rankings and AI search so your brand shows up in AI Overviews and ChatGPT answers too.</p>
        <div className="btl-tech-grid">
          {TECH.map(t => (<article className="btl-tech-card" key={t.title}><div className="btl-tech-icon">{t.icon}</div><h3 className="btl-tech-title">{t.title}</h3><p className="btl-tech-desc">{t.desc}</p></article>))}
        </div>
      </div>
    </section>
  );
}

/* ══ MULTI PLATFORM ══════════════════════════════════════════════ */
const PLATFORMS = [
  { icon: <IconGoogleLine />, name: 'google', img: '/images/Google-1.png', title: 'What we do with google', desc: 'We capture active buyer intent, block competitor conquesting, and optimize your presence across the full search and YouTube ecosystem.' },
  { icon: <IconFacebookLine />, name: 'Meta', img: '/images/Meta.png', title: 'What we do with meta', desc: 'We scale brand volume using sharp creative hooks, immersive ad sequences, and algorithmic targeting optimized directly for social feeds.' },
  { icon: <IconLinkedInLine />, name: 'Linkedin', img: '/images/Linkedin-1.png', title: 'What we do with Linkedin', desc: 'We clear out consumer noise to deliver your specific B2B messaging straight to corporate decision-makers and high-value professional buyers.' },
];
function MultiPlatform() {
  return (
    <>
      <section className="btl-plat-hd"><div className="btl-plat-hd-inner"><h2 className="btl-plat-h2">Multi Platform Reach</h2><a href="#form" className="btl-plat-btn"><ArrowUpRight /><span>Let&apos;s Talk Performance</span></a></div></section>
      <section className="btl-plat"><div className="btl-plat-inner">{PLATFORMS.map(p => (<div className="btl-plat-col" key={p.name}><div className="btl-plat-tag">{p.icon}<span>{p.name}</span></div><img className="btl-plat-img" src={p.img} alt={p.name}/><h3 className="btl-plat-title">{p.title}</h3><p className="btl-plat-desc">{p.desc}</p></div>))}</div></section>
    </>
  );
}

/* ══ OTHER SERVICES CAROUSEL ════════════════════════════════════ */
const OTHER = [
  { icon: <IcoMail />, title: 'Email Automation', body: 'Automated email flows built to engage, nurture, and move your audience closer to a decision.', pts: ['Audience segmentation', 'Behaviour-triggered sequences', 'Performance tracking'] },
  { icon: <IcoGraph />, title: 'CRM system', body: 'Streamlined CRM setup to track every lead, manage follow-ups, and close the loop on conversions.', pts: ['Lead management', 'Pipeline tracking', 'Actionable reporting'] },
  { icon: <IcoCursor />, title: 'PPC', body: 'Performance-driven paid campaigns built to maximise ROI on every rupee of ad spend.', pts: ['Google & Meta Ads', 'Precise audience targeting', 'Continuous optimisation'] },
  { icon: <IcoSpeed />, title: 'Website Optimisation', body: "Your landing page is where campaigns win or lose. We make sure it's working for you.", pts: ['Speed & performance fixes', 'UX/UI improvements', 'Conversion tracking'] },
  { icon: <IcoMail />, title: 'ANALYTICS & TRACKING', body: 'Full visibility into what your campaigns are doing and what they should be doing instead.', pts: ['Conversion tracking setup', 'Funnel performance insights', 'Real-time reporting'] },
  { icon: <IcoMail />, title: 'CAMPAIGN SCALING', body: 'Strategic scaling methods to grow campaigns without compromising performance.', pts: ['Budget scaling strategies', 'Winning campaign expansion', 'ROI-focused growth'] },
];
function useLoop(length: number) {
  const [start, setStart] = useState(0);
  const prev = () => setStart(s => (s - 1 + length) % length);
  const next = () => setStart(s => (s + 1) % length);
  const rotated = Array.from({ length }, (_, i) => (start + i) % length);
  return { start, prev, next, rotated };
}
function OtherServices() {
  const { prev, next, rotated } = useLoop(OTHER.length);
  return (
    <>
      <section className="btl-other-hd"><div className="btl-other-hd-inner"><h2 className="btl-other-h2">Our Other Services</h2></div></section>
      <section className="btl-carousel">
        <div className="btl-carousel-inner">
          <div className="btl-carousel-viewport">
            <div className="btl-carousel-track">
              {rotated.map(i => { const s = OTHER[i]; return (<div className="btl-slide" key={i}><div className="btl-slide-inner"><div className="btl-slide-icon">{s.icon}</div><h3 className="btl-slide-title">{s.title}</h3><div className="btl-slide-body">{s.body}</div><hr className="btl-slide-hr"/><ul className="btl-slide-pts">{s.pts.map(p => <li key={p}><CaretCircle/>{p}</li>)}</ul></div></div>); })}
            </div>
          </div>
          <button className="btl-car-btn btl-car-prev" onClick={prev} aria-label="Previous">‹</button>
          <button className="btl-car-btn btl-car-next" onClick={next} aria-label="Next">›</button>
        </div>
      </section>
    </>
  );
}

/* ══ CTA BAND ════════════════════════════════════════════════════ */
function CTABand() {
  return (
    <section className="btl-cta">
      <div className="btl-cta-inner">
        <div className="btl-cta-left"><h2 className="btl-cta-h2">Ready to Secure Your Competitive Edge?</h2></div>
        <div className="btl-cta-mid">
          <h2 className="btl-cta-body">Stop letting platform algorithm shifts dictate your profit margins. Let&apos;s sit down, review your live data, and build a localized customer acquisition funnel engineered to scale.</h2>
          <a href="#booking" className="btl-link-btn"><CaretRight /><span>Schedule a Strategy Session With Us</span></a>
        </div>
        <div className="btl-cta-right"><img src="/images/banner-shape1.png" alt=""/></div>
      </div>
    </section>
  );
}

/* ══ TESTIMONIALS ════════════════════════════════════════════════ */
const TESTI = [
  { text: 'The Brand Think team is very professional and communicative, Working with them is an amazing experience and the team understands and creates a funnel on which the work is. Under the leadership of Aditya, they are doing a great job.', name: 'Ridhima Khera', role: 'Founder, AYCS' },
  { text: "After working with numerous marketing companies, I have finally found BrandThink as my marketing partner. Aditya Raj, the founder of BrandThink, is quick, efficient and knowledgeable, leading to substantial brand growth. It's a fantastic team to collaborate with.", name: 'Manish Bhavani', role: 'Founder, Manaca' },
  { text: 'The BrandThink team has been outstanding. They revamped our digital strategy, handling everything from Meta Ads to website development, and the improvements have been remarkable. Our online presence has never been this strong.', name: 'Prashanth Bollikonda', role: 'Grocery Garden' },
];
function Testimonials() {
  const { start, prev, next, rotated } = useLoop(TESTI.length);
  return (
    <section className="btl-testi">
      <div className="btl-testi-inner">
        <p className="btl-testi-sub">The Brands that trust our process and results that we deliver</p>
        <h3 className="btl-testi-h3">The Words Of Trust</h3>
        <div className="btl-testi-viewport">
          <div className="btl-testi-track">
            {rotated.map(i => { const t = TESTI[i]; return (<div className="btl-testi-slide" key={i}><div className="btl-testi-card"><span className="btl-testi-mark" aria-hidden="true"/><p className="btl-testi-text">{t.text}</p><div className="btl-testi-who"><h5 className="btl-testi-name">{t.name}</h5><h6 className="btl-testi-role">{t.role}</h6></div></div></div>); })}
          </div>
        </div>
        <div className="btl-testi-nav">
          <button className="btl-testi-btn" onClick={prev} aria-label="Previous">←</button>
          <span className="btl-testi-count"><span className="btl-testi-cur">{start + 1}</span><span className="btl-testi-sep">/</span><span>{TESTI.length}</span></span>
          <button className="btl-testi-btn" onClick={next} aria-label="Next">→</button>
        </div>
      </div>
    </section>
  );
}

/* ══ FAQ + BOOKING ════════════════════════════════════════════════ */
function FaqAndBooking({ config }: { config: LandingConfig }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="btl-faq-section" id="booking">
      <div className="btl-faq-inner">
        <div className="btl-faq-left">
          <h2 className="btl-faq-h2">FAQs</h2>
          <div className="btl-acc">
            {config.faqs.map((f, i) => (
              <div className={`btl-acc-item${open === i ? ' open' : ''}`} key={i}>
                <button className="btl-acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <h3>{f.q}</h3>
                  <span className="btl-acc-ico"><IcoCircleArrow up={open === i}/></span>
                </button>
                {open === i && <div className="btl-acc-a">{f.a.map((p, j) => <p key={j}>{p}</p>)}</div>}
              </div>
            ))}
          </div>
          <a href="#booking-form" className="btl-plat-btn btl-faq-cta"><ArrowUpRight /><span>Request A Quote Today</span></a>
        </div>
        <aside className="btl-faq-right" id="booking-form">
          <h1 className="btl-booking-h1">Book Your Free Consultation Now</h1>
          <div className="btl-booking-form"><LeadForm budgetOptions={config.budgetOptions} location={config.location}/></div>
        </aside>
      </div>
    </section>
  );
}

/* ══ ROOT EXPORT ══════════════════════════════════════════════════ */
export default function LandingPage({ config }: { config: LandingConfig }) {
  return (
    <div className="btl-root">
      <Nav />
      <Hero config={config} />
      <About config={config} />
      <Services config={config} />
      <WhyChooseUs config={config} />
      <Stats />
      <Technology config={config} />
      <MultiPlatform />
      <OtherServices />
      <CTABand />
      <Testimonials />
      <FaqAndBooking config={config} />
    </div>
  );
}
