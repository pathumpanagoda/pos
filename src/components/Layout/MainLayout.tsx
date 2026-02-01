import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './MainLayout.css';
import { MOCK_PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;      // The Transaction Table
  functionKeys: React.ReactNode;  // The Right Panel
  onProductSelect?: (product: Product) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, functionKeys, onProductSelect }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim().length > 0) {
      const results = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) || 
        p.id.includes(term)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectProduct = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  return (
    <div className="layout-container">
      {/* 1. Header */}
      <header className="app-header">
         {/* Icons */}
         <div style={{ display: 'flex', gap: 16, fontSize: '1.2rem', color: '#ccc', alignItems: 'center' }}>
            <span>✳</span>
            <span>|||||</span>
            <span>#</span>
            <span style={{ color: 'var(--accent-cyan)' }}>🏷</span>
            <button 
              onClick={() => navigate('/dashboard')}
              style={{
                marginLeft: 10,
                padding: '4px 8px',
                backgroundColor: '#333',
                border: '1px solid #555',
                borderRadius: 4,
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
            >
              Dashboard
            </button>
         </div>
         
         {/* Search */}
         <div className="search-bar" style={{ position: 'relative' }}>
            <span style={{ marginRight: 8 }}>🔍</span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search products by name" 
              value={searchTerm}
              onChange={handleSearch}
            />
            {/* Search Dropdown */}
            {searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#333',
                border: '1px solid #555',
                zIndex: 1000,
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {searchResults.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #444',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>{product.image} {product.name}</span>
                    <span>{product.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
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
