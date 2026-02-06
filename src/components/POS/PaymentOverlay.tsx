import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, PenLine, DollarSign, Percent, Layers, User,
  CornerDownLeft, Delete, AlignJustify,
  Printer, Mail, FileText, Check
} from 'lucide-react';
import { printReceipt } from '../../utils/receiptPrinter';
import type { CartItem } from '../../types';
import './PaymentOverlay.css';

interface PaymentOverlayProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

export const PaymentOverlay: React.FC<PaymentOverlayProps> = ({
  isOpen, items, total, onClose, onComplete
}) => {
  const [step, setStep] = useState<'payment' | 'receipt'>('payment');
  const [paidAmountStr, setPaidAmountStr] = useState<string>('');
  
  // Initialize paid amount with total when opening
  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setPaidAmountStr(total.toFixed(2));
    }
  }, [isOpen, total]);

  const paidAmount = parseFloat(paidAmountStr) || 0;
  const change = paidAmount - total;
  const isSufficient = paidAmount >= total;

  const handlePrint = () => {
    printReceipt({
      items,
      subtotal: total,
      tax: 0,
      total,
      paid: paidAmount,
      change,
      date: new Date()
    });
  };

  const handleKeyPress = useCallback((key: string) => {
    if (step !== 'payment') return;

    if (key === 'Enter') {
      if (isSufficient) {
        setStep('receipt');
      }
    } else if (key === 'Backspace') {
      setPaidAmountStr(prev => prev.slice(0, -1));
    } else if (key === 'Escape') {
      onClose();
    } else if (/^[0-9.]$/.test(key)) {
      setPaidAmountStr(prev => {
        // Prepare to overwrite if it's the exact total (initial state) and user types a number
        // (Just a simple clear on first edit approach if previous was auto-filled? 
        //  Actually standard POS behavior: if entire text selected, replace. 
        //  For simplicity here: append. User can clear with Backspace.)
        if (key === '.' && prev.includes('.')) return prev;
        return prev + key;
      });
    }
  }, [step, isSufficient, onClose]);

  // Global Keyboard Listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
             if (step === 'payment') onClose();
        } else {
             handleKeyPress(e.key);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyPress, onClose, step]);


  if (!isOpen) return null;

  /* --- RENDERERS --- */

  const renderNumpad = () => (
    <div className="pay-numpad">
      {['1', '2', '3', 'backspace'].map(k => (
        <button key={k} className="pay-num-btn" onClick={() => handleKeyPress(k === 'backspace' ? 'Backspace' : k)}>
           {k === 'backspace' ? <Delete size={24} /> : k}
        </button>
      ))}
      {['4', '5', '6', 'C'].map(k => (
        <button key={k} className="pay-num-btn" onClick={() => k === 'C' ? setPaidAmountStr('') : handleKeyPress(k)}>
          {k}
        </button>
      ))}
      {['7', '8', '9', 'enter'].map(k => {
         if (k === 'enter') return null; // Handle separately to span
         return (
            <button key={k} className="pay-num-btn" onClick={() => handleKeyPress(k)}>{k}</button>
         );
      })}
      
      {/* 4th col, spanning 2 rows for Enter */}
      {/* This grid layout is tricky with map, hardcoding grid items is easier */}
    </div>
  );

  const NumpadGrid = () => (
      <div className="pay-numpad-grid">
          <button onClick={() => handleKeyPress('1')}>1</button>
          <button onClick={() => handleKeyPress('2')}>2</button>
          <button onClick={() => handleKeyPress('3')}>3</button>
          <button onClick={() => handleKeyPress('Backspace')}><Delete size={22}/></button>

          <button onClick={() => handleKeyPress('4')}>4</button>
          <button onClick={() => handleKeyPress('5')}>5</button>
          <button onClick={() => handleKeyPress('6')}>6</button>
          <button onClick={() => setPaidAmountStr('')}>C</button>

          <button onClick={() => handleKeyPress('7')}>7</button>
          <button onClick={() => handleKeyPress('8')}>8</button>
          <button onClick={() => handleKeyPress('9')}>9</button>
          
          <button className="pay-enter-btn" onClick={() => handleKeyPress('Enter')} disabled={!isSufficient}>
              <CornerDownLeft size={28}/>
          </button>

          <button onClick={() => {/* neg */}}>-</button>
          <button onClick={() => handleKeyPress('0')}>0</button>
          <button onClick={() => handleKeyPress('.')}>.</button>
      </div>
  );

  return (
    <div className="payment-overlay">
      {/* LEFT PANEL: ITEMS */}
      <div className="pay-left-panel">
         <div className="pay-items-header">Items</div>
         <div className="pay-items-list">
            {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="pay-item-row">
                    <div className="pay-item-name">
                        <div className="pn">{item.name}</div>
                        <div className="pq">{item.quantity} x {item.price.toFixed(2)}</div>
                    </div>
                    <div className="pay-item-total">
                        {(item.quantity * item.price).toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                </div>
            ))}
         </div>
         <div className="pay-left-footer">
            <div className="pl-row"><span>Subtotal</span><span>{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
            <div className="pl-row"><span>Tax</span><span>0.00</span></div>
            <div className="pl-row total"><span>Total</span><span>{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
            {step === 'receipt' && <div className="pl-row"><span>Cash:</span><span>{paidAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>}
         </div>
      </div>

      {/* RIGHT PANEL: ACTIONS */}
      <div className="pay-right-panel">
         <div className="pay-header">
            <div className="ph-title">Actions</div>
            {step === 'receipt' && (
                <button className="ph-close-btn" onClick={onComplete}><X size={20}/></button>
            )}
         </div>

         {step === 'payment' ? (
             <>
                 {/* TOP BUTTONS */}
                 <div className="pay-top-actions">
                    <button className="cancel-btn" onClick={onClose}><X size={18} /> Cancel</button>
                    <div className="pay-top-right">
                        <button><DollarSign size={16}/> Taxes</button>
                        <button><Percent size={16}/> Discount</button>
                        <button><Layers size={16}/> Rounds</button>
                        <button><User size={16}/> Customer</button>
                    </div>
                 </div>

                 {/* MAIN PAYMENT AREA */}
                 <div className="pay-main-area">
                    {/* Payment Types Method List */}
                    <div className="payment-methods">
                        <div className="pm-label">Payment type</div>
                        <button className="pm-btn active">Cash</button>
                        <button className="pm-btn">Credit Card</button>
                        <button className="pm-btn">Debit Card</button>
                        <button className="pm-btn">Check</button>
                        <button className="pm-btn">Voucher</button>
                        <button className="pm-btn">Gift Card</button>
                        
                        <button className="pm-btn split"><AlignJustify size={16}/> Split payments</button>
                    </div>

                    {/* Input & Numpad */}
                    <div className="payment-input-area">
                        <div className="pi-label">Payment</div>
                        
                        <div className="pi-row total">
                            <span>Total:</span>
                            <span className="pi-value blue">{total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                        
                        <div className="pi-paid-box">
                            <div className="pi-row paid">
                                <span>Paid: <PenLine size={14} style={{display:'inline', marginLeft: 4}}/></span>
                            </div>
                            <input 
                                className="pi-input" 
                                value={paidAmountStr} 
                                readOnly 
                            />
                        </div>
                        <div className="pi-divider"></div>
                        
                        {/* NumPad */}
                        <div className="pi-numpad-wrapper">
                            <NumpadGrid />
                        </div>
                    </div>
                 </div>
             </>
         ) : (
             /* RECEIPT STEP */
             <div className="receipt-step">
                 <div className="receipt-center">
                    <div className="change-display">
                        <div className="change-icon"><DollarSign size={32}/></div>
                        <div className="change-text">
                            Change: <span className="change-amount">{change.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                        </div>
                    </div>
                    
                    <div className="receipt-question">How would the customer like their receipt?</div>
                    
                    <div className="receipt-options">
                        <button className="receipt-opt-btn active" onClick={handlePrint}>
                            <Printer size={32} />
                            <span>Print receipt</span>
                        </button>
                        <button className="receipt-opt-btn">
                            <Printer size={32} />
                            <span>Print invoice</span>
                        </button>
                        <button className="receipt-opt-btn">
                            <Mail size={32} />
                            <span>Send email</span>
                        </button>
                        <button className="receipt-opt-btn">
                            <FileText size={32} />
                            <span>Save as PDF</span>
                        </button>
                        <button className="receipt-opt-btn">
                            <PenLine size={32} />
                            <span>Add notes</span>
                        </button>
                    </div>
                 </div>
                 
                 <div className="receipt-footer">
                    <div className="rf-left">
                        <input type="checkbox" /> Don't show this again
                    </div>
                    <button className="done-btn" onClick={onComplete}>Done</button>
                 </div>
             </div>
         )}
      </div>
    </div>
  );
};
