import React, { useState } from 'react';
import { 
  RefreshCw, FolderPlus, FolderPen, FolderX, Plus, Pencil, Trash2, Printer, 
  FileText, Tag, ArrowUpDown, TrendingUp, Download, Upload, HelpCircle,
  Search
} from 'lucide-react';
import './Products.css';
import { ManagementToolbar } from './components/ManagementToolbar';
import type { ToolbarAction } from './components/ManagementToolbar';
import { ProductTree } from './components/ProductTree';
import { ProductGrid } from './components/ProductGrid';

export const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const toolbarActions: ToolbarAction[] = [
    { icon: RefreshCw, label: 'Refresh' },
    { icon: FolderPlus, label: 'New group', divider: true },
    { icon: FolderPen, label: 'Edit group' },
    { icon: FolderX, label: 'Delete group' },
    { icon: Plus, label: 'New product', divider: true },
    { icon: Pencil, label: 'Edit product' },
    { icon: Trash2, label: 'Delete product' },
    { icon: Printer, label: 'Print', divider: true },
    { icon: FileText, label: 'Save as PDF' },
    { icon: Tag, label: 'Price tags' },
    { icon: ArrowUpDown, label: 'Sorting' },
    { icon: TrendingUp, label: 'Mov. avg. price' },
    { icon: Download, label: 'Import', divider: true },
    { icon: Upload, label: 'Export' },
    { icon: HelpCircle, label: 'Help', divider: true },
  ];

  return (
    <div className="products-page">
      {/* 1. Icons Toolbar */}
      <ManagementToolbar actions={toolbarActions} />

      {/* 2. Filter Bar */}
      <div className="products-filter-bar">
        <div className="filter-left">
           {/* Tree Toggle */}
           <div className="filter-icon-btn active"><FolderPlus size={16} /> Products</div>
        </div>
        
        <div className="filter-center">
            {/* View Modes */}
            <button className="filter-icon-btn active"><span style={{fontSize: 18}}>*</span></button>
            <button className="filter-icon-btn"><span style={{fontSize: 14}}>|||</span></button>
            <button className="filter-icon-btn"><span style={{fontSize: 14}}>#</span></button>
            <button className="filter-icon-btn active" style={{ backgroundColor: '#0078d7' }}><Tag size={14} color="white" fill="white" /></button>
            
            {/* Search Input */}
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

        <div className="filter-right">
             <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Products count: 112</span>
        </div>
      </div>

      {/* 3. Main Split View */}
      <div className="products-split-view">
        <div className="split-left">
          <ProductTree onSelectCategory={(cat) => console.log('Selected:', cat)} />
        </div>
        <div className="split-right">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};
