import React, { useState, useEffect, useCallback } from 'react';
import { X, Delete, CornerDownLeft } from 'lucide-react';
import './NumberPadModal.css';

interface NumberPadModalProps {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  initialValue?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}

export const NumberPadModal: React.FC<NumberPadModalProps> = ({
  isOpen,
  title,
  subTitle,
  initialValue = '',
  onClose,
  onConfirm
}) => {
  const [value, setValue] = useState(initialValue);

  // Reset value when modal opens
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  const handleKeyPress = useCallback((key: string) => {
    if (key === 'Enter') {
      onConfirm(value || '0');
    } else if (key === 'Backspace') {
      setValue(prev => prev.slice(0, -1));
    } else if (key === 'Escape') {
      onClose();
    } else if (/^[0-9.]$/.test(key)) {
      setValue(prev => {
        if (key === '.' && prev.includes('.')) return prev;
        return prev + key;
      });
    }
  }, [value, onClose, onConfirm]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for some keys if needed
      if (['Enter', 'Escape'].includes(e.key)) {
        e.preventDefault();
      }
      
      handleKeyPress(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyPress]);

  if (!isOpen) return null;

  const renderKey = (label: string | React.ReactNode, value: string, className = '') => (
    <button 
      className={`numpad-btn ${className}`} 
      onClick={() => handleKeyPress(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="modal-overlay">
      <div className="number-pad-modal">
        <div className="modal-header">
          <h2>{title}</h2>
          {subTitle && <div className="modal-subtitle">{subTitle}</div>}
        </div>

        <div className="modal-input-container">
          <input 
            type="text" 
            value={value} 
            readOnly 
            className="modal-input" 
            autoFocus
          />
        </div>

        <div className="numpad-grid">
          {renderKey('1', '1')}
          {renderKey('2', '2')}
          {renderKey('3', '3')}
          {renderKey(<Delete size={24} />, 'Backspace')}
          
          {renderKey('4', '4')}
          {renderKey('5', '5')}
          {renderKey('6', '6')}
          {renderKey('esc', 'Escape', 'text-btn')}
          
          {renderKey('7', '7')}
          {renderKey('8', '8')}
          {renderKey('9', '9')}
          
          {renderKey('-', '-', '')} {/* Placeholder or Negative sign if needed */}
          {renderKey('0', '0')}
          {renderKey('.', '.')}
          
          {/* Enter Key Spanning rows */}
          <button 
            className="numpad-btn enter-btn" 
            onClick={() => handleKeyPress('Enter')}
          >
            <CornerDownLeft size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
