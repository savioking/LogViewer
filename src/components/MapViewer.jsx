import React, { useState } from 'react';
import { TransformWrapper, TransformComponent, KeepScale } from 'react-zoom-pan-pinch';
import mapImage from '../data/map/deheon.jpg';

export default function MapViewer({ campaign }) {
  const [activePoint, setActivePoint] = useState(null);

  const points = campaign.mapPoints || [];

  return (
    <div className="map-viewer-container">
      <div className="map-header">
        <h2>Mapa de Campanha</h2>
        <p>Arraste para mover, use o scroll para aplicar zoom.</p>
      </div>

      <div className="map-wrapper">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="map-controls">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>Reset</button>
              </div>

              <TransformComponent wrapperClass="map-transform-wrapper" contentClass="map-transform-content">
                <div className="map-image-container">
                  <img src={mapImage} alt="Mapa da Campanha" className="map-image" />
                  
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
                          // onMouseEnter={() => setActivePoint(point.id)}
                          // onMouseLeave={() => setActivePoint(null)}
                          onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
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
          {activePoint && (
            <>
              <h4>{points.find((p) => p.id === activePoint)?.title}</h4>
              <p>{points.find((p) => p.id === activePoint)?.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
