import React from 'react';

interface FunctionKeyProps {
  label: string;
  subLabel?: string;
  code: string; // e.g., "F1"
  color?: 'default' | 'green' | 'red';
  onClick?: () => void;
  rowSpan?: number;
  colSpan?: number;
}

const FunctionKey: React.FC<FunctionKeyProps> = ({ label, subLabel, code, color = 'default', rowSpan = 1, colSpan = 1, onClick }) => {
  return (
    <button 
      className={`func-btn ${color}`} 
      onClick={onClick}
      style={{ 
        gridRow: `span ${rowSpan}`, 
        gridColumn: `span ${colSpan}`,
        fontSize: '0.9rem'
      }}
    >
      <span style={{ position: 'absolute', top: 4, left: 6, fontSize: '0.7rem', opacity: 0.7 }}>{code}</span>
      {subLabel && <div style={{ marginBottom: 4 }}>{subLabel}</div>}
      <div style={{ fontWeight: 600, fontSize: '1rem' }}>{label}</div>
    </button>
  );
};

interface FunctionKeyPadProps {
  onAction: (action: string) => void;
}

export const FunctionKeyPad: React.FC<FunctionKeyPadProps> = ({ onAction }) => {
  return (
    <div className="function-grid" style={{ 
      width: '300px', 
      height: '100%', 
      gridTemplateRows: 'repeat(6, 1fr)',
      borderLeft: '1px solid var(--border-color)'
    }}>
      {/* Top Controls */}
      <FunctionKey code="" label="Delete" subLabel="✕" onClick={() => onAction('DELETE')} />
      <FunctionKey code="F8" label="New sale" subLabel="+" onClick={() => onAction('NEW_SALE')} />

      <FunctionKey code="" label="Cash drawer" subLabel="Example" />
      <div style={{background: 'var(--bg-panel)'}}></div>

      {/* Bottom Actions */}
      <FunctionKey code="F2" label="Discount" subLabel="%" onClick={() => onAction('DISCOUNT')} />
      <FunctionKey code="" label="Customer" subLabel="👤" />

      <FunctionKey code="F9" label="Save sale" onClick={() => onAction('SAVE')} />
      <FunctionKey code="" label="Refund" subLabel="↺" onClick={() => onAction('REFUND')} />
      <FunctionKey code="F10" label="Payment" rowSpan={1} colSpan={2} color="green" onClick={() => onAction('PAYMENT')} />

      <FunctionKey code="" label="Void order" color="red" onClick={() => onAction('VOID')} />
      <FunctionKey code="" label="..." subLabel="•••" onClick={() => onAction('MENU')} />
    </div>
  );
};
