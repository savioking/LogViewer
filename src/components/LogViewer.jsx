import React, { useState, useMemo, useRef } from 'react';
import { parseLogFile } from '../utils/logParser';
import CharacterAvatar from './CharacterAvatar';

export default function LogViewer({ session, theme, onThemeChange }) {
  const [searchText, setSearchText] = useState('');
  const [activeActors, setActiveActors] = useState([]);
  const [showTurns, setShowTurns] = useState(true);
  const [hideActions, setHideActions] = useState(false);

  const scrollContainerRef = useRef(null);

  // Parse the log file contents using useMemo
  const parsedEntries = useMemo(() => {
    return parseLogFile(session.logText);
  }, [session.logText]);

  // List of all characters/actors we can filter by (extracted from log senders + npc lines)
  const availableActors = useMemo(() => {
    const actors = new Set(['Narrador']);
    parsedEntries.forEach(entry => {
      if (entry.sender && entry.sender.toLowerCase() !== 'narrador') {
        actors.add(entry.sender);
      }
      entry.lines?.forEach(line => {
        if (line.speaker) {
          actors.add(line.speaker);
        }
      });
    });
    return Array.from(actors);
  }, [parsedEntries]);

  // Filter entries based on filters state
  const filteredEntries = useMemo(() => {
    return parsedEntries.filter(entry => {
      // 1. Text Search Filter
      if (searchText) {
        const query = searchText.toLowerCase();
        const senderMatches = entry.sender?.toLowerCase().includes(query);
        const labelMatches = entry.label?.toLowerCase().includes(query);
        const lineMatches = entry.lines?.some(line =>
          line.speaker?.toLowerCase().includes(query) ||
          line.segments.some(seg => seg.text.toLowerCase().includes(query))
        );

        if (!senderMatches && !labelMatches && !lineMatches) {
          return false;
        }
      }

      // 2. Multi-select Character Filter
      if (activeActors.length > 0) {
        if (entry.type === 'turn') {
          return showTurns; // If it's a turn, we check the turn toggle, not actor list
        }

        const senderName = entry.sender || '';
        let hasMatchedActor = activeActors.some(actor => 
          senderName.toLowerCase().includes(actor.toLowerCase())
        );

        // Also check if any line speaker inside matches the active actor list
        if (!hasMatchedActor && entry.lines) {
          hasMatchedActor = entry.lines.some(line => 
            line.speaker && activeActors.some(actor => 
              line.speaker.toLowerCase().includes(actor.toLowerCase())
            )
          );
        }

        if (!hasMatchedActor) {
          return false;
        }
      }

      // 3. Combat Turn Switch Filter
      if (entry.type === 'turn') {
        return showTurns;
      }

      return true;
    });
  }, [parsedEntries, searchText, activeActors, showTurns]);

  // Toggle actor in multi-select filter list
  const handleToggleActor = (actor) => {
    setActiveActors(prev => {
      if (prev.includes(actor)) {
        return prev.filter(a => a !== actor);
      } else {
        return [...prev, actor];
      }
    });
  };

  // Scroll to Top/Bottom helpers
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Render parsed text segments (Speech, Action, Ability, Thought)
  const renderSegment = (seg, idx) => {
    switch (seg.type) {
      case 'dialogue':
        return (
          <span key={idx} className="segment-dialogue">
            — {seg.text}
          </span>
        );
      case 'action':
        if (hideActions) return null;
        return (
          <span key={idx} className="segment-action">
            ● {seg.text} ●
          </span>
        );
      case 'thought':
        return (
          <span key={idx} className="segment-thought">
            “ {seg.text} ”
          </span>
        );
      case 'ability':
        return (
          <span key={idx} className="segment-ability" data-skill={seg.text}>
            【 {seg.text} 】
          </span>
        );
      default:
        return <span key={idx}>{seg.text}</span>;
    }
  };

  return (
    <div className="log-viewer-container fade-in">
      {/* Control Panel */}
      <div className="log-controls">
        {/* Row 1: Search & Theme Toggles */}
        <div className="controls-row-1">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              className="search-input"
              placeholder="Buscar termos, diálogos ou ações..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="theme-toggle-group">
            <button 
              className={`control-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => onThemeChange('dark')}
              title="Tema Escuro Fantasia"
            >
              🌙 Dark Fantasy
            </button>
            <button 
              className={`control-btn ${theme === 'parchment' ? 'active' : ''}`}
              onClick={() => onThemeChange('parchment')}
              title="Tema Pergaminho Claro"
            >
              📜 Parchment
            </button>
          </div>
        </div>

        {/* Row 2: Filtering Toggles & Swappable states */}
        <div className="filters-section">
          {/* Senders Filter List */}
          <div className="filter-group">
            <span className="filter-label">Narrado por:</span>
            {availableActors.map(actor => (
              <span 
                key={actor}
                className={`char-chip ${activeActors.includes(actor) ? 'active' : ''}`}
                onClick={() => handleToggleActor(actor)}
              >
                {actor}
              </span>
            ))}
            {activeActors.length > 0 && (
              <button 
                style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                onClick={() => setActiveActors([])}
              >
                Limpar filtros
              </button>
            )}
          </div>

          {/* Visibility Switches */}
          <div className="filter-group">
            <span className="filter-label">Visualização:</span>
            <button 
              className={`control-btn ${showTurns ? 'active' : ''}`}
              onClick={() => setShowTurns(prev => !prev)}
            >
              {showTurns ? '✓ Exibir Banners de Turno' : '✗ Ocultar Banners de Turno'}
            </button>
            <button 
              className={`control-btn ${hideActions ? 'active' : ''}`}
              onClick={() => setHideActions(prev => !prev)}
            >
              {hideActions ? '✗ Ocultando Ações (Itálico)' : '✓ Exibindo Ações (Itálico)'}
            </button>
          </div>
        </div>
      </div>

      {/* Log Feed stream */}
      <div className="log-stream" ref={scrollContainerRef}>
        {filteredEntries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Nenhuma mensagem atende aos filtros atuais.
          </div>
        ) : (
          filteredEntries.map(entry => {
            if (entry.type === 'turn') {
              return (
                <div key={entry.id} className="log-entry-turn">
                  <div className="turn-banner">
                    ⚔️ {entry.label.toUpperCase()} ⚔️
                  </div>
                </div>
              );
            }

            if (entry.type === 'narrator') {
              return (
                <div key={entry.id} className="log-entry log-entry-narrator">
                  <div className="entry-lines">
                    {entry.lines.map((line, lIdx) => {
                      if (line.speaker) {
                        return (
                          <div key={lIdx} className="npc-speech-block">
                            <div className="npc-speech-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <CharacterAvatar id={line.speaker} size={20} />
                              <strong>{line.speaker}</strong>
                            </div>
                            <div className="entry-line" style={{ marginTop: '6px' }}>
                              {line.segments.map((seg, sIdx) => renderSegment(seg, sIdx))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={lIdx} className="entry-line">
                          {line.segments.map((seg, sIdx) => renderSegment(seg, sIdx))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Character message block
            return (
              <div 
                key={entry.id} 
                className={`log-entry log-entry-character ${
                  entry.sender.toLowerCase() === 'kaelen' ? 'log-entry-self' : ''
                }`}
              >
                <div className="entry-avatar-col">
                  <div className="entry-avatar">
                    <CharacterAvatar id={entry.sender} size={42} />
                  </div>
                </div>
                <div className="entry-bubble-col">
                  <div className="entry-header">
                    <span className="entry-sender-name">{entry.sender}</span>
                    <span className="entry-time">{entry.time}</span>
                    {entry.extraInfo && (
                      <span className="entry-extra">({entry.extraInfo})</span>
                    )}
                  </div>
                  <div className="entry-bubble">
                    <div className="entry-lines">
                      {entry.lines.map((line, lIdx) => (
                        <div key={lIdx} className="entry-line">
                          {line.segments.map((seg, sIdx) => renderSegment(seg, sIdx))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Scroll Buttons */}
        <div className="scroll-btns">
          <button className="scroll-btn" onClick={scrollToTop} title="Rolar para o topo">
            ▲
          </button>
          <button className="scroll-btn" onClick={scrollToBottom} title="Rolar para o fim">
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}
