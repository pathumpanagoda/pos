import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  History, 
  Layers, 
  ArrowDownUp, 
  CreditCard, 
  LogOut, 
  User, 
  MessageSquare,
  X
} from 'lucide-react';
import './SideMenu.css';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuItem = ({ icon: Icon, label, onClick, active = false }: { icon: any; label: string; onClick?: () => void; active?: boolean }) => (
  <div 
    className={`side-menu-item ${active ? 'active' : ''}`} 
    onClick={onClick}
  >
    <Icon size={20} />
    <span>{label}</span>
  </div>
);

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`side-menu-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />

      {/* Menu Drawer */}
      <div className={`side-menu-drawer ${isOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <h2>POS - Admin</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="side-menu-content">
          <MenuItem 
            icon={Settings} 
            label="Management" 
            onClick={() => {
              navigate('/dashboard');
              onClose();
            }} 
          />
          
          <div className="menu-divider" />

          <MenuItem icon={History} label="View sales history" />
          <MenuItem icon={Layers} label="View open sales" />
          <MenuItem icon={ArrowDownUp} label="Cash In / Out" />
          <MenuItem icon={CreditCard} label="Credit payments" />
          <MenuItem icon={LogOut} label="End of day" />

          <div className="menu-divider" />
          <div className="menu-section-title">User</div>
          
          <MenuItem icon={User} label="User info" />
          <MenuItem icon={LogOut} label="Sign out" />

          <div className="menu-divider" />

          <MenuItem icon={MessageSquare} label="Feedback" />
        </div>

        <div className="side-menu-footer">
           <div className="date-display">{new Date().toLocaleDateString()}</div>
           {/* Placeholder for bottom icons */}
           <div className="footer-icons">
             <span>☷</span>
             <span>⛶</span>
             <span>⏻</span>
           </div>
        </div>
      </div>
    </>
  );
};
