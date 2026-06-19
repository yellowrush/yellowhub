import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import './Games.css';

export interface GameInfo {
  id: string;
  titleKey: string;
  descKey: string;
  url: string;
  tags: string[];
}

export const gameList: GameInfo[] = [
  {
    id: 'dragUp',
    titleKey: 'dragUp_title',
    descKey: 'dragUp_desc',
    url: '/games/dragUp.html',
    tags: ['puzzle', 'drag'],
  },
  {
    id: 'alignUp',
    titleKey: 'alignUp_title',
    descKey: 'alignUp_desc',
    url: '/games/alignUp/',
    tags: ['strategy', 'board'],
  },
  {
    id: 'catUp',
    titleKey: 'catUp_title',
    descKey: 'catUp_desc',
    url: '/games/catUp.html',
    tags: ['casual', 'cute'],
  },
  {
    id: 'findUp',
    titleKey: 'findUp_title',
    descKey: 'findUp_desc',
    url: '/games/findUp.html',
    tags: ['memory', 'search'],
  },
  {
    id: 'lineUp',
    titleKey: 'lineUp_title',
    descKey: 'lineUp_desc',
    url: '/games/lineUp.html',
    tags: ['puzzle', 'lines'],
  },
];

export default function Games() {
  const { t } = useI18n();

  return (
    <div className="games-page">
      <header className="games-header">
        <h1>🎮 {t.games.title}</h1>
        <p className="games-description">{t.games.description}</p>
      </header>

      <div className="games-grid">
        {gameList.map((game) => (
          <Link key={game.id} to={`/games/${game.id}`} className="game-card">
            <div className="game-card__thumb">
              <img
                src={`/games/screenshots/${game.id}.webp`}
                alt={t.games[game.titleKey as keyof typeof t.games]}
                loading="lazy"
                width="280"
                height="200"
              />
            </div>
            <div className="game-card__body">
              <h2 className="game-card-title">
                {t.games[game.titleKey as keyof typeof t.games]}
              </h2>
              <p className="game-card-desc">
                {t.games[game.descKey as keyof typeof t.games]}
              </p>
              <div className="game-card-tags">
                {game.tags.map((tag) => (
                  <span key={tag} className="game-tag">#{tag}</span>
                ))}
              </div>
              <span className="game-card-button btn-3d btn-primary">
                {t.games.play_button}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
