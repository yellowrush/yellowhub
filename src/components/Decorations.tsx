import React from 'react';

/**
 * Wave SVG Decoration
 * Inspired by animal-island-ui Footer (sea variant)
 * Used at the bottom of the page above the footer
 */
export const WaveDecoration: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#e6f9f6',
}) => (
  <svg
    className={className}
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', width: '100%' }}
  >
    <path
      d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
      fill={color}
    />
    <path
      d="M0,80 C200,40 400,100 600,70 C800,40 1000,100 1200,70 C1320,55 1380,75 1440,65 L1440,120 L0,120 Z"
      fill={color}
      opacity="0.6"
    />
  </svg>
);

/**
 * Leaf SVG decoration
 * Used as a subtle decorative element in the Hero section
 */
export const LeafIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 24,
  color = '#19c8b9',
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9C11.5 19 8 14.5 8 9.5 8 6 9.5 3 12 2z"
      fill={color}
      opacity="0.3"
    />
    <path
      d="M12 2c2.5 1 4 4 4 7.5 0 5-3.5 9.5-8.3 11.6C9 22.7 10.5 23 12 23c5.5 0 10-4.5 10-10S17.5 2 12 2z"
      fill={color}
    />
  </svg>
);

/**
 * Island SVG decoration
 * Central decorative element for the Hero section
 */
export const IslandDecoration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 320 200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: '320px', width: '100%' }}
  >
    {/* Water */}
    <ellipse cx="160" cy="180" rx="155" ry="20" fill="#19c8b9" opacity="0.15" />

    {/* Island base */}
    <ellipse cx="160" cy="170" rx="100" ry="16" fill="#d4b896" />
    <ellipse cx="160" cy="168" rx="95" ry="14" fill="#e8d5bc" />

    {/* Palm tree trunk */}
    <path
      d="M160 168 Q155 130 150 90 Q148 70 155 50"
      stroke="#9a835a"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
    />

    {/* Palm leaves */}
    <g transform="translate(155, 50)">
      <path d="M0,0 Q-30,-20 -50,-10 Q-30,-15 0,0" fill="#27d039" />
      <path d="M0,0 Q-20,-35 -10,-50 Q-10,-30 0,0" fill="#19c8b9" />
      <path d="M0,0 Q20,-35 30,-45 Q15,-28 0,0" fill="#27d039" />
      <path d="M0,0 Q35,-15 55,-5 Q30,-12 0,0" fill="#19c8b9" />
      <path d="M0,0 Q-10,-40 5,-55 Q5,-35 0,0" fill="#40a880" />
    </g>

    {/* Small hut */}
    <rect x="170" y="148" width="25" height="20" rx="2" fill="#c4a882" />
    <path d="M167 148 L182 135 L197 148 Z" fill="#b85a30" />
    <rect x="178" y="155" width="8" height="13" rx="1" fill="#705830" />

    {/* Small coconuts */}
    <circle cx="150" cy="55" r="3" fill="#705830" />
    <circle cx="158" cy="52" r="3" fill="#9a835a" />
    <circle cx="153" cy="48" r="3" fill="#705830" />

    {/* Stars */}
    <circle cx="60" cy="40" r="1.5" fill="#f5c31c" opacity="0.6" />
    <circle cx="250" cy="30" r="1.5" fill="#f5c31c" opacity="0.6" />
    <circle cx="100" cy="25" r="1" fill="#f5c31c" opacity="0.4" />
    <circle cx="220" cy="50" r="1" fill="#f5c31c" opacity="0.4" />
  </svg>
);

/**
 * Floating clouds decoration
 * Realistic cloud shapes that drift across the Hero section
 */
export const FloatingParticles: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={className}
    style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' }}
  >
    {/* Cloud 1 — large, upper-left */}
    <svg viewBox="0 0 140 64" className="hero-cloud hero-cloud--1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 52c-10 0-17-7-17-15s7-14 15-14c2-9 10-16 20-16 8 0 14 5 17 12 3-2 7-3 10-3 9 0 16 7 16 15s-7 14-16 14H28z"
        fill="white"
        opacity="0.28"
      />
      <path
        d="M34 52c-8 0-14-5-14-12s6-11 12-11c2-7 8-13 16-13 7 0 12 4 14 10 2-1 5-2 8-2 7 0 13 5 13 12s-6 11-13 11H34z"
        fill="white"
        opacity="0.18"
      />
    </svg>

    {/* Cloud 2 — medium, mid-right */}
    <svg viewBox="0 0 110 50" className="hero-cloud hero-cloud--2" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 40c-8 0-13-5-13-12s5-11 12-11c1-7 8-13 16-13 7 0 12 4 14 10 2-1 4-2 7-2 7 0 13 5 13 12s-6 11-13 11H22z"
        fill="white"
        opacity="0.25"
      />
      <path
        d="M28 40c-6 0-10-4-10-9s4-8 9-8c1-6 6-10 12-10 5 0 10 3 11 8 2-1 4-2 6-2 5 0 10 4 10 9s-5 8-10 8H28z"
        fill="white"
        opacity="0.15"
      />
    </svg>

    {/* Cloud 3 — small, lower-left */}
    <svg viewBox="0 0 90 40" className="hero-cloud hero-cloud--3" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 32c-6 0-10-4-10-9s4-8 9-8c1-5 6-9 12-9 5 0 9 3 11 7 2-1 3-1 5-1 6 0 10 4 10 9s-4 8-10 8H18z"
        fill="white"
        opacity="0.22"
      />
    </svg>

    {/* Cloud 4 — tiny, far background */}
    <svg viewBox="0 0 70 30" className="hero-cloud hero-cloud--4" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 24c-5 0-8-3-8-7s3-6 7-6c1-4 5-7 9-7 4 0 7 2 8 6 1-1 3-1 4-1 4 0 8 3 8 7s-4 6-8 6H14z"
        fill="white"
        opacity="0.16"
      />
    </svg>

    {/* Cloud 5 — medium, right side */}
    <svg viewBox="0 0 120 50" className="hero-cloud hero-cloud--5" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 40c-7 0-12-5-12-11s5-10 11-10c2-7 8-12 15-12 6 0 11 3 13 9 2-1 5-2 7-2 7 0 12 5 12 11s-5 10-12 10H24z"
        fill="white"
        opacity="0.2"
      />
    </svg>
  </div>
);

/**
 * Scroll down hint arrow
 * Same as animal-island-ui homepage
 */
export const ScrollHint: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 40,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
      cursor: 'pointer',
      animation: visible ? 'bounce 2s ease-in-out infinite' : 'none',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}
  >
    <span style={{ color: '#FFF9E6', fontSize: 12, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
      Scroll
    </span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12l7 7 7-7" stroke="#FFF9E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);
