import React, { useState } from 'react';

export default function Sidebar({ activeTab, activeId, onSelectTab, campaign }) {
  const [collapsedArcs, setCollapsedArcs] = useState({});
  const [collapsedCharacters, setCollapsedCharacters] = useState(false);

  const toggleArc = (arcId) => {
    setCollapsedArcs(prev => ({
      ...prev,
      [arcId]: !prev[arcId]
    }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Fullgor dos Deuses</h1>
        <div className="sidebar-subtitle">Painel de Campanha</div>
      </div>

      {/* Campaign Home / Dashboard Button */}
      <div className="sidebar-section">
        <div
          className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelectTab('dashboard', null)}
        >
          {/* Home Icon SVG */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Visão Geral
        </div>
      </div>

      {/* Arcs and Sessions List */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          História e Sessões
        </div>
        <ul className="menu-list">
          {campaign.arcs.map(arc => (
            <li key={arc.id} style={{ marginBottom: '12px' }}>
              <div
                onClick={() => toggleArc(arc.id)}
                className="arc-header-toggle"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#8c734b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  padding: '6px 10px',
                  opacity: 0.8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  userSelect: 'none',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s, opacity 0.2s'
                }}
              >
                <span>{arc.title}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: 'transform 0.2s',
                    transform: collapsedArcs[arc.id] ? 'rotate(-90deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    marginLeft: '8px'
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <ul className={`sub-menu-list collapsible-menu ${collapsedArcs[arc.id] ? 'collapsed' : ''}`}>
                {arc.sessions.map(session => (
                  <li
                    key={session.id}
                    className={`sub-menu-item ${activeTab === 'session' && activeId === session.id ? 'active' : ''}`}
                    onClick={() => onSelectTab('session', session.id)}
                  >
                    📜 {session.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Characters List */}
      <div className="sidebar-section">
        <div
          className="sidebar-section-title clickable-section-title"
          onClick={() => setCollapsedCharacters(prev => !prev)}
          style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Protagonistas</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: 'transform 0.2s',
              transform: collapsedCharacters ? 'rotate(-90deg)' : 'rotate(0deg)',
              marginLeft: 'auto',
              flexShrink: 0
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <ul className={`menu-list collapsible-menu ${collapsedCharacters ? 'collapsed' : ''}`}>
          {campaign.characters.map(char => (
            <li
              key={char.id}
              className={`menu-item ${activeTab === 'character' && activeId === char.id ? 'active' : ''}`}
              onClick={() => onSelectTab('character', char.id)}
            >
              🛡️ {char.name.split(' ')[0]}
              <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: 'auto' }}>
                Nv {char.level} {char.class.split(' ')[0]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* System info at bottom */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', fontSize: '0.75rem', color: '#65748f', textAlign: 'center' }}>
        Sistema: <strong>{campaign.system}</strong>
      </div>
    </aside>
  );
}
