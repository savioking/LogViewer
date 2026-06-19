import React from 'react';
import CharacterAvatar from './CharacterAvatar';

export default function Dashboard({ campaign, onSelectTab }) {
  // Compute some stats
  const totalCharacters = campaign.characters.length;
  const totalArcs = campaign.arcs.length;
  const totalSessions = campaign.arcs.reduce((acc, arc) => acc + arc.sessions.length, 0);

  return (
    <div className="dashboard-container fade-in">
      {/* Campaign Welcome Banner */}
      <div className="welcome-card">
        <span className="system-badge">{campaign.system}</span>
        <h2 className="campaign-title">{campaign.title}</h2>
        <p className="campaign-description">{campaign.description}</p>
      </div>

      {/* Campaign Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🛡️</span>
          <div className="stat-info">
            <span className="stat-value">{totalCharacters}</span>
            <span className="stat-label">Personagens</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🗺️</span>
          <div className="stat-info">
            <span className="stat-value">{totalArcs}</span>
            <span className="stat-label">Arcos Narrativos</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📜</span>
          <div className="stat-info">
            <span className="stat-value">{totalSessions}</span>
            <span className="stat-label">Sessões Gravadas</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div className="stat-info">
            <span className="stat-value">2</span>
            <span className="stat-label">Nível do Grupo</span>
          </div>
        </div>
      </div>

      {/* Characters List Section */}
      <section style={{ marginTop: '20px' }}>
        <h3 
          style={{
            fontFamily: 'var(--font-title)', 
            color: 'var(--text-accent)', 
            borderBottom: '2px solid var(--border-primary)',
            paddingBottom: '8px',
            marginBottom: '16px'
          }}
        >
          Protagonistas
        </h3>
        <div className="characters-grid">
          {campaign.characters.map(char => (
            <div 
              key={char.id} 
              className="character-card"
              onClick={() => onSelectTab('character', char.id)}
            >
              <div className="character-card-header">
                <div className="character-avatar-placeholder">
                  <CharacterAvatar id={char.id} size={90} />
                </div>
              </div>
              <div className="character-card-body">
                <h4 className="char-card-name">{char.name}</h4>
                <div className="char-card-meta">
                  {char.race} • {char.class} (Nv {char.level})
                </div>
                <p className="char-card-desc">{char.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Arcs and Sessions Quick Links */}
      <section style={{ marginTop: '32px', marginBottom: '20px' }}>
        <h3 
          style={{
            fontFamily: 'var(--font-title)', 
            color: 'var(--text-accent)', 
            borderBottom: '2px solid var(--border-primary)',
            paddingBottom: '8px',
            marginBottom: '16px'
          }}
        >
          Linha do Tempo de Crônicas
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {campaign.arcs.map(arc => (
            <div 
              key={arc.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-secondary)',
                borderRadius: '10px',
                padding: '24px'
              }}
            >
              <h4 
                style={{
                  fontFamily: 'var(--font-title)',
                  color: 'var(--text-accent)',
                  fontSize: '1.15rem',
                  marginBottom: '6px'
                }}
              >
                {arc.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                {arc.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {arc.sessions.map(session => (
                  <div 
                    key={session.id}
                    style={{
                      background: 'var(--bg-app)',
                      border: '1px solid var(--border-secondary)',
                      borderRadius: '8px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onClick={() => onSelectTab('session', session.id)}
                    className="session-quick-card"
                  >
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>
                        📜 {session.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Jogada em {session.date}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.2rem', color: 'var(--text-accent)' }}>➔</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
