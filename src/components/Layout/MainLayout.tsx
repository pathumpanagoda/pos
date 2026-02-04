import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import './MainLayout.css';
import { MOCK_PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { NumberPadModal } from '../Shared/NumberPadModal';
import { Asterisk, Barcode, Hash, Tag, Search, MoreVertical } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;      // The Transaction Table
  functionKeys: React.ReactNode;  // The Right Panel
  onProductSelect?: (product: Product) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, functionKeys, onProductSelect }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  // Resize State
  const [rightPanelWidth, setRightPanelWidth] = useState(300);
  const isResizing = useRef(false);

  const startResizing = React.useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
  }, []);

  const stopResizing = React.useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
  }, []);

  const resize = React.useCallback((e: MouseEvent) => {
    if (isResizing.current) {
      // Calculate new width: Total Window Width - Mouse X
      // This assumes the panel is on the right.
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 200 && newWidth <= 600) { // Constraint bounds
        setRightPanelWidth(newWidth);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

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

  // Product Selection Workflow State
  const [workflowStep, setWorkflowStep] = useState<'idle' | 'price' | 'quantity'>('idle');
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const handleSelectProduct = (product: Product) => {
    setPendingProduct(product);
    setWorkflowStep('price');
    setSearchTerm('');
    setSearchResults([]);
  };

  const handlePriceConfirm = (priceStr: string) => {
    if (pendingProduct) {
      const price = parseFloat(priceStr);
      setPendingProduct({ ...pendingProduct, price: isNaN(price) ? 0 : price });
      setWorkflowStep('quantity');
    }
  };

  const handleQuantityConfirm = (qtyStr: string) => {
    if (pendingProduct && onProductSelect) {
      const quantity = parseFloat(qtyStr);
      const finalProduct = { 
        ...pendingProduct, 
        quantity: isNaN(quantity) ? 1 : quantity 
      };
      onProductSelect(finalProduct);
      setWorkflowStep('idle');
      setPendingProduct(null);
    }
  };

  const handleCancelWorkflow = () => {
    setWorkflowStep('idle');
    setPendingProduct(null);
  };

  return (
    <div 
      className="layout-container" 
      style={{ gridTemplateColumns: `1fr ${rightPanelWidth}px` }}
    >
      {/* 1. Header */}
      <header className="app-header">
         {/* Icons */}
         <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginLeft: 8 }}>
            <Asterisk size={25} color="#fff" strokeWidth={2.5} />
            <Barcode size={20} color="#fff" strokeWidth={2.5} />
            <Hash size={20} color="#fff" strokeWidth={2.5} />
            <Tag size={20} fill="#00b4d8" color="#00b4d8" strokeWidth={0} /> {/* Filled blue tag */}
         </div>
         
         {/* Search */}
         <div className="search-bar">
            <Search size={18} color="#9ca3af" style={{ marginRight: 12 }} />
            <div style={{ height: '20px', width: '1px', backgroundColor: '#4b5563', marginRight: 12 }}></div>
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
      </header>
      
      {/* 2. Main Transaction Area */}
      <main className="main-content">
        {children}
      </main>

      {/* 3. Right Function Keys */}
      <aside className="right-panel">
        <div 
          className="resize-handle"
          onMouseDown={startResizing}
        >
           <MoreVertical size={24} color="#fff" className="resize-handle-icon" />
        </div>
        {functionKeys}
      </aside>

      {/* Product Workflow Modals */}
      <NumberPadModal 
        isOpen={workflowStep === 'price'}
        title="Change price"
        subTitle={`Product "${pendingProduct?.name}"\nPrice: ${pendingProduct?.price.toLocaleString(undefined, {minimumFractionDigits: 2})}`}
        initialValue={pendingProduct?.price.toString()}
        onClose={handleCancelWorkflow}
        onConfirm={handlePriceConfirm}
      />

      <NumberPadModal 
        isOpen={workflowStep === 'quantity'}
        title="Change quantity"
        subTitle={`Product "${pendingProduct?.name}"\nDefault quantity: 1.000`}
        initialValue="1"
        onClose={handleCancelWorkflow}
        onConfirm={handleQuantityConfirm}
      />
    </div>
  );
};
