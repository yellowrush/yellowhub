import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import './Footer.css';

/* ---------- Sea Wave SVG ---------- */
const SeaWave = ({
  depth = 1,
  color = '#0d3b5c',
}: {
  depth?: number;
  color?: string;
}) => (
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', width: '100%', height: `${50 + depth * 10}px` }}
  >
    {depth === 1 && (
      <>
        <path
          d="M0,40 C120,70 240,10 360,40 C480,70 600,10 720,40 C840,70 960,10 1080,40 C1200,70 1320,10 1440,40 L1440,80 L0,80 Z"
          fill={color}
          opacity="0.4"
        />
        <path
          d="M0,55 C180,25 360,75 540,55 C720,35 900,75 1080,55 C1260,35 1380,60 1440,55 L1440,80 L0,80 Z"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M0,65 C200,45 400,75 600,65 C800,55 1000,75 1200,65 C1320,58 1380,70 1440,65 L1440,80 L0,80 Z"
          fill={color}
        />
      </>
    )}
    {depth === 2 && (
      <path
        d="M0,30 C160,60 320,0 480,30 C640,60 800,0 960,30 C1120,60 1280,0 1440,30 L1440,80 L0,80 Z"
        fill={color}
      />
    )}
  </svg>
);

/* ---------- Bubble ---------- */
const Bubble = ({
  x,
  size,
  delay,
}: {
  x: number;
  size: number;
  delay: number;
}) => (
  <div
    className="sea-bubble"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      animationDelay: `${delay}s`,
    }}
  />
);

/* ---------- Fish SVG ---------- */
const Fish = ({ style, size = 32 }: { style?: React.CSSProperties; size?: number }) => (
  <svg
    width={size}
    height={size * 0.56}
    viewBox="0 0 32 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M28 9 C26 4 20 2 14 3 C8 4 3 7 2 9 C3 11 8 14 14 15 C20 16 26 14 28 9Z"
      fill="currentColor"
      opacity="0.6"
    />
    <path d="M28 9 L32 5 L32 13 Z" fill="currentColor" opacity="0.6" />
    <circle cx="7" cy="8" r="1.5" fill="white" opacity="0.8" />
  </svg>
);

/* ---------- Fish Config ---------- */
const FISH_CONFIG = [
  // Swim right (→)
  { color: '#9ee8ef', size: 32, top: '15%', duration: '14s', delay: '0s', dir: 'right' as const },
  { color: '#19c8b9', size: 28, top: '35%', duration: '18s', delay: '4s', dir: 'right' as const },
  { color: '#5ec4d4', size: 22, top: '55%', duration: '11s', delay: '2s', dir: 'right' as const },
  // Swim left (←)
  { color: '#9ee8ef', size: 26, top: '25%', duration: '16s', delay: '6s', dir: 'left' as const },
  { color: '#19c8b9', size: 34, top: '45%', duration: '20s', delay: '1s', dir: 'left' as const },
  { color: '#7dd8e0', size: 20, top: '68%', duration: '10s', delay: '5s', dir: 'left' as const },
];

export default function Footer() {
  const { t, toggleLocale } = useI18n();
  const { isDark, toggleTheme } = useTheme();

  return (
    <footer className="footer-sea">
      {/* Wave transition layers */}
      <div className="footer-sea-waves">
        <SeaWave depth={1} color="var(--sea-mid)" />
      </div>

      {/* Sea body */}
      <div className="footer-sea-body">
        {/* Bubbles animation */}
        <div className="footer-sea-bubbles" aria-hidden="true">
          <Bubble x={5} size={8} delay={0} />
          <Bubble x={12} size={5} delay={1.2} />
          <Bubble x={22} size={10} delay={0.4} />
          <Bubble x={35} size={6} delay={2.1} />
          <Bubble x={48} size={9} delay={0.8} />
          <Bubble x={58} size={5} delay={1.8} />
          <Bubble x={68} size={12} delay={0.2} />
          <Bubble x={78} size={7} delay={2.5} />
          <Bubble x={88} size={5} delay={1.0} />
          <Bubble x={95} size={8} delay={1.5} />
        </div>

        {/* Fish decorations */}
        <div className="footer-sea-fish" aria-hidden="true">
          {FISH_CONFIG.map((f, i) => (
            <Fish
              key={i}
              size={f.size}
              style={{
                color: f.color,
                position: 'absolute',
                top: f.top,
                animation: `${f.dir === 'right' ? 'fishSwimRight' : 'fishSwimLeft'} ${f.duration} linear infinite`,
                animationDelay: f.delay,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="footer-sea-content">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <span className="footer-brand-icon">🌊</span>
              <h2 className="footer-brand-name">YellowHub</h2>
            </div>
            <p className="footer-brand-tagline">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div className="footer-link-group">
              <h3 className="footer-link-group-title">{t.footer.nav_title}</h3>
              <Link to="/" className="footer-link">
                {t.footer.nav_home}
              </Link>
              <Link to="/blog" className="footer-link">
                {t.footer.nav_blog}
              </Link>
            </div>
            <div className="footer-link-group">
              <h3 className="footer-link-group-title">
                {t.footer.connect_title}
              </h3>
              <a
                href="https://github.com/yellowrush"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {t.footer.connect_github}
              </a>
              <a
                href="https://github.com/yellowrush/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {t.footer.connect_resume}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + toggles */}
        <div className="footer-sea-bottom">
          <span className="footer-copyright">{t.footer.copyright}</span>

          {/* Toggle buttons */}
          <div className="footer-toggles">
            {/* Language toggle */}
            <button
              className="footer-toggle-btn"
              onClick={toggleLocale}
              aria-label="Toggle language"
              type="button"
            >
              🌐 {t.footer.toggle_lang}
            </button>

            {/* Dark mode toggle */}
            <button
              className="footer-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              type="button"
            >
              {isDark ? t.footer.toggle_lightmode : t.footer.toggle_darkmode}
            </button>
          </div>
        </div>

        {/* Deep sea floor */}
        <div className="footer-sea-floor">
          {/* Seaweed */}
          <div className="sea-seaweed sea-seaweed--1" aria-hidden="true">
            🌿
          </div>
          <div className="sea-seaweed sea-seaweed--2" aria-hidden="true">
            🌿
          </div>
          <div className="sea-seaweed sea-seaweed--3" aria-hidden="true">
            🌿
          </div>
          <div className="sea-coral" aria-hidden="true">
            🪸
          </div>
          <div className="sea-star" aria-hidden="true">
            ⭐
          </div>
        </div>
      </div>
    </footer>
  );
}
