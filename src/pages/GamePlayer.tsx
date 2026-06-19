import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18nContext';
import { gameList } from './Games';
import './GamePlayer.css';

/**
 * Dedicated game player page.
 *
 * First-screen optimisation strategy:
 * 1. **Instant skeleton** — the page shell renders immediately (SSG-friendly),
 *    so the user sees the layout before the heavy iframe loads.
 * 2. **Deferred iframe mount** — the <iframe> is only inserted after the
 *    component mounts on the client, with a brief 150 ms delay so the
 *    skeleton paints first (avoids blocking first paint).
 * 3. **Loading overlay** — a warm-toned spinner covers the iframe area until
 *    the iframe's `onLoad` fires, then fades out.
 * 4. **preconnect hint** — injected as a <link rel="preconnect"> so the
 *    browser warms up the connection for same-origin game assets.
 */
export default function GamePlayer() {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useI18n();

  const game = gameList.find((g) => g.id === gameId);

  const [iframeReady, setIframeReady] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  // Defer iframe mount slightly so the skeleton paints first
  useEffect(() => {
    const timer = setTimeout(() => setShouldMount(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleLoad = useCallback(() => {
    setIframeReady(true);
  }, []);

  // Invalid game ID → redirect to games list
  if (!game) {
    return <Navigate to="/games" replace />;
  }

  const title = t.games[game.titleKey as keyof typeof t.games];
  const desc = t.games[game.descKey as keyof typeof t.games];

  return (
    <div className="game-player">
      {/* Preconnect for same-origin game assets */}
      <link rel="preconnect" href={game.url} />

      {/* Top bar */}
      <div className="game-player__topbar">
        <Link to="/games" className="game-player__back btn-3d btn-outline">
          {t.games.back_to_games}
        </Link>
        <h1 className="game-player__title">{title}</h1>
        <div className="game-player__spacer" />
      </div>

      {/* Game stage */}
      <div className="game-player__stage">
        {/* Loading overlay — visible until iframe onLoad fires */}
        {!iframeReady && (
          <div className="game-player__loading" aria-live="polite">
            <div className="game-player__spinner" />
            <p className="game-player__loading-text">{t.games.loading}</p>
          </div>
        )}

        {/* Iframe — mounted after a short delay for paint optimisation */}
        {shouldMount && (
          <iframe
            className={`game-player__iframe ${iframeReady ? 'is-ready' : ''}`}
            src={game.url}
            title={title}
            onLoad={handleLoad}
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          />
        )}
      </div>

      {/* Description bar */}
      <div className="game-player__info">
        <p>{desc}</p>
      </div>
    </div>
  );
}
