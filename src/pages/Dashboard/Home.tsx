import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const SALES_DATA = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
  { month: 'Jul', sales: 7000 },
];

const HOURLY_SALES = [
  { hour: '8am', amount: 120 },
  { hour: '10am', amount: 300 },
  { hour: '12pm', amount: 500 },
  { hour: '2pm', amount: 450 },
  { hour: '4pm', amount: 600 },
  { hour: '6pm', amount: 400 },
];

export const DashboardHome = () => {
  return (
    <div>
      <h2 style={{ marginBottom: 20, fontSize: '1.2rem', color: '#fff' }}>Dashboard</h2>
      
      {/* Top Row: Monthly Sales + Big Stat */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 20, marginBottom: 20 }}>
        <div className="dash-card">
          <div className="dash-card-header">Monthly Sales - 2026</div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#333', border: '1px solid #555' }} />
                <Area type="monotone" dataKey="sales" stroke="#0078d7" fill="#0078d7" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: '#888', fontSize: '0.9rem' }}>Total Sales</div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>0</div>
          <div style={{ color: '#888', marginTop: 10 }}>Top performing month:</div>
          <div style={{ fontSize: '1.2rem', color: '#fff' }}>---</div>
        </div>
      </div>

      {/* Second Row: Top Products, Hourly, Total Sales */}
      <div className="dash-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div className="dash-card">
           <div className="dash-card-header">Top Products</div>
           <div style={{ color: '#888', textAlign: 'center', marginTop: 50 }}>No data available</div>
        </div>

        <div className="dash-card">
           <div className="dash-card-header">Hourly Sales</div>
           <div style={{ height: 150 }}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={HOURLY_SALES}>
                 <XAxis dataKey="hour" stroke="#888" fontSize={10} />
                 <Tooltip cursor={{fill: '#444'}} contentStyle={{ backgroundColor: '#333' }} />
                 <Bar dataKey="amount" fill="#0078d7" />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="dash-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ color: '#888' }}>Total Sales (Amount)</div>
           <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#fff' }}>0</div>
        </div>
      </div>

      {/* Third Row */}
      <div className="dash-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
         <div className="dash-card">
            <div className="dash-card-header">Top Product Groups</div>
         </div>
         <div className="dash-card">
            <div className="dash-card-header">Top Customers</div>
         </div>
      </div>
    </div>
  );
};
