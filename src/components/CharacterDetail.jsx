import React from 'react';
import CharacterAvatar from './CharacterAvatar';

export default function CharacterDetail({ charId, campaign, onBack }) {
  const char = campaign.characters.find(c => c.id === charId);

  if (!char) {
    return (
      <div className="fade-in">
        <button className="control-btn" onClick={onBack} style={{ marginBottom: '20px' }}>
          Voltar
        </button>
        <p>Personagem não encontrado.</p>
      </div>
    );
  }

  // RPG modifier calculator
  const getModifier = (value) => {
    const mod = Math.floor((value - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <div className="fade-in" style={{ paddingBottom: '40px' }}>
      {/* Back button */}
      <button
        className="control-btn"
        onClick={onBack}
        style={{ marginBottom: '24px', alignSelf: 'flex-start' }}
      >
        ⬅ Voltar ao Painel
      </button>

      <div className="char-detail-container">
        {/* Left Column: Portrait and Attributes */}
        <div className="char-detail-left">
          <div className="char-portrait-box">
            <div className="char-portrait-large">
              <CharacterAvatar id={char.id} size={180} />
            </div>
            <h2 className="char-detail-name">{char.name}</h2>
            <div className="char-detail-meta">
              {char.race} • {char.class}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Nível {char.level}
            </div>
            {char.deity && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-accent)', marginTop: '4px', fontWeight: 'bold' }}>
                Devoto {char.deity == 'Panteão' ? 'do ' : 'de '} {char.deity}
              </div>
            )}
          </div>

          <div className="attributes-box">
            <h3 className="attributes-title">Atributos</h3>
            <div className="attributes-grid">
              {Object.entries(char.attributes).map(([attr, val]) => (
                <div key={attr} className="attribute-item">
                  <span className="attr-name">{attr}</span>
                  <span className="attr-value">{val > 0 ? '+'+val : val}</span>
                  {/* <span className="attr-mod">{getModifier(val)}</span> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lore, Description, Skills */}
        <div className="char-detail-right">
          {/* Biography */}
          <div className="char-block">
            <h3 className="char-block-title">
              <span>📖</span> Biografia & Histórico
            </h3>
            <p className="char-desc-text">{char.description}</p>

            {/* Render mount details if present (e.g. Valkar's unicorn) */}
            {char.mount && (
              <div className="mount-block">
                <h4 className="mount-title">Companheiro: {char.mount.name} ({char.mount.species})</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {char.mount.description}
                </p>
              </div>
            )}
          </div>

          {/* Signature Skills */}
          <div className="char-block">
            <h3 className="char-block-title">
              <span>⚔️</span> Habilidades Características
            </h3>
            <div className="skills-list">
              {char.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-tag"
                  // Differentiate color depending on spell or martial skill in CSS
                  data-skill={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
