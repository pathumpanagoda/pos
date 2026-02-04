import React from 'react';
import './StockGrid.css';

interface StockRow {
  id: string;
  code: string;
  name: string;
  quantity: number;
  unit: string;
  costPrice: number;
  cost: number;
  costInclTax: number;
  value: number;
  valueInclTax: number;
}

const MOCK_STOCK_DATA: StockRow[] = [
  { id: '1001', code: '1001', name: '6300 - SCK Bearing', quantity: 44, unit: '', costPrice: 276.00, cost: 12144.00, costInclTax: 12144.00, value: 20240.00, valueInclTax: 20240.00 },
  { id: '1002', code: '1002', name: '6301 - SCK Bearing', quantity: 41, unit: '', costPrice: 290.00, cost: 11890.00, costInclTax: 11890.00, value: 19065.00, valueInclTax: 19065.00 },
  { id: '1003', code: '1003', name: '6302 - SCK Bearing', quantity: 3, unit: '', costPrice: 420.00, cost: 1260.00, costInclTax: 1260.00, value: 2085.00, valueInclTax: 2085.00 },
  { id: '1004', code: '1004', name: '6303 - SCK Bearing', quantity: 19, unit: '', costPrice: 420.00, cost: 7980.00, costInclTax: 7980.00, value: 13205.00, valueInclTax: 13205.00 },
  { id: '1005', code: '1005', name: '6304 2RS - SCK Bearing', quantity: 2, unit: '', costPrice: 590.00, cost: 1180.00, costInclTax: 1180.00, value: 1780.00, valueInclTax: 1780.00 },
  { id: '1006', code: '1006', name: '6305 2RS - SCK Bearing', quantity: 88, unit: '', costPrice: 693.00, cost: 60984.00, costInclTax: 60984.00, value: 86240.00, valueInclTax: 86240.00 },
  { id: '1007', code: '1007', name: '6306 - SCK Bearing', quantity: 11, unit: '', costPrice: 983.00, cost: 10813.00, costInclTax: 10813.00, value: 18150.00, valueInclTax: 18150.00 },
  { id: '1008', code: '1008', name: '6307 - SCK Bearing', quantity: 1, unit: '', costPrice: 1650.00, cost: 1650.00, costInclTax: 1650.00, value: 2100.00, valueInclTax: 2100.00 },
  { id: '1010', code: '1010', name: '6309 - SCK Bearing', quantity: 12, unit: '', costPrice: 2200.00, cost: 26400.00, costInclTax: 26400.00, value: 43800.00, valueInclTax: 43800.00 },
  { id: '1012', code: '1012', name: '6311 SCK Bearing', quantity: 11, unit: '', costPrice: 2901.00, cost: 31911.00, costInclTax: 31911.00, value: 51150.00, valueInclTax: 51150.00 },
  { id: '1013', code: '1013', name: '6200 - SCK Bearing', quantity: 25, unit: '', costPrice: 290.00, cost: 7250.00, costInclTax: 7250.00, value: 11000.00, valueInclTax: 11000.00 },
  { id: '1014', code: '1014', name: '6201 - SCK Bearing', quantity: 62, unit: '', costPrice: 210.00, cost: 13020.00, costInclTax: 13020.00, value: 24490.00, valueInclTax: 24490.00 },
];

export const StockGrid: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<string>('1001');

  return (
    <div className="stock-grid-container">
      <div className="stock-table-wrapper">
        <table className="stock-table">
          <thead>
            <tr>
              <th style={{ width: 10 }}></th> {/* Status Dot */}
              <th style={{ width: 60 }}>Code</th>
              <th>Name</th>
              <th className="text-right">Quantity</th>
              <th>Unit...</th>
              <th className="text-right">Cost p...</th>
              <th className="text-right">Cost</th>
              <th className="text-right">Cost incl...</th>
              <th className="text-right">Value</th>
              <th className="text-right">Value incl...</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STOCK_DATA.map((row) => (
              <tr 
                key={row.id} 
                className={selectedId === row.id ? 'selected' : ''}
                onClick={() => setSelectedId(row.id)}
              >
                <td className="text-center"><div className="status-dot green"></div></td>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td className="text-right">{row.quantity}</td>
                <td>{row.unit}</td>
                <td className="text-right">{row.costPrice.toFixed(2)}</td>
                <td className="text-right">{row.cost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="text-right">{row.costInclTax.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="text-right">{row.value.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td className="text-right">{row.valueInclTax.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
              </tr>
            ))}
            {/* Fill remaining space */}
             {Array.from({ length: 15 }).map((_, i) => (
              <tr key={`empty-${i}`} className="empty-row">
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stock-footer">
         <div className="footer-group">
            <div className="footer-label">Cost price</div>
            <div className="footer-row">
                <span>Total cost:</span>
                <span className="footer-value">25,269,651.97</span>
            </div>
            <div className="footer-row">
                <span>Total cost inc. tax:</span>
                <span className="footer-value">25,269,651.97</span>
            </div>
         </div>
         <div className="footer-group">
            <div className="footer-label">Sale price</div>
            <div className="footer-row">
                <span>Total:</span>
                <span className="footer-value">34,393,149.64</span>
            </div>
            <div className="footer-row">
                <span>Total inc. tax:</span>
                <span className="footer-value">34,393,149.64</span>
            </div>
         </div>
      </div>
    </div>
  );
};
