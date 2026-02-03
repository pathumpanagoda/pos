import React from 'react';
import { 
  X,  Plus, Inbox, Percent, 
  User, Save, RotateCcw, CreditCard, 
  Lock, Trash2, MoreHorizontal
} from 'lucide-react';

interface FunctionKeyProps {
  label: string;
  icon?: React.ReactNode;
  code?: string; // e.g., "F1"
  color?: 'default' | 'green' | 'red';
  onClick?: () => void;
  rowSpan?: number;
  colSpan?: number;
  badge?: number;
}

const FunctionKey: React.FC<FunctionKeyProps> = ({ 
  label, icon, code, color = 'default', rowSpan = 1, colSpan = 1, onClick, badge 
}) => {
  return (
    <button 
      className={`func-btn ${color}`} 
      onClick={onClick}
      style={{ 
        gridRow: `span ${rowSpan}`, 
        gridColumn: `span ${colSpan}`,
      }}
    >
      {code && <span className="f-key-label">{code}</span>}
      {badge && <span className="notification-badge">{badge}</span>}
      <div className="btn-icon">{icon}</div>
      <div className="btn-label">{label}</div>
    </button>
  );
};

interface FunctionKeyPadProps {
  onAction: (action: string) => void;
}

export const FunctionKeyPad: React.FC<FunctionKeyPadProps> = ({ onAction }) => {
  return (
    <div className="function-grid">
      {/* Row 1 */}
      <FunctionKey code="" label="Delete" colSpan={2} icon={<X size={32} />} onClick={() => onAction('DELETE')} />
      {/* <FunctionKey code="F3" label="Search" icon={<Search size={32} />} onClick={() => onAction('SEARCH')} /> */}
      {/* <FunctionKey code="F4" label="Quantity" icon={<ShoppingBasket size={32} />} onClick={() => onAction('QUANTITY')} /> */}
      <FunctionKey code="F8" label="New sale" colSpan={2} icon={<Plus size={32} />} onClick={() => onAction('NEW_SALE')} />
      

      {/* Row 2 */}
      {/* Assuming specific layout from screenshot 2 which seems to focus on F2/F9/F10 rows, but we need to fill the grid.
          I'll place Cash drawer here as per first screenshot fragment, might span or be single. */}
      <FunctionKey code="" label="Cash drawer" colSpan={2} icon={<Inbox size={32} />} onClick={() => onAction('DRAWER')} />
      <FunctionKey code="" label=""  colSpan={2} icon={null} /> {/* Spacer or empty slot to maintain grid if needed, or maybe other keys verify later */}
 

      {/* Row 3 */}
      <FunctionKey code="F2" label="Discount" icon={<Percent size={32} />} onClick={() => onAction('DISCOUNT')} />
      {/* <FunctionKey code="" label="Comment" icon={<MessageSquare size={32} />} onClick={() => onAction('COMMENT')} /> */}
      <FunctionKey code="" label="Customer" icon={<User size={32} />} onClick={() => onAction('CUSTOMER')} />
      {/* <FunctionKey code="" label="53" icon={<UserCheck size={32} />} onClick={() => onAction('USER_53')} /> */}

      {/* Row 4 */}
      <FunctionKey code="F9" label="Save sale" badge={1} icon={<Save size={32} />} onClick={() => onAction('SAVE')} />
      <FunctionKey code="" label="Refund" icon={<RotateCcw size={32} />} onClick={() => onAction('REFUND')} />
      <FunctionKey code="F10" label="Payment" colSpan={4} color="green" icon={<CreditCard size={32} />} onClick={() => onAction('PAYMENT')} />

      {/* Row 5 */}
      <FunctionKey code="" label="Lock" icon={<Lock size={32} />} onClick={() => onAction('LOCK')} />
      {/* <FunctionKey code="F7" label="Transfer" icon={<ArrowRightLeft size={32} />} onClick={() => onAction('TRANSFER')} /> */}
      <FunctionKey code="" label="Void order" color="red" icon={<Trash2 size={32} />} onClick={() => onAction('VOID')} />
      <FunctionKey code="" label="Menu" colSpan={2} icon={<MoreHorizontal size={32} />} onClick={() => onAction('MENU')} />
    </div>
  );
};
