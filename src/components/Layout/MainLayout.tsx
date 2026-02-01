import React from 'react';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;      // The Transaction Table
  functionKeys: React.ReactNode;  // The Right Panel
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, functionKeys }) => {
  return (
    <div className="layout-container">
      {/* 1. Header */}
      <header className="app-header">
         {/* Icons */}
         <div style={{ display: 'flex', gap: 16, fontSize: '1.2rem', color: '#ccc' }}>
            <span>✳</span>
            <span>|||||</span>
            <span>#</span>
            <span style={{ color: 'var(--accent-cyan)' }}>🏷</span>
         </div>
         
         {/* Search */}
         <div className="search-bar">
            <span style={{ marginRight: 8 }}>🔍</span>
            <input type="text" className="search-input" placeholder="Search products by name" />
         </div>

         {/* Window Controls (Mac/Win style placeholder) */}
         <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
            <span>–</span>
            <span>☐</span>
            <span>✕</span>
         </div>
      </header>
      
      {/* 2. Main Transaction Area */}
      <main className="main-content">
        {children}
      </main>

      {/* 3. Right Function Keys */}
      <aside className="right-panel">
        {functionKeys}
      </aside>
    </div>
  );
};
