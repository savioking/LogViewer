import React from 'react';
import { timeLineData, campaignData } from '../data/timeLineData';

const getIcon = (type) => {
  switch (type) {
    case 'global':
      return '🌍';
    case 'campanha':
      return '📜';
    case 'misc':
      return '📌';
    default:
      return '📄';
  }
};

export default function Timeline() {
  // Sort events chronologically (year, then month)
  const sortedEvents = [...timeLineData].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.month - b.month;
  });

  // Group events by year
  const groupedEvents = {};
  sortedEvents.forEach(event => {
    if (!groupedEvents[event.year]) {
      groupedEvents[event.year] = [];
    }
    groupedEvents[event.year].push(event);
  });

  const getCampaignInfo = (campId) => {
    return campaignData.find(c => c.id === campId) || null;
  };

  return (
    <div className="timeline-container fade-in">
      <div className="timeline-header-fixed">
        <div className="dashboard-header">
          <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-accent)', marginBottom: '12px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px' }}>
            Linha do Tempo
          </h2>
        </div>

        {/* <div className="timeline-legend" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
          {campaignData.map(camp => (
            <div key={camp.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: camp.color, display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{camp.nome}</span>
            </div>
          ))}
        </div> */}
      </div>

      <div className="timeline-scroll-area">
        <div className="timeline">
          <div className="timeline-line"></div>
          
          {Object.keys(groupedEvents).sort((a, b) => a - b).map(year => (
            <React.Fragment key={year}>
              {/* Year Marker */}
              <div className="timeline-year-marker">
                <span className="year-badge">{year}</span>
              </div>
              
              {/* Events for this year */}
              {groupedEvents[year].map((event, index) => {
                const isLeft = index % 2 === 0;
                const campaign = event.campId ? getCampaignInfo(event.campId) : null;
                const cardStyle = campaign ? { borderLeft: `4px solid ${campaign.color}` } : {};

                return (
                  <div key={event.id} className={`timeline-item ${isLeft ? 'left' : 'right'}`}>
                    <div className="timeline-content">
                      <div className="timeline-icon" title={event.iconType}>
                        {getIcon(event.iconType)}
                      </div>

                      <div className="timeline-card panel" style={cardStyle}>
                        <h3 className="timeline-card-title">{event.title}</h3>
                        {/* {campaign && (
                          <div style={{ fontSize: '0.7rem', color: campaign.color, marginBottom: '6px', fontWeight: 'bold' }}>
                            {campaign.nome}
                          </div>
                        )} */}
                        <p className="timeline-card-desc">{event.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
