import React from 'react';

export default function ToolsIndex({ onSelectTool }) {
  const tools = [
    {
      id: 'attribute-calculator',
      name: 'Calculadora de Atributos',
      description: 'Calcule os atributos de um personagem pela regra de pontos e com modificadores raciais.',
      icon: '🧮'
    }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-accent)', marginBottom: '24px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
        Ferramentas da Campanha
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {tools.map(tool => (
          <div 
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{tool.icon}</div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '1.2rem' }}>{tool.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
