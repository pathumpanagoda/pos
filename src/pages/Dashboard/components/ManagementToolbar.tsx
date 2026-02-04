import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './ManagementToolbar.css';

export interface ToolbarAction {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  divider?: boolean;
}

interface ManagementToolbarProps {
  actions: ToolbarAction[];
}

export const ManagementToolbar: React.FC<ManagementToolbarProps> = ({ actions }) => {
  return (
    <div className="management-toolbar">
      {actions.map((action, index) => (
        <React.Fragment key={index}>
          {action.divider && <div className="toolbar-divider" />}
          <button className="toolbar-btn" onClick={action.onClick}>
            <action.icon size={20} strokeWidth={1.5} />
            <span>{action.label}</span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
