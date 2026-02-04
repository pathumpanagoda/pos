import React, { useState } from 'react';
import { 
  RefreshCw, Clock, Printer, FileText, FileSpreadsheet, 
  ClipboardList, Search, HelpCircle, Zap, Box
} from 'lucide-react';
import { ManagementToolbar } from './components/ManagementToolbar';
import type { ToolbarAction } from './components/ManagementToolbar';
import { ProductTree } from './components/ProductTree';
import { StockGrid } from './components/StockGrid';
import './Stock.css';

export const Stock: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const toolbarActions: ToolbarAction[] = [
    { icon: RefreshCw, label: 'Refresh' },
    { icon: Clock, label: 'Stock history' },
    { icon: Printer, label: 'Print' }, // divider true?
    { icon: FileText, label: 'Save as PDF', divider: true },
    { icon: FileSpreadsheet, label: 'Excel' },
    { icon: ClipboardList, label: 'Inventory count report', divider: true },
    { icon: Zap, label: 'Quick inventory' },
    { icon: HelpCircle, label: 'Help', divider: true },
  ];

  return (
    <div className="stock-page">
      {/* 1. Icons Toolbar */}
      <ManagementToolbar actions={toolbarActions} />

      {/* 2. Filter Bar */}
      <div className="stock-filter-bar">
        <div className="filter-left">
           {/* Tree Toggle */}
           <div className="filter-icon-btn active"><Box size={16} /> Products</div>
        </div>
        
        <div className="filter-center">
             {/* Quantity Filters */}
             <div className="toggle-group">
                <input type="checkbox" id="neg-qty" className="toggle-checkbox" />
                <label htmlFor="neg-qty" className="toggle-label">Negative quantity</label>
             </div>
             
             <div className="toggle-group">
                <input type="checkbox" id="non-zero-qty" className="toggle-checkbox" defaultChecked />
                <label htmlFor="non-zero-qty" className="toggle-label">Non zero quantity</label>
             </div>

             <div className="toggle-group">
                <input type="checkbox" id="zero-qty" className="toggle-checkbox" />
                <label htmlFor="zero-qty" className="toggle-label">Zero quantity</label>
             </div>
        </div>
        
        <div className="filter-right">
             {/* Search Input */}
             <div className="mode-toggles">
               <button className="mode-btn"><span style={{fontSize: 18}}>*</span></button>
               <button className="mode-btn"><span style={{fontSize: 14}}>|||</span></button>
               <button className="mode-btn active"><span style={{fontSize: 14}}>#</span></button>
             </div>

            <div className="filter-search">
              <input 
                type="text" 
                placeholder="Product name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={14} className="filter-search-icon" />
            </div>
        </div>
        
        <div className="filter-count">
             <span className="count-badge red">85</span>
             <span className="count-badge blue">302</span>
             <span className="count-badge green">2827</span>
             <span style={{ fontSize: '0.8rem', color: '#ccc', marginLeft: 8 }}>Products count: 3214</span>
        </div>
      </div>

      {/* 3. Main Split View */}
      <div className="stock-split-view">
        <div className="split-left">
          <ProductTree onSelectCategory={(cat) => console.log('Selected:', cat)} />
        </div>
        <div className="split-right">
          <StockGrid />
        </div>
      </div>
    </div>
  );
};
