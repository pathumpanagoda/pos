import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Package, 
  Tags, 
  Box, 
  BarChart2, 
  Users, 
  Heart, 
  Shield, 
  CreditCard, 
  Globe, 
  Percent, 
  Building 
} from 'lucide-react';
import './DashboardLayout.css'; // We'll create this CSS next

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

export const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          Management • Dashboard
        </div>
        
        <nav className="sidebar-nav">
          <SidebarItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/dashboard/documents" icon={FileText} label="Documents" />
          <SidebarItem to="/dashboard/products" icon={Tags} label="Products" />
          <SidebarItem to="/dashboard/pricelists" icon={CreditCard} label="Price lists" />
          <SidebarItem to="/dashboard/stock" icon={Box} label="Stock" />
          
          <div className="sidebar-divider" />
          
          <SidebarItem to="/dashboard/reporting" icon={BarChart2} label="Reporting" />
          <SidebarItem to="/dashboard/customers" icon={Users} label="Customers & suppliers" />
          <SidebarItem to="/dashboard/promotions" icon={Heart} label="Promotions" />
          <SidebarItem to="/dashboard/security" icon={Shield} label="Users & security" />
          <SidebarItem to="/dashboard/payment" icon={CreditCard} label="Payment types" />
          <SidebarItem to="/dashboard/countries" icon={Globe} label="Countries" />
          <SidebarItem to="/dashboard/taxes" icon={Percent} label="Tax rates" />
          <SidebarItem to="/dashboard/company" icon={Building} label="My company" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};
