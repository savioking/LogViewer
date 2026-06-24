import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CharacterDetail from './components/CharacterDetail';
import LogViewer from './components/LogViewer';
import MapViewer from './components/MapViewer';
import { campaignData } from './data/campaignData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeId, setActiveId] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Propagate the theme class to body for background transitions
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-parchment';
  }, [theme]);

  // Handle navigation requests
  const handleSelectTab = (tab, id) => {
    setActiveTab(tab);
    setActiveId(id);
    setIsMobileMenuOpen(false); // Close mobile sidebar on navigation
  };

  // Find the selected session if activeTab is 'session'
  const activeSession = activeTab === 'session' 
    ? campaignData.arcs.flatMap(arc => arc.sessions).find(s => s.id === activeId)
    : null;

  return (
    <div className="app-container">
      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="mobile-header-title">{campaignData.title}</div>
      </div>

      {/* Mobile Overlay Backdrop */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        activeId={activeId} 
        onSelectTab={handleSelectTab}
        campaign={campaignData}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Panel Viewport */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            campaign={campaignData} 
            onSelectTab={handleSelectTab} 
          />
        )}

        {activeTab === 'character' && (
          <CharacterDetail 
            charId={activeId} 
            campaign={campaignData} 
            onBack={() => handleSelectTab('dashboard', null)} 
          />
        )}

        {activeTab === 'session' && activeSession && (
          <LogViewer 
            session={activeSession} 
            theme={theme}
            onThemeChange={setTheme}
          />
        )}

        {activeTab === 'map' && (
          <MapViewer campaign={campaignData} />
        )}
      </main>
    </div>
  );
}
