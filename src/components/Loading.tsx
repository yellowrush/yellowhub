import React from 'react';
import './Loading.css';

export type LoadingType = 'spinner' | 'dots' | 'pulse';
export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingVariant = 'default' | 'island' | 'inline' | 'fullpage' | 'overlay';

export interface LoadingProps {
  /** Loading type */
  type?: LoadingType;
  /** Size variant */
  size?: LoadingSize;
  /** Visual variant */
  variant?: LoadingVariant;
  /** Loading text to display */
  text?: string;
  /** Whether to show the loading indicator */
  visible?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Color override (if not using default island theme) */
  color?: string;
}

/**
 * Loading Component
 * 
 * A customizable loading indicator inspired by animal-island-ui design.
 * Supports multiple animation types and size variants.
 * 
 * @example
 * <Loading type="spinner" size="medium" text="Loading..." />
 * <Loading type="dots" variant="fullpage" />
 * <Loading type="pulse" size="small" variant="inline" />
 */
export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'medium',
  variant = 'default',
  text,
  visible = true,
  className = '',
  color,
}) => {
  if (!visible) return null;

  const containerClass = [
    'loading-container',
    `loading-${size}`,
    variant === 'island' ? 'loading-island' : '',
    variant === 'inline' ? 'loading-inline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClass = [
    variant === 'fullpage' ? 'loading-fullpage' : '',
    variant === 'overlay' ? 'loading-overlay' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderLoadingIndicator = () => {
    const style = color ? { borderTopColor: color, backgroundColor: color } : {};

    switch (type) {
      case 'spinner':
        return <div className="loading-spinner" style={style} />;

      case 'dots':
        return (
          <div className="loading-dots">
            <div className="loading-dot" style={{ backgroundColor: color || '#19c8b9' }} />
            <div className="loading-dot" style={{ backgroundColor: color || '#794f27' }} />
            <div className="loading-dot" style={{ backgroundColor: color || '#9f927d' }} />
          </div>
        );

      case 'pulse':
        return <div className="loading-pulse" style={{ backgroundColor: color || 'rgba(25, 200, 185, 0.6)' }} />;

      default:
        return <div className="loading-spinner" />;
    }
  };

  const content = (
    <div className={containerClass}>
      {renderLoadingIndicator()}
      {text && <p className="loading-text">{text}</p>}
    </div>
  );

  if (variant === 'fullpage' || variant === 'overlay') {
    return <div className={wrapperClass}>{content}</div>;
  }

  return content;
};

export default Loading;
