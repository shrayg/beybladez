import React, { useState, useEffect, useRef } from 'react';

interface BeybladeGameProps {
  width?: string | number;
  height?: string | number;
  allowFullscreen?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * BeybladeGame Component
 * 
 * This component embeds the Beyblade game from itch.io directly into a React/Vite application.
 * It handles responsive sizing, loading states, and provides fallback content if embedding fails.
 * 
 * @param {BeybladeGameProps} props - Component properties
 * @returns {JSX.Element} - The rendered component
 */
const BeybladeGame: React.FC<BeybladeGameProps> = ({
  width = '100%',
  height = '1000px',
  allowFullscreen = true,
  className = '',
  style = {},
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // The direct URL to the game
  const gameUrl = 'https://html-classic.itch.zone/html/6995951/index.html';
  
  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // Handle iframe error events
  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  // Effect to check if iframe loaded correctly
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        // If still loading after timeout, assume there might be an issue
        // but don't set error yet as it might still be loading
        console.warn('Game iframe is taking longer than expected to load');
      }
    }, 10000);
    
    return () => clearTimeout(timeoutId);
  }, [isLoading]);
  
  // Attempt to make the iframe responsive to window resize
  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        // You could add additional responsive logic here if needed
        console.log('Window resized, iframe dimensions may need adjustment');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Container styles for responsive design
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ...style,
  };
  
  // Loading indicator styles
  const loadingStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    zIndex: 1,
  };
  
  // Error message styles
  const errorStyle: React.CSSProperties = {
    ...loadingStyle,
    flexDirection: 'column',
    textAlign: 'center',
    padding: '20px',
  };
  
  // Iframe styles
  const iframeStyle: React.CSSProperties = {
    border: 'none',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  };
  
  return (
    <div 
      className={`beyblade-game-container ${className}`}
      style={containerStyle}
      data-testid="beyblade-game-container"
    >
      {isLoading && (
        <div style={loadingStyle}>
          <div>
            <div style={{ marginBottom: '20px', fontSize: '24px' }}>Loading Beyblade Game...</div>
            <div className="loading-spinner" style={{
              width: '40px',
              height: '40px',
              margin: '0 auto',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              borderTop: '4px solid #ffffff',
              animation: 'spin 1s linear infinite',
            }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      )}
      
      {hasError && (
        <div style={errorStyle}>
          <h2 style={{ color: '#ff5555', marginBottom: '15px' }}>Unable to Load Game</h2>
          <p>
            The Beyblade game could not be loaded. This might be due to content security policies 
            or cross-origin restrictions.
          </p>
          <p style={{ marginTop: '15px' }}>
            You can try playing the game directly on{' '}
            <a 
              href="https://vdaimo.itch.io/beyblade" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#55aaff' }}
            >
              itch.io
            </a>
          </p>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={gameUrl}
        style={iframeStyle}
        allowFullScreen={allowFullscreen}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        title="Beyblade Game"
        sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups"
        loading="lazy"
      />
    </div>
  );
};

export default BeybladeGame;
