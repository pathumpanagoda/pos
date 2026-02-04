import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { POS } from './pages/POS';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/Dashboard/Home';

import { Products } from './pages/Dashboard/Products';
import { Stock } from './pages/Dashboard/Stock';

const Placeholder = ({ title }: { title: string }) => (
  <div style={{ color: '#fff', padding: 20 }}>
    <h1>{title}</h1>
    <p>Measurement/Management page implementation pending.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pos" replace />} />
        <Route path="/pos" element={<POS />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="documents" element={<Placeholder title="Documents" />} />
          <Route path="products" element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="stock" element={<Stock />} />
          <Route path="pricelists" element={<Placeholder title="Price Lists" />} />
          {/* Add other routes as needed */}
          <Route path="*" element={<Placeholder title="Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
