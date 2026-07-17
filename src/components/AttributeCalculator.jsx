import React, { useState, useEffect } from 'react';
import { pointCosts, races } from '../data/toolData';

export default function AttributeCalculator({ onBack }) {
  const [availablePoints, setAvailablePoints] = useState(10);
  const [raceId, setRaceId] = useState('humano');
  const [attributes, setAttributes] = useState({
    FOR: 0,
    DES: 0,
    CON: 0,
    INT: 0,
    SAB: 0,
    CAR: 0
  });

  const [selectedBonuses, setSelectedBonuses] = useState({
    FOR: 0,
    DES: 0,
    CON: 0,
    INT: 0,
    SAB: 0,
    CAR: 0
  });

  const [pointsSpent, setPointsSpent] = useState(0);

  // Reset selected bonuses when race changes
  useEffect(() => {
    setSelectedBonuses({
      FOR: 0, DES: 0, CON: 0, INT: 0, SAB: 0, CAR: 0
    });
  }, [raceId]);

  const calculatePoints = (attrs) => {
    let total = 0;
    for (const val of Object.values(attrs)) {
      if (pointCosts[val.toString()] !== undefined) {
        total += pointCosts[val.toString()];
      }
    }
    return total;
  };

  useEffect(() => {
    setPointsSpent(calculatePoints(attributes));
  }, [attributes]);

  const handleAttrChange = (attr, val) => {
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 0;
    // restrict to -1 to 4 for point buy
    if (num < -1) num = -1;
    if (num > 4) num = 4;

    setAttributes(prev => ({ ...prev, [attr]: num }));
  };

  const getRaceData = () => {
    return races.find(r => r.id === raceId) || {};
  };

  const race = getRaceData();
  const raceBonuses = race.bonuses || {};
  const raceChoice = race.choice || null;

  const currentChoicesUsed = Object.values(selectedBonuses).reduce((a, b) => a + b, 0);
  const remainingChoices = raceChoice ? raceChoice.points - currentChoicesUsed : 0;

  const handleBonusChange = (attr, delta) => {
    if (!raceChoice) return;

    setSelectedBonuses(prev => {
      const currentVal = prev[attr];
      const newVal = currentVal + delta;

      // Restrictions
      if (newVal < 0 && raceChoice.mode != 'free') return prev; // Cannot go below 0
      
      // If adding
      if (delta > 0) {
        if (remainingChoices <= 0) return prev; // No points left to spend
        
        // Check restriction list
        if (raceChoice.restricted && raceChoice.restricted.includes(attr)) return prev;

        // Check mode limits
        if (raceChoice.mode === 'different' && newVal > 1) return prev;
        if (raceChoice.mode === 'stackable' && newVal > 2) return prev;
      }

      return { ...prev, [attr]: newVal };
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <button 
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-primary)',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '16px'
          }}
        >
          ← Voltar
        </button>
        <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-accent)', margin: 0 }}>
          Calculadora de Atributos
        </h2>
      </div>

      <div style={{ 
        backgroundColor: 'var(--bg-card)', 
        border: '1px solid var(--border-primary)', 
        borderRadius: '8px', 
        padding: '24px' 
      }}>
        
        {/* Top Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Pontos Disponíveis
            </label>
            <input 
              type="number" 
              value={availablePoints}
              onChange={(e) => setAvailablePoints(parseInt(e.target.value) || 0)}
              style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--border-secondary)',
                color: 'var(--text-primary)',
                padding: '8px 12px',
                borderRadius: '4px',
                width: '100px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Raça
            </label>
            <select 
              value={raceId}
              onChange={(e) => setRaceId(e.target.value)}
              style={{
                background: 'var(--bg-app)',
                border: '1px solid var(--border-secondary)',
                color: 'var(--text-primary)',
                padding: '8px 12px',
                borderRadius: '4px',
                minWidth: '200px'
              }}
            >
              {races.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
          
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Pontos Gastos
            </div>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: pointsSpent > availablePoints ? 'var(--text-combat)' : 'var(--text-accent)' 
            }}>
              {pointsSpent} / {availablePoints}
            </div>
          </div>
        </div>

        {/* Selected Race Info */}
        <div style={{ marginBottom: '24px', padding: '12px', backgroundColor: 'var(--bg-app)', borderRadius: '4px', borderLeft: '4px solid var(--border-primary)' }}>
          <strong style={{ color: 'var(--text-accent)' }}>Bônus Racial: </strong> 
          <span style={{ color: 'var(--text-primary)' }}>
            {race.description}
          </span>
          {raceChoice && (
            <>
            {raceChoice.mode == 'free' || remainingChoices == 0 ? (
                <div style={{ marginTop: '8px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <strong>Escolhidos:</strong> {Object.entries(selectedBonuses).filter(([chave, valor]) => valor !== 0).map(([chave, valor]) => `${valor > 0 ? '+' : ''}${valor} ${chave}`).join(', ')}
                </div>
              ) : (
                <div style={{ marginTop: '8px', fontSize: '0.95rem', color: remainingChoices > 0 ? 'var(--text-combat)' : 'var(--text-secondary)' }}>
                  <strong>A escolher:</strong> {remainingChoices} restantes 
                  {raceChoice.restricted?.length > 0 && ` (Restrições: ${raceChoice.restricted.join(', ')})`}
                </div>
            )}
            </>
          )}
          
        </div>

        {/* Attributes Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', borderBottom: '1px solid var(--border-secondary)', paddingBottom: '8px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
            <div style={{textAlign: 'center'}}>Atributo</div>
            <div style={{textAlign: 'center'}}>Base</div>
            <div style={{textAlign: 'center'}}>Raça</div>
            <div style={{textAlign: 'center'}}>Total</div>
          </div>

          {Object.keys(attributes).map(attr => {
            const base = attributes[attr];
            const fixedBonus = raceBonuses[attr] || 0;
            const chosenBonus = selectedBonuses[attr] || 0;
            const accumRaceBonus = fixedBonus + chosenBonus;
            const total = base + fixedBonus + chosenBonus;

            return (
              <div key={attr} style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--text-accent)', fontSize: '1.1rem', textAlign:'center'}}>
                  {attr}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  
                  <input 
                    value={base}
                    onChange={(e) => handleAttrChange(attr, e.target.value)}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    style={{
                      width: '40px', height:'50px', textAlign: 'center', fontSize:'1.2rem',
                      background: 'var(--bg-app)', border: '1px solid var(--border-secondary)',
                      color: 'var(--text-primary)', padding: '6px', borderRadius: '4px'
                    }}
                  />
                  <div style={{display: 'flex', flexDirection:'column', justifyContent:'center'}}>
                    <button 
                      onClick={() => handleAttrChange(attr, base + 1)}
                      disabled={base >= 4}
                      style={{
                        width: '25px', height: '25px', 
                        background: 'var(--bg-app)', border: '1px solid var(--border-secondary)',
                        color: base >= 4 ? 'var(--text-secondary)' : 'var(--text-primary)',
                        cursor: base >= 4 ? 'not-allowed' : 'pointer',
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >+</button>
                    <button 
                      onClick={() => handleAttrChange(attr, base - 1)}
                      
                      disabled={base <= -1}
                      style={{
                        width: '25px', height: '25px', 
                        background: 'var(--bg-app)', border: '1px solid var(--border-secondary)',
                        color: base <= -1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                        cursor: base <= -1 ? 'not-allowed' : 'pointer',
                        borderRadius: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >-</button>
                  </div>
                </div>

                {/* <div style={{ color: fixedBonus > 0 ? '#4CAF50' : fixedBonus < 0 ? '#F44336' : 'var(--text-secondary)', textAlign: 'center'}}>
                  {fixedBonus > 0 ? `+${fixedBonus}` : (fixedBonus === 0 ? '-' : fixedBonus)}
                </div> */}

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  
                      <span style={{ width: '20px', textAlign: 'center', color: accumRaceBonus > 0 ? '#4CAF50' : accumRaceBonus < 0 ? '#F44336' : 'var(--text-secondary)', }}>
                        {accumRaceBonus > 0 ? `+${accumRaceBonus}` : (accumRaceBonus === 0 ? '-' : accumRaceBonus)}
                      </span>

                      {raceChoice && !(raceChoice.restricted && raceChoice.restricted.includes(attr)) ? (
                        <>
                          <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', marginLeft: '8px'}}>
                            <button 
                              onClick={() => handleBonusChange(attr, 1)}
                              disabled={
                                (remainingChoices <= 0 || 
                                (raceChoice.restricted && raceChoice.restricted.includes(attr)) ||
                                (raceChoice.mode === 'different' && chosenBonus >= 1) ||
                                (raceChoice.mode === 'stackable' && chosenBonus >= 2)) && raceChoice.mode != 'free'
                              }
                              style={{
                                width: '25px', height: '25px', 
                                background: 'var(--bg-app)', border: '1px solid var(--border-secondary)',
                                color: remainingChoices <= 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                cursor: remainingChoices <= 0 || 
                                ((raceChoice.restricted && raceChoice.restricted.includes(attr)) ||
                                (raceChoice.mode === 'different' && chosenBonus >= 1) ||
                                (raceChoice.mode === 'stackable' && chosenBonus >= 2)) && raceChoice.mode != 'free' ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >+</button>
                            <button 
                              onClick={() => handleBonusChange(attr, -1)}
                              disabled={chosenBonus <= 0 && raceChoice.mode != 'free'}
                              style={{
                                width: '25px', height: '25px', 
                                background: 'var(--bg-app)', border: '1px solid var(--border-secondary)',
                                color: chosenBonus <= 0 && raceChoice.mode != 'free' ? 'var(--text-secondary)' : 'var(--text-primary)',
                                cursor: chosenBonus <= 0 && raceChoice.mode != 'free' ? 'not-allowed' : 'pointer',
                                borderRadius: '4px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >-</button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                </div>
                
                <div style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                }}>
                  {total}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
