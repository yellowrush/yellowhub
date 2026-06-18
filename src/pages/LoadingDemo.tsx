import React, { useState } from 'react';
import Loading from '../components/Loading';
import './LoadingDemo.css';

/**
 * Loading Demo Page
 * 
 * Demonstrates all variants of the Loading component.
 */
export default function LoadingDemo() {
  const [showFullPage, setShowFullPage] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleShowFullPage = () => {
    setShowFullPage(true);
    setTimeout(() => setShowFullPage(false), 3000);
  };

  const handleShowOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  return (
    <div className="demo-page">
      <header className="demo-header">
        <h1>Loading Component Demo</h1>
        <p className="demo-description">
          Inspired by animal-island-ui design. Warm, friendly loading indicators.
        </p>
      </header>

      <div className="demo-section">
        <h2>Loading Types</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Spinner</h3>
            <Loading type="spinner" text="Loading..." />
          </div>
          <div className="demo-item">
            <h3>Dots</h3>
            <Loading type="dots" text="Please wait..." />
          </div>
          <div className="demo-item">
            <h3>Pulse</h3>
            <Loading type="pulse" text="Processing..." />
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Size Variants</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Small</h3>
            <Loading type="spinner" size="small" text="Small" />
          </div>
          <div className="demo-item">
            <h3>Medium (Default)</h3>
            <Loading type="spinner" size="medium" text="Medium" />
          </div>
          <div className="demo-item">
            <h3>Large</h3>
            <Loading type="spinner" size="large" text="Large" />
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Island Theme</h2>
        <div className="demo-item">
          <Loading type="dots" size="large" variant="island" text="Island theme loading..." />
        </div>
      </div>

      <div className="demo-section">
        <h2>Interactive Demos</h2>
        <div className="demo-buttons">
          <button className="demo-button" onClick={handleShowFullPage}>
            Show Full Page Loading (3s)
          </button>
          <button className="demo-button" onClick={handleShowOverlay}>
            Show Overlay Loading (3s)
          </button>
        </div>
      </div>

      {/* Full Page Loading */}
      {showFullPage && (
        <Loading type="dots" size="large" variant="fullpage" text="Loading your content..." />
      )}

      {/* Overlay Loading */}
      {showOverlay && (
        <Loading type="spinner" size="large" variant="overlay" text="Processing..." />
      )}
    </div>
  );
}
