import React, { useState } from 'react';
import { TransformWrapper, TransformComponent, KeepScale } from 'react-zoom-pan-pinch';
import fallbackDeheon from '../data/map/deheon.jpg';

// Dynamic image resolver for maps in ../data/map/
const mapImages = import.meta.glob('../data/map/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  import: 'default',
});

function resolveMapImage(imageRef) {
  if (!imageRef) return null;
  if (typeof imageRef === 'string') {
    if (
      imageRef.startsWith('http://') ||
      imageRef.startsWith('https://') ||
      imageRef.startsWith('data:') ||
      imageRef.startsWith('blob:')
    ) {
      return imageRef;
    }
    for (const path in mapImages) {
      if (path.endsWith(`/${imageRef}`) || path.endsWith(imageRef)) {
        return mapImages[path];
      }
    }
  }
  return imageRef;
}

export default function MapViewer({ campaign }) {
  // Normalize maps list
  const maps =
    campaign?.maps && campaign.maps.length > 0
      ? campaign.maps
      : [
          {
            id: 'deheon',
            title: 'Reino de Deheon',
            description: 'Arraste para mover, use o scroll para aplicar zoom.',
            image: fallbackDeheon,
            points: campaign?.mapPoints || [],
          },
        ];

  const [activeMapId, setActiveMapId] = useState(maps[0]?.id || 'deheon');
  const [activePoint, setActivePoint] = useState(null);

  // Get current active map
  const currentMap = maps.find((m) => m.id === activeMapId) || maps[0];
  const points = currentMap?.points || [];
  const mapImageSrc =
    resolveMapImage(currentMap?.image) || (currentMap?.id === 'deheon' ? fallbackDeheon : null);

  const handleSelectMap = (mapId) => {
    if (mapId !== activeMapId) {
      setActiveMapId(mapId);
      setActivePoint(null);
    }
  };

  const activePointData = points.find((p) => p.id === activePoint);

  return (
    <div className="map-viewer-container">
      {/* Top Tab Bar for multiple maps */}
      {maps.length > 1 && (
        <div className="map-tabs-container" role="tablist" aria-label="Seleção de Mapas">
          {maps.map((mapItem) => {
            const isSelected = activeMapId === mapItem.id;
            return (
              <button
                key={mapItem.id}
                role="tab"
                aria-selected={isSelected}
                className={`map-tab-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelectMap(mapItem.id)}
              >
                {/* <svg
                  className="map-tab-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg> */}
                <span>{mapItem.title || mapItem.name || 'Mapa'}</span>
                {mapItem.points && mapItem.points.length > 0 && (
                  <span className="map-tab-count">{mapItem.points.length}</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Map Header with title and description */}
      <div className="map-header">
        <h2>{currentMap?.title || currentMap?.name || 'Mapa de Campanha'}</h2>
        {currentMap?.description && (
          <p className="map-header-description">{currentMap.description}</p>
        )}
        <p className="map-header-hint">Arraste para mover, use o scroll para aplicar zoom.</p>
      </div>

      <div className="map-wrapper">
        <TransformWrapper
          key={currentMap.id}
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="map-controls">
                <button onClick={() => zoomIn()} title="Aumentar Zoom">
                  +
                </button>
                <button onClick={() => zoomOut()} title="Diminuir Zoom">
                  -
                </button>
                <button onClick={() => resetTransform()} title="Redefinir Visão">
                  Reset
                </button>
              </div>

              <TransformComponent
                wrapperClass="map-transform-wrapper"
                contentClass="map-transform-content"
              >
                <div className="map-image-container">
                  {mapImageSrc ? (
                    <img
                      src={mapImageSrc}
                      alt={currentMap?.title || 'Mapa da Campanha'}
                      className="map-image"
                    />
                  ) : (
                    <div className="map-placeholder">
                      <div className="map-placeholder-icon">🗺️</div>
                      <h3>{currentMap?.title || 'Mapa'}</h3>
                      <p>Nenhuma imagem configurada para este mapa.</p>
                      <span className="map-placeholder-hint">
                        Adicione a imagem em <code>src/data/map/</code> e referencie no{' '}
                        <code>campaignData.js</code>.
                      </span>
                    </div>
                  )}

                  {points.map((point) => (
                    <div
                      key={point.id}
                      style={{
                        position: 'absolute',
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        zIndex: 5,
                      }}
                    >
                      <KeepScale>
                        <div
                          className={`map-marker ${activePoint === point.id ? 'active' : ''}`}
                          onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                          title={point.title}
                        >
                          <div className="marker-pin"></div>
                        </div>
                      </KeepScale>
                    </div>
                  ))}
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {/* Fixed Tooltip Info Panel */}
        <div className={`map-info-panel ${activePoint ? 'visible' : ''}`}>
          {activePointData && (
            <>
              <div className="map-info-header">
                <h4>{activePointData.title}</h4>
                <button
                  className="map-info-close-btn"
                  onClick={() => setActivePoint(null)}
                  aria-label="Fechar detalhes"
                >
                  ×
                </button>
              </div>
              <p className="map-info-desc">{activePointData.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
