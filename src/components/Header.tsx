import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo" onClick={closeMobileMenu}>
          <span className="header-logo-icon">🍃</span>
          <h1 className="header-logo-text">YellowHub</h1>
        </Link>

        <button
          className="header-mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t.footer.nav_home}
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t.footer.nav_blog}
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t.footer.nav_games}
          </NavLink>
          <a
            href="https://github.com/yellowrush"
            target="_blank"
            rel="noopener noreferrer"
            className="header-link header-link-external"
            onClick={closeMobileMenu}
          >
            GitHub
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
