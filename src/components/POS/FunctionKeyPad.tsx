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

export const FunctionKeyPad: React.FC = () => {
  return (
    <div className="function-grid" style={{ 
      width: '300px', 
      height: '100%', 
      gridTemplateRows: 'repeat(6, 1fr)',
      borderLeft: '1px solid var(--border-color)'
    }}>
      {/* Top Controls */}
      <FunctionKey code="" label="Delete" subLabel="✕" />
      <FunctionKey code="F3" label="Search" subLabel="🔍" />
      <FunctionKey code="F4" label="Quantity" subLabel="📦" />
      <FunctionKey code="F8" label="New sale" subLabel="+" />

      {/* Payment Types */}
      <FunctionKey code="F12" label="Cash" colSpan={1} />
      <FunctionKey code="" label="Credit Card" />
      <FunctionKey code="" label="Debit Card" />
      <FunctionKey code="" label="Check" />
      <FunctionKey code="" label="Voucher" />
      <FunctionKey code="" label="Gift Card" />

      {/* Spacer / Logo Area */}
      <div style={{ 
        gridColumn: '1 / -1', 
        gridRow: 'span 2', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--bg-dark)',
        opacity: 0.1,
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        aronium
      </div>

      <FunctionKey code="" label="Cash drawer" subLabel="Example" />
      <div style={{background: 'var(--bg-panel)'}}></div>

      {/* Bottom Actions */}
      <FunctionKey code="F2" label="Discount" subLabel="%" />
      <FunctionKey code="" label="Comment" subLabel="💬" />
      <FunctionKey code="" label="Customer" subLabel="👤" />
      <FunctionKey code="" label="..." />

      <FunctionKey code="F9" label="Save sale" />
      <FunctionKey code="" label="Refund" subLabel="↺" />
      <FunctionKey code="F10" label="Payment" rowSpan={1} colSpan={2} color="green" />

      <FunctionKey code="" label="Lock" subLabel="🔒" />
      <FunctionKey code="F7" label="Transfer" />
      <FunctionKey code="" label="Void order" color="red" />
      <FunctionKey code="" label="..." subLabel="•••" />
    </div>
  );
};
