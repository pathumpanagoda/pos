import React from 'react';
import type { CartItem } from '../../types';

interface TransactionTableProps {
  items: CartItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  subtotal: number;
  tax: number;
  total: number;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ items, selectedId, onSelect, subtotal, tax, total }) => {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }}>
      {/* Table Header */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'minmax(100px, 1fr) 100px 100px 100px', 
        padding: '8px 12px',
        backgroundColor: 'var(--bg-panel)',
        borderBottom: '2px solid var(--accent-cyan)',
        fontWeight: 'bold',
        fontSize: '0.9rem'
      }}>
        <div>Product name</div>
        <div style={{ textAlign: 'right' }}>Quantity</div>
        <div style={{ textAlign: 'right' }}>Price</div>
        <div style={{ textAlign: 'right' }}>Amount</div>
      </div>

      {/* Table Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.length === 0 ? (
           <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
             <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: 8 }}>No items</div>
             <div>Add products to receipt using barcode, code or search by pressing F3 button</div>
           </div>
        ) : (
          items.map((item, index) => (
             <div 
               key={item.id}
               onClick={() => onSelect(item.id)}
               style={{
                 display: 'grid',
                 gridTemplateColumns: 'minmax(200px, 1fr) 100px 100px 100px',
                 padding: '10px 12px',
                 backgroundColor: selectedId === item.id ? '#333' : (index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'),
                 borderBottom: '1px solid #333',
                 cursor: 'pointer'
               }}
             >
               <div>{item.name}</div>
               <div style={{ textAlign: 'right' }}>{item.quantity.toFixed(3)}</div>
               <div style={{ textAlign: 'right' }}>{item.price.toFixed(2)}</div>
               <div style={{ textAlign: 'right' }}>{(item.price * item.quantity).toFixed(2)}</div>
             </div>
          ))
        )}
      </div>

      {/* Footer Totals */}
      <div style={{ 
         backgroundColor: 'var(--bg-panel)', 
         padding: '12px 24px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'flex-end',
         borderTop: '1px solid var(--border-color)'
      }}>
         <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between', marginBottom: 4 }}>
           <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
           <span>{subtotal.toFixed(2)}</span>
         </div>
         <div style={{ display: 'flex', width: '300px', justifyContent: 'space-between', marginBottom: 8 }}>
           <span style={{ color: 'var(--text-secondary)' }}>Tax (10%)</span>
           <span>{tax.toFixed(2)}</span>
         </div>
         <div style={{ 
           display: 'flex', 
           width: '100%', 
           justifyContent: 'space-between', 
           fontSize: '2rem', 
           fontWeight: 'bold',
           borderTop: '1px dashed #555',
           paddingTop: 8
         }}>
           <span>Total</span>
           <span>{total.toFixed(2)}</span>
         </div>
      </div>
    </div>
  );
};
