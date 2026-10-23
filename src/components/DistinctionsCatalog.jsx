import React, { useState, useMemo } from 'react';
import { distincoes } from '../data/toolData';

// Format source names into friendly readable labels
const SOURCE_LABELS = {
  herois: 'Heróis de Arton',
  deuses: 'Deuses de Arton',
  'heróicas': 'Jornada Heróica',
  'revista-tormenta': 'Revista Tormenta',
  dragao: 'Dragão Brasil'
};

// Source badge CSS modifier classes
const SOURCE_CLASSES = {
  herois: 'badge-source-herois',
  deuses: 'badge-source-deuses',
  'heróicas': 'badge-source-heroicas',
  'revista-tormenta': 'badge-source-revista',
  dragao: 'badge-source-dragao'
};

// Normalize text for accent-insensitive and case-insensitive search
function normalizeText(text) {
  if (!text) return '';
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Accent-insensitive search highlighting
function HighlightText({ text, query }) {
  if (!text) return null;
  if (!query || !query.trim()) return <>{text}</>;

  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);

  if (!normalizedQuery || !normalizedText.includes(normalizedQuery)) {
    return <>{text}</>;
  }

  // Find all match occurrences in the normalized string
  const segments = [];
  let currentIndex = 0;

  // Mapping characters from original string to normalized string
  // Note: in Portuguese NFD decomposition can change string length slightly if not recombined,
  // so we build an index map between original chars and normalized characters.
  const normChars = [];
  const charMap = []; // normIndex -> origIndex
  for (let i = 0; i < text.length; i++) {
    const norm = text[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    for (let j = 0; j < norm.length; j++) {
      charMap.push(i);
      normChars.push(norm[j]);
    }
  }
  const normStr = normChars.join('');

  let searchPos = 0;
  while (searchPos < normStr.length) {
    const matchIdx = normStr.indexOf(normalizedQuery, searchPos);
    if (matchIdx === -1) break;

    const startOrig = charMap[matchIdx];
    // Find the end index in original string
    const matchEndNorm = matchIdx + normalizedQuery.length;
    const endOrig = matchEndNorm < charMap.length ? charMap[matchEndNorm] : text.length;

    // Push preceding non-matched text
    if (startOrig > currentIndex) {
      segments.push(text.slice(currentIndex, startOrig));
    }

    // Push highlighted match
    segments.push(
      <mark key={`h-${startOrig}-${matchIdx}`} className="dist-highlight">
        {text.slice(startOrig, endOrig)}
      </mark>
    );

    currentIndex = endOrig;
    searchPos = matchEndNorm;
  }

  if (currentIndex < text.length) {
    segments.push(text.slice(currentIndex));
  }

  return <>{segments}</>;
}

export default function DistinctionsCatalog({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedExclusiva, setSelectedExclusiva] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [expandedIds, setExpandedIds] = useState(new Set());

  // Count items per source for badge filters
  const sourceCounts = useMemo(() => {
    const counts = { all: distincoes.length };
    distincoes.forEach(d => {
      counts[d.source] = (counts[d.source] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter and search distinctions
  const filteredDistinctions = useMemo(() => {
    const qNorm = normalizeText(searchQuery);

    return distincoes.filter(d => {
      // Source filter
      if (selectedSource !== 'all' && d.source !== selectedSource) {
        return false;
      }

      // Exclusivity filter
      if (selectedExclusiva === 'exclusiva' && !d.exclusiva) {
        return false;
      }
      if (selectedExclusiva === 'geral' && d.exclusiva) {
        return false;
      }

      // Query filter
      if (!qNorm) return true;

      // 1. Name & Source
      if (normalizeText(d.name).includes(qNorm)) return true;
      if (normalizeText(d.source).includes(qNorm)) return true;
      if (normalizeText(SOURCE_LABELS[d.source] || '').includes(qNorm)) return true;

      // 2. Admissão
      if (normalizeText(d.admissao).includes(qNorm)) return true;

      // 3. Marca (name & desc)
      if (d.marca) {
        if (normalizeText(d.marca.name).includes(qNorm)) return true;
        if (normalizeText(d.marca.desc).includes(qNorm)) return true;
      }

      // 4. Detalhes & Arsenal
      if (d.detalhes) {
        if (normalizeText(d.detalhes.titulo).includes(qNorm)) return true;
        if (normalizeText(d.detalhes.conteudo).includes(qNorm)) return true;
        if (Array.isArray(d.detalhes.arsenal)) {
          const matchArsenal = d.detalhes.arsenal.some(item =>
            normalizeText(item.n).includes(qNorm) || normalizeText(item.d).includes(qNorm)
          );
          if (matchArsenal) return true;
        }
      }

      // 5. Poderes (name, req, desc)
      if (Array.isArray(d.poderes)) {
        const matchPower = d.poderes.some(p =>
          normalizeText(p.name).includes(qNorm) ||
          normalizeText(p.req).includes(qNorm) ||
          normalizeText(p.desc).includes(qNorm)
        );
        if (matchPower) return true;
      }

      return false;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name, 'pt-BR');
      }
      if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name, 'pt-BR');
      }
      if (sortBy === 'powers-count') {
        return (b.poderes?.length || 0) - (a.poderes?.length || 0);
      }
      return 0;
    });
  }, [searchQuery, selectedSource, selectedExclusiva, sortBy]);

  // Check where a search matched in a distinction to show contextual match badges
  const getMatchReasons = (d) => {
    const qNorm = normalizeText(searchQuery);
    if (!qNorm) return [];

    const reasons = [];
    if (normalizeText(d.name).includes(qNorm)) reasons.push('Nome');
    if (normalizeText(d.admissao).includes(qNorm)) reasons.push('Admissão');
    if (d.marca && (normalizeText(d.marca.name).includes(qNorm) || normalizeText(d.marca.desc).includes(qNorm))) {
      reasons.push('Marca');
    }
    if (d.detalhes) {
      const matchArsenal = d.detalhes.arsenal?.some(i => normalizeText(i.n).includes(qNorm) || normalizeText(i.d).includes(qNorm));
      if (normalizeText(d.detalhes.conteudo).includes(qNorm) || matchArsenal) {
        reasons.push('Arsenal / Regras');
      }
    }
    if (d.poderes?.some(p => normalizeText(p.name).includes(qNorm) || normalizeText(p.req).includes(qNorm) || normalizeText(p.desc).includes(qNorm))) {
      reasons.push('Poderes');
    }
    return reasons;
  };

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredDistinctions.map(d => d.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSource('all');
    setSelectedExclusiva('all');
  };

  return (
    <div className="distinctions-container fade-in">
      {/* Header Bar */}
      <div className="distinctions-top-bar">
        <button className="distinctions-back-btn" onClick={onBack}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Voltar para Ferramentas
        </button>

        <div className="distinctions-header-text">
          <h2 className="distinctions-page-title">Catálogo de Distinções</h2>
          <p className="distinctions-page-subtitle">
            Consulte os pré-requisitos de admissão, marcas de distinção e árvores de poderes de Arton
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="distinctions-toolbar">
        {/* Search Input Box */}
        <div className="distinctions-search-wrapper">
          <svg className="distinctions-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="distinctions-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, admissão, marca, poderes, requisitos ou fonte..."
          />
          {searchQuery && (
            <button
              className="distinctions-search-clear"
              onClick={() => setSearchQuery('')}
              title="Limpar busca"
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Chips & Actions Row */}
        <div className="distinctions-filters-row">
          {/* Source filters */}
          <div className="distinctions-filter-group">
            <span className="distinctions-filter-label">Fonte:</span>
            <button
              className={`dist-filter-chip ${selectedSource === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedSource('all')}
            >
              Todas ({sourceCounts.all})
            </button>
            <button
              className={`dist-filter-chip ${selectedSource === 'herois' ? 'active' : ''}`}
              onClick={() => setSelectedSource('herois')}
            >
              Heróis de Arton ({sourceCounts.herois || 0})
            </button>
            <button
              className={`dist-filter-chip ${selectedSource === 'deuses' ? 'active' : ''}`}
              onClick={() => setSelectedSource('deuses')}
            >
              Deuses de Arton ({sourceCounts.deuses || 0})
            </button>
            <button
              className={`dist-filter-chip ${selectedSource === 'heróicas' ? 'active' : ''}`}
              onClick={() => setSelectedSource('heróicas')}
            >
              Jornada Heróica ({sourceCounts['heróicas'] || 0})
            </button>
            <button
              className={`dist-filter-chip ${selectedSource === 'revista-tormenta' ? 'active' : ''}`}
              onClick={() => setSelectedSource('revista-tormenta')}
            >
              Revista Tormenta ({sourceCounts['revista-tormenta'] || 0})
            </button>
            <button
              className={`dist-filter-chip ${selectedSource === 'dragao' ? 'active' : ''}`}
              onClick={() => setSelectedSource('dragao')}
            >
              Dragão Brasil ({sourceCounts['dragao'] || 0})
            </button>
          </div>

          {/* Exclusivity toggle */}
          <div className="distinctions-filter-group">
            <span className="distinctions-filter-label">Exclusividade:</span>
            <button
              className={`dist-filter-chip ${selectedExclusiva === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedExclusiva('all')}
            >
              Todas
            </button>
            <button
              className={`dist-filter-chip ${selectedExclusiva === 'exclusiva' ? 'active' : ''}`}
              onClick={() => setSelectedExclusiva('exclusiva')}
            >
              Exclusivas
            </button>
            <button
              className={`dist-filter-chip ${selectedExclusiva === 'geral' ? 'active' : ''}`}
              onClick={() => setSelectedExclusiva('geral')}
            >
              Gerais
            </button>
          </div>

          {/* Sorting & Expand/Collapse */}
          <div className="distinctions-actions-group">
            <select
              className="distinctions-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Ordenar por"
            >
              <option value="name-asc">Nome (A - Z)</option>
              <option value="name-desc">Nome (Z - A)</option>
              <option value="powers-count">Mais Poderes</option>
            </select>

            <button className="dist-action-btn" onClick={expandAll} title="Expandir todas as distinções">
              Expandir Todos
            </button>
            <button className="dist-action-btn" onClick={collapseAll} title="Recolher todas as distinções">
              Recolher Todos
            </button>
          </div>
        </div>

        {/* Results Counter & Filter Reset Bar */}
        <div className="distinctions-status-bar">
          <span className="distinctions-count-text">
            Mostrando <strong>{filteredDistinctions.length}</strong> de {distincoes.length} distinções
          </span>
          {(searchQuery || selectedSource !== 'all' || selectedExclusiva !== 'all') && (
            <button className="dist-clear-filters-btn" onClick={clearFilters}>
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Distinctions List */}
      {filteredDistinctions.length === 0 ? (
        <div className="distinctions-empty-state">
          <div className="distinctions-empty-icon">📜</div>
          <h3>Nenhuma distinção encontrada</h3>
          <p>Tente ajustar os termos da busca ou redefinir os filtros aplicados.</p>
          <button className="dist-action-btn primary" onClick={clearFilters}>
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="distinctions-cards-list">
          {filteredDistinctions.map((d) => {
            const isExpanded = expandedIds.has(d.id);
            const matchReasons = getMatchReasons(d);

            return (
              <div
                key={d.id}
                className={`distinction-card ${isExpanded ? 'expanded' : 'collapsed'}`}
              >
                {/* Clickable Header for Expand/Collapse */}
                <div
                  className="distinction-card-header"
                  onClick={() => toggleExpand(d.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(d.id);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <div className="distinction-header-main">
                    <div className="distinction-header-left">
                      <h3 className="distinction-name">
                        <HighlightText text={d.name} query={searchQuery} />
                      </h3>

                      <div className="distinction-badges">
                        {/* Source Badge */}
                        <span className={`dist-badge ${SOURCE_CLASSES[d.source] || 'badge-source-herois'}`}>
                          {SOURCE_LABELS[d.source] || d.source}
                        </span>

                        {/* Exclusivity Badge */}
                        {d.exclusiva && (
                          <span className="dist-badge badge-exclusiva" title="Distinção Exclusiva">
                            Exclusiva
                          </span>
                        )}

                        {/* Powers count */}
                        <span className="dist-badge badge-powers-count">
                          {d.poderes?.length || 0} Poderes
                        </span>

                        {/* Arsenal / Special rules badge if present */}
                        {/* {d.detalhes && (
                          <span className="dist-badge badge-special-rules" title={d.detalhes.titulo}>
                            {d.detalhes.arsenal?.length ? `📦 ${d.detalhes.arsenal.length} Itens de Arsenal` : '📜 Regras Especiais'}
                          </span>
                        )} */}
                      </div>
                    </div>

                    <div className="distinction-header-right">
                      {/* Search match contextual indicators */}
                      {matchReasons.length > 0 && (
                        <div className="dist-match-tags" title="Termo encontrado nestas seções">
                          {matchReasons.map(reason => (
                            <span key={reason} className="dist-match-tag">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className={`dist-chevron-icon ${isExpanded ? 'rotated' : ''}`}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Collapsed state preview snippet */}
                  {!isExpanded && (
                    <div className="distinction-collapsed-preview">
                      <span className="preview-label">Marca:</span>{' '}
                      <span className="preview-text">
                        <HighlightText text={d.marca?.name} query={searchQuery} /> — <HighlightText text={d.marca?.desc} query={searchQuery} />
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded Detailed Content */}
                {isExpanded && (
                  <div className="distinction-card-body">
                    {/* Section 1: Admissão */}
                    <div className="dist-section dist-admissao-section">
                      <div className="dist-section-title">
                        {/* <span className="dist-section-icon">📜</span> */}
                        <h4>Admissão</h4>
                      </div>
                      <div className="dist-admissao-box">
                        <p className="dist-admissao-text">
                          <HighlightText text={d.admissao} query={searchQuery} />
                        </p>
                      </div>
                    </div>

                    {/* Section 2: Marca da Distinção */}
                    {d.marca && (
                      <div className="dist-section dist-marca-section">
                        <div className="dist-section-title">
                          <span className="dist-section-icon">⚜️</span>
                          <h4>Marca</h4>
                        </div>
                        <div className="dist-marca-card">
                          <div className="dist-marca-name">
                            <HighlightText text={d.marca.name} query={searchQuery} />
                          </div>
                          <p className="dist-marca-desc">
                            <HighlightText text={d.marca.desc} query={searchQuery} />
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Section 3: Detalhes, Arsenal e Regras Especiais (if present) */}
                    {d.detalhes && (
                      <div className="dist-section dist-detalhes-section">
                        <div className="dist-section-title">
                          <span className="dist-section-icon">⚙️</span>
                          <h4>
                            <HighlightText text={d.detalhes.titulo} query={searchQuery} />
                          </h4>
                        </div>
                        <div className="dist-detalhes-card">
                          <p className="dist-detalhes-conteudo">
                            <HighlightText text={d.detalhes.conteudo} query={searchQuery} />
                          </p>

                          {d.detalhes.arsenal && d.detalhes.arsenal.length > 0 && (
                            <div className="dist-arsenal-block">
                              <h5 className="dist-arsenal-title">
                                Opções ({d.detalhes.arsenal.length}):
                              </h5>
                              <div className="dist-arsenal-grid">
                                {d.detalhes.arsenal.map((item, idx) => (
                                  <div key={idx} className="dist-arsenal-item">
                                    <strong className="dist-arsenal-name">
                                      <HighlightText text={item.n} query={searchQuery} />:
                                    </strong>{' '}
                                    <span className="dist-arsenal-desc">
                                      <HighlightText text={item.d} query={searchQuery} />
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Section 4: Poderes da Distinção */}
                    <div className="dist-section dist-poderes-section">
                      <div className="dist-section-title">
                        {/* <span className="dist-section-icon">⚡</span> */}
                        <h4>Poderes ({d.poderes?.length || 0})</h4>
                      </div>
                      <div className="dist-powers-grid">
                        {d.poderes?.map((poder, pIdx) => (
                          <div key={pIdx} className="dist-power-card">
                            <div className="dist-power-header">
                              <span className="dist-power-name">
                                <HighlightText text={poder.name} query={searchQuery} />
                              </span>
                              {poder.req && (
                                <span className="dist-power-req" title={`Pré-requisitos: ${poder.req}`}>
                                  <span className="req-icon">🔑</span>
                                  <HighlightText text={poder.req} query={searchQuery} />
                                </span>
                              )}
                            </div>
                            <p className="dist-power-desc">
                              <HighlightText text={poder.desc} query={searchQuery} />
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
