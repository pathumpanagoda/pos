import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder } from 'lucide-react';
import './ProductTree.css';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    id: 'products',
    label: 'Products',
    children: [
      { id: 'anton', label: 'ANTON P V C' },
      { id: 'bearing', label: 'Bearing' },
      { id: 'belt', label: 'Belt' },
      { id: 'bicycle', label: 'Bicycle' },
      { id: 'brush', label: 'Brush Cutter' },
      { id: 'carbon', label: 'Carbon Brush' },
      { id: 'cell', label: 'Cell Phone' },
      { id: 'chain', label: 'Chain Saw' },
      { id: 'dsi', label: 'DSI' },
      { id: 'electric', label: 'Electric' },
      { id: 'hardware', label: 'Hardware' },
      { id: 'isiri', label: 'ISIRI MARKETING' },
      { id: 'kubota', label: 'Kubota' },
      { id: 'motorcycle', label: 'Motorcycle' },
      { id: 'network', label: 'Network' },
      { id: 'nut', label: 'Nut & Bolt' },
      { id: 'oil', label: 'Oil' },
      { id: 'pvc', label: 'PVC' },
      { id: 'paint', label: 'Paint' },
      { id: 'rnr', label: 'RNR' },
      { id: 'refill', label: 'Re Fill' },
      { id: 'sifang', label: 'Sifang' },
      { id: 'spare', label: 'Spare Parts' },
      { id: 'spark', label: 'Spark Plug' },
      { id: 'sport', label: 'Sport' },
    ]
  }
];

interface ProductTreeProps {
  onSelectCategory: (category: string) => void;
}

export const ProductTree: React.FC<ProductTreeProps> = ({ onSelectCategory }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['products']));
  const [selected, setSelected] = useState<string>('bicycle');

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectCategory(id);
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expanded.has(node.id);
    const isSelected = selected === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <React.Fragment key={node.id}>
        <div 
          className={`tree-node ${isSelected ? 'selected' : ''}`} 
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => handleSelect(node.id)}
        >
          <span 
            className="tree-expander"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(node.id);
            }}
          >
            {hasChildren ? (
              isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            ) : <span style={{ width: 14 }} />}
          </span>
          
          <Folder size={16} fill={hasChildren ? (isExpanded ? '#fff' : '#aaa') : '#fff'} className="tree-icon" />
          <span className="tree-label">{node.label}</span>
        </div>
        
        {isExpanded && node.children && (
          <div className="tree-children">
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="product-tree">
      {TREE_DATA.map(node => renderNode(node))}
    </div>
  );
};
