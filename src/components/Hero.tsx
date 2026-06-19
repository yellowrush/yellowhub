import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FloatingParticles } from './Decorations';
import TimeWidget from './TimeWidget';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import './Hero.css';

/* ---------- Sun SVG ---------- */
function Sun() {
  return (
    <div className="celestial-sun">
      <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
        {/* Outer glow */}
        <circle cx="60" cy="60" r="58" fill="none" stroke="#f5c31c" strokeWidth="1" opacity="0.2" />
        {/* Rays */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
          <line
            key={angle}
            x1="60"
            y1="60"
            x2={60 + 48 * Math.cos((angle * Math.PI) / 180)}
            y2={60 + 48 * Math.sin((angle * Math.PI) / 180)}
            stroke="#f5c31c"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}
        {/* Sun body */}
        <circle cx="60" cy="60" r="22" fill="#f5c31c" />
        <circle cx="60" cy="60" r="18" fill="#f7d849" />
        {/* Cheeks */}
        <circle cx="50" cy="64" r="3" fill="#f5a31c" opacity="0.3" />
        <circle cx="70" cy="64" r="3" fill="#f5a31c" opacity="0.3" />
        {/* Eyes */}
        <circle cx="52" cy="57" r="2.2" fill="#794f27" />
        <circle cx="68" cy="57" r="2.2" fill="#794f27" />
        {/* Smile */}
        <path d="M52 64 Q60 70 68 64" stroke="#794f27" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ---------- Moon SVG ---------- */
function Moon() {
  return (
    <div className="celestial-moon">
      <svg viewBox="0 0 120 120" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        {/* Moon glow */}
        <circle cx="58" cy="55" r="40" fill="#e8e0d0" opacity="0.08" />
        {/* Moon body (crescent) */}
        <circle cx="55" cy="55" r="26" fill="#e8e0d0" />
        <circle cx="65" cy="48" r="22" fill="var(--hero-bg-from, #0d3b5c)" />
        {/* Craters on visible surface */}
        <circle cx="46" cy="50" r="3" fill="#d4cfc0" opacity="0.5" />
        <circle cx="42" cy="62" r="2" fill="#d4cfc0" opacity="0.4" />
        <circle cx="52" cy="70" r="2.5" fill="#d4cfc0" opacity="0.3" />
        {/* Night stars */}
        <circle cx="90" cy="25" r="1.5" fill="#f5c31c" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="95" cy="72" r="1" fill="#f5c31c" opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="18" r="1.2" fill="#f5c31c" opacity="0.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="90" r="1" fill="#f5c31c" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
        {/* Star sparkle cross */}
        <g transform="translate(30, 85)" opacity="0.6">
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#f5c31c" strokeWidth="1" />
          <line x1="-4" y1="0" x2="4" y2="0" stroke="#f5c31c" strokeWidth="1" />
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.8s" repeatCount="indefinite" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- Typewriter Component ---------- */
type TypewriterPhase = 'typing' | 'pause' | 'deleting';

/**
 * Pure typewriter component. When locale changes the parent renders it with a
 * new `key`, which remounts this component from scratch — no setState-in-effect.
 */
function Typewriter({ lines, typingSpeed = 50, pauseDuration = 1800, deletingSpeed = 30 }: {
  lines: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
}) {
  // Pre-split lines into proper Unicode character arrays (handles emoji surrogate pairs)
  // Stable across renders — stored in a ref, never in the dependency array.
  const charLinesRef = useRef(lines.map((l) => [...l]));
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const stateRef = useRef<{
    lineIndex: number;
    charIndex: number; // index into charLinesRef[lineIndex] array
    phase: TypewriterPhase;
  }>({
    lineIndex: 0, charIndex: 0, phase: 'typing',
  });

  // Ticker effect — runs exactly once on mount, cleaned up on unmount (key=locale remounts)
  useEffect(() => {
    const timeoutRef = { current: null as ReturnType<typeof setTimeout> | null };

    function tick() {
      const { lineIndex, charIndex, phase } = stateRef.current;
      const charLines = charLinesRef.current;
      if (charLines.length === 0) return;
      const currentChars = charLines[lineIndex];

      if (phase === 'typing') {
        if (charIndex < currentChars.length) {
          const next = charIndex + 1;
          stateRef.current.charIndex = next;
          setDisplayText(currentChars.slice(0, next).join(''));
          timeoutRef.current = setTimeout(tick, typingSpeed);
        } else {
          stateRef.current.phase = 'pause';
          timeoutRef.current = setTimeout(() => {
            stateRef.current.phase = 'deleting';
            tick();
          }, pauseDuration);
        }
      } else if (phase === 'deleting') {
        if (charIndex > 0) {
          const next = charIndex - 1;
          stateRef.current.charIndex = next;
          setDisplayText(currentChars.slice(0, next).join(''));
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        } else {
          stateRef.current.lineIndex = (lineIndex + 1) % charLines.length;
          stateRef.current.phase = 'typing';
          timeoutRef.current = setTimeout(tick, typingSpeed);
        }
      }
    }

    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [typingSpeed, pauseDuration, deletingSpeed]);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 350);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="hero-subtitle">
      <span className="hero-typewriter">{displayText}</span>
      <span className="hero-cursor" style={{ opacity: cursorVisible ? 0.9 : 0 }}>|</span>
    </p>
  );
}

/* ---------- Hero ---------- */
export default function Hero() {
  const { t, locale } = useI18n();
  const { isDark } = useTheme();

  return (
    <div className="hero">
      {/* Celestial body: Sun or Moon */}
      <div className="hero-celestial" aria-hidden="true">
        {isDark ? <Moon /> : <Sun />}
      </div>

      {/* Floating particles */}
      <div className="hero-particles">
        <FloatingParticles />
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            {t.hero.title}
            <br />
            {t.hero.titleLine2}
            <span className="hero-title-version">{t.hero.version}</span>
          </h1>

          {/* Typewriter: key=locale causes remount on language switch */}
          <Typewriter key={locale} lines={t.hero.subtitle} />

          {/* Tech badges */}
          <div className="hero-badges">
            <span className="hero-badge">{t.hero.badge_years}</span>
            <span className="hero-badge">Vue / Nuxt.js</span>
            <span className="hero-badge">React</span>
            <span className="hero-badge">{t.hero.badge_medtech}</span>
            <span className="hero-badge">{t.hero.badge_ai}</span>
          </div>

          {/* CTA */}
          <div className="hero-actions">
            <Link to="/blog" className="btn-3d">
              {t.hero.cta_explore}
            </Link>
          </div>

          {/* Trust signals */}
          <div className="hero-trust">
            <span className="hero-trust-item">{t.hero.trust_opensource}</span>
            <span className="hero-trust-item">{t.hero.trust_location}</span>
          </div>
        </div>

        {/* Time Widget (replaces island illustration) */}
        <div className="hero-illustration">
          <TimeWidget />
        </div>
      </div>
    </div>
  );
}
