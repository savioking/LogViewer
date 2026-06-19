import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CharacterDetail from './components/CharacterDetail';
import LogViewer from './components/LogViewer';
import { campaignData } from './data/campaignData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeId, setActiveId] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Propagate the theme class to body for background transitions
  useEffect(() => {
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-parchment';
  }, [theme]);

  // Handle navigation requests
  const handleSelectTab = (tab, id) => {
    setActiveTab(tab);
    setActiveId(id);
  };

  // Find the selected session if activeTab is 'session'
  const activeSession = activeTab === 'session' 
    ? campaignData.arcs.flatMap(arc => arc.sessions).find(s => s.id === activeId)
    : null;

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        activeId={activeId} 
        onSelectTab={handleSelectTab}
        campaign={campaignData}
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
      </main>
    </div>
  );
}
