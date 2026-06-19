import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import './HomepageGames.css';

const gameShowcase = [
  { id: 'dragUp',  titleKey: 'dragUp_title',  descKey: 'dragUp_desc'  },
  { id: 'catUp',   titleKey: 'catUp_title',   descKey: 'catUp_desc'   },
  { id: 'lineUp',  titleKey: 'lineUp_title',  descKey: 'lineUp_desc'  },
];

export default function HomepageGames() {
  const { t } = useI18n();

  return (
    <section className="homepage-games" aria-label={t.games.title}>
      {/* Section header */}
      <div className="homepage-games__header">
        <span className="homepage-games__eyebrow">🎮</span>
        <h2 className="homepage-games__title">{t.games.title}</h2>
        <p className="homepage-games__subtitle">{t.games.description}</p>
      </div>

      {/* Game cards (showcase 3 of 5) */}
      <div className="homepage-games__grid">
        {gameShowcase.map((game) => (
          <Link key={game.id} to={`/games/${game.id}`} className="hp-game-card">
            <div className="hp-game-card__thumb">
              <img
                src={`/games/screenshots/${game.id}.webp`}
                alt={t.games[game.titleKey as keyof typeof t.games]}
                loading="lazy"
                width="280"
                height="200"
              />
            </div>
            <h3 className="hp-game-card__title">
              {t.games[game.titleKey as keyof typeof t.games]}
            </h3>
            <p className="hp-game-card__desc">
              {t.games[game.descKey as keyof typeof t.games]}
            </p>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="homepage-games__cta">
        <Link to="/games" className="btn-3d">
          {t.games.view_all} →
        </Link>
      </div>
    </section>
  );
}
