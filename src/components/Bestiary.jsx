import React, { useState, useMemo } from 'react';
import { bestiarioData, bestiarioFactions } from '../data/bestiarioData';

// Carrega automaticamente todas as imagens da pasta assets/bestiario
const bestiaryImages = import.meta.glob('../assets/bestiario/*.{png,jpg,jpeg,svg,webp,gif}', {
  eager: true,
  import: 'default'
});

// Helper para obter a URL da imagem a partir do nome do arquivo
export function getThreatImageUrl(imageName) {
  if (!imageName) return null;
  for (const path in bestiaryImages) {
    if (path.endsWith(`/${imageName}`)) {
      return bestiaryImages[path];
    }
  }
  return null;
}

// Helper para obter a lista de facções de uma ameaça (suporta array ou string única)
export function getThreatFactions(threat) {
  if (!threat) return [];
  const raw = threat.faction ?? threat.factions;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string' && raw.trim()) return [raw.trim()];
  return [];
}

// Normalização para busca sem diferenciação de acentos ou maiúsculas/minúsculas
function normalizeText(text) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Componente de Página de Detalhes da Ameaça
 * Similar à página de protagonista (CharacterDetail)
 */
function ThreatDetail({ threat, onBack }) {
  const imageUrl = getThreatImageUrl(threat.image);
  const factions = getThreatFactions(threat);

  return (
    <div className="fade-in bestiary-detail-wrapper" style={{ paddingBottom: '40px' }}>
      {/* Botão de retorno */}
      <button
        className="control-btn"
        onClick={onBack}
        style={{ marginBottom: '24px', alignSelf: 'flex-start' }}
      >
        ⬅ Voltar ao Bestiário
      </button>

      <div className="char-detail-container">
        {/* Coluna Esquerda: Retrato/Imagem e Metadados Principais */}
        <div className="char-detail-left">
          <div className="char-portrait-box bestiary-portrait-box">
            <div className="bestiary-portrait-frame">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={threat.name}
                  className="bestiary-portrait-img"
                />
              ) : (
                <div className="bestiary-empty-square large" aria-label="Ameaça sem imagem" />
              )}
            </div>

            <h2 className="char-detail-name">{threat.name}</h2>
            
            <div className="bestiary-badges-row" style={{ justifyContent: 'center' }}>
              {factions.map(faction => (
                <span key={faction} className="bestiary-faction-badge" data-faction={faction}>
                  {faction}
                </span>
              ))}
            </div>

            <div className="char-detail-meta" style={{ marginTop: '10px' }}>
              {threat.type} • ND {threat.level == 0.5 ? '1/2' : threat.level == 0.25 ? '1/4' : threat.level}
            </div>
          </div>

          {/* Ficha Resumida */}
          {/* <div className="attributes-box">
            <h3 className="attributes-title">Dados da Ameaça</h3>
            <div className="attributes-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="attribute-item">
                <span className="attr-name">NÍVEL / ND</span>
                <span className="attr-value">{threat.level}</span>
              </div>
              <div className="attribute-item">
                <span className="attr-name">TIPO</span>
                <span className="attr-value" style={{ fontSize: '0.95rem', marginTop: '6px' }}>{threat.type}</span>
              </div>
              <div className="attribute-item">
                <span className="attr-name">HABILIDADES</span>
                <span className="attr-value">{threat.skills ? threat.skills.length : 0}</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Coluna Direita: Descrição, Habilidades e Lore */}
        <div className="char-detail-right">
          {/* Descrição */}
          <div className="char-block">
            <h3 className="char-block-title">
              Descrição
            </h3>
            <p className="char-desc-text">{threat.description}</p>
          </div>

          {/* Habilidades (Lista de passagens similar a História Pessoal) */}
          {threat.skills && threat.skills.length > 0 && (
            <div className="char-block">
              <h3 className="char-block-title">
                Habilidades
              </h3>
              <div className="bestiary-passages-list">
                {threat.skills.map((skill, idx) => (
                  <div key={idx} className="mount-block bestiary-passage-item">
                    <h4 className="mount-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="bestiary-bullet-combat">◆</span>
                      {skill.title || (typeof skill === 'string' ? skill : `Habilidade ${idx + 1}`)}
                    </h4>
                    {skill.text && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>
                        {skill.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lore (Lista de passagens similar a História Pessoal) */}
          {threat.lore && threat.lore.length > 0 && (
            <div className="char-block">
              <h3 className="char-block-title">
                História
              </h3>
              <div className="bestiary-passages-list">
                {threat.lore.map((entry, idx) => (
                  <div key={idx} className="mount-block bestiary-passage-item">
                    <h4 className="mount-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="bestiary-bullet-lore">✦</span>
                      {entry.title || `Registro ${idx + 1}`}
                    </h4>
                    {entry.text && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>
                        {entry.text}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Componente Principal do Bestiário
 */
export default function Bestiary({ selectedThreatId, onSelectThreat, onBack }) {
  const [searchName, setSearchName] = useState('');
  const [selectedFaction, setSelectedFaction] = useState('ALL');

  // Seleciona ameaça ativa se houver
  const activeThreat = useMemo(() => {
    if (!selectedThreatId) return null;
    return bestiarioData.find(item => item.id === selectedThreatId) || null;
  }, [selectedThreatId]);

  // Filtra as ameaças com base no nome e na facção
  const filteredThreats = useMemo(() => {
    const normSearch = normalizeText(searchName);

    return bestiarioData.filter(threat => {
      // Filtro por nome
      if (normSearch) {
        const normName = normalizeText(threat.name);
        if (!normName.includes(normSearch)) {
          return false;
        }
      }

      // Filtro por facção
      if (selectedFaction !== 'ALL') {
        const factions = getThreatFactions(threat);
        if (!factions.includes(selectedFaction)) {
          return false;
        }
      }

      return true;
    });
  }, [searchName, selectedFaction]);

  // Se uma ameaça estiver selecionada, renderiza a página de detalhes
  if (activeThreat) {
    return <ThreatDetail threat={activeThreat} onBack={onBack} />;
  }

  // Caso contrário, renderiza a visualização em grade com filtros
  return (
    <div className="bestiary-container fade-in">
      {/* Cabeçalho */}
      <div className="bestiary-header">
        <div className="bestiary-title-group">
          <h2 className="bestiary-title">Bestiário</h2>
          <p className="bestiary-subtitle">
            Catálogo de criaturas, monstros e adversários enfrentados durante a campanha.
          </p>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bestiary-filter-bar">
        {/* Filtro por Nome */}
        <div className="bestiary-search-box">
          <svg
            className="bestiary-search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="bestiary-search-input"
            placeholder="Buscar ameaça por nome..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          {searchName && (
            <button
              className="bestiary-clear-btn"
              onClick={() => setSearchName('')}
              title="Limpar busca"
            >
              ×
            </button>
          )}
        </div>

        {/* Filtro por Facção */}
        <div className="bestiary-faction-filter-group">
          <label htmlFor="faction-select" className="bestiary-filter-label">Facção:</label>
          <select
            id="faction-select"
            className="bestiary-faction-select"
            value={selectedFaction}
            onChange={(e) => setSelectedFaction(e.target.value)}
          >
            <option value="ALL">Todas as Facções ({bestiarioData.length})</option>
            {bestiarioFactions.map(faction => {
              const count = bestiarioData.filter(t => getThreatFactions(t).includes(faction)).length;
              return (
                <option key={faction} value={faction}>
                  {faction} ({count})
                </option>
              );
            })}
          </select>
        </div>

        {/* Contador e Reset */}
        <div className="bestiary-results-count">
          <span>{filteredThreats.length} {filteredThreats.length === 1 ? 'ameaça' : 'ameaças'}</span>
          {(searchName || selectedFaction !== 'ALL') && (
            <button
              className="bestiary-reset-btn"
              onClick={() => {
                setSearchName('');
                setSelectedFaction('ALL');
              }}
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid de Ameaças */}
      {filteredThreats.length === 0 ? (
        <div className="bestiary-empty-state">
          <div className="bestiary-empty-state-icon">🛡️</div>
          <h3>Nenhuma ameaça encontrada</h3>
          <p>Tente ajustar o termo de busca ou selecionar outra facção.</p>
          <button
            className="control-btn"
            onClick={() => {
              setSearchName('');
              setSelectedFaction('ALL');
            }}
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="bestiary-grid">
          {filteredThreats.map(threat => {
            const imageUrl = getThreatImageUrl(threat.image);
            const factions = getThreatFactions(threat);

            return (
              <div
                key={threat.id}
                className="bestiary-card"
                onClick={() => onSelectThreat(threat.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectThreat(threat.id);
                  }
                }}
              >
                {/* Imagem ou Quadrado Vazio por padrão */}
                <div className="bestiary-card-image-wrapper">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={threat.name}
                      className="bestiary-card-img"
                    />
                  ) : (
                    <div className="bestiary-empty-square" aria-label="Sem imagem" />
                  )}
                </div>

                {/* Conteúdo do Card: Nome e Badges com as Facções */}
                <div className="bestiary-card-content">
                  <div className="bestiary-card-header">
                    <div className="bestiary-badges-row">
                      {factions.map(faction => (
                        <span key={faction} className="bestiary-faction-badge" data-faction={faction}>
                          {faction}
                        </span>
                      ))}
                    </div>
                    <span className="bestiary-level-tag">ND {threat.level == 0.5 ? '1/2' : threat.level == 0.25 ? '1/4' : threat.level}</span>
                  </div>

                  <h3 className="bestiary-card-title">{threat.name}</h3>

                  <div className="bestiary-card-meta">
                    {threat.type}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
