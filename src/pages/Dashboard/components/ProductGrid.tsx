import React, { useState } from 'react';
import './ProductGrid.css';
import { Check } from 'lucide-react';

interface ProductRow {
  id: string;
  code: string;
  name: string;
  group: string;
  barcode: string;
  cost: number;
  salePrice: number;
  taxes: string;
  salePriceTotal: number;
  active: boolean;
  unit?: string;
}

const MOCK_GRID_DATA: ProductRow[] = [
  { id: '4139', code: '4139', name: '16 T F/WHEEL', group: 'Bicycle', barcode: '2407172031005', cost: 475.00, salePrice: 690.00, taxes: '', salePriceTotal: 690.00, active: true },
  { id: '4138', code: '4138', name: '18 T LUMALA F/WHEEL', group: 'Bicycle', barcode: '2407172029255', cost: 575.00, salePrice: 790.00, taxes: '', salePriceTotal: 790.00, active: true },
  { id: '2647', code: '2647', name: 'AB Axel', group: 'Bicycle', barcode: '2401021556039', cost: 330.00, salePrice: 495.00, taxes: '', salePriceTotal: 495.00, active: true },
  { id: '4136', code: '4136', name: 'BICYCLE BB ACSAL KIT', group: 'Bicycle', barcode: '2407172027237', cost: 975.00, salePrice: 1400.00, taxes: '', salePriceTotal: 1400.00, active: true },
  { id: '4135', code: '4135', name: 'BICYCLE BRAK LINAR', group: 'Bicycle', barcode: '2407172026049', cost: 675.00, salePrice: 890.00, taxes: '', salePriceTotal: 890.00, active: true },
  { id: '4140', code: '4140', name: 'BICYCLE PADLE HAT', group: 'Bicycle', barcode: '2407172034242', cost: 875.00, salePrice: 1350.00, taxes: '', salePriceTotal: 1350.00, active: true },
  { id: '4141', code: '4141', name: 'BICYCLE PADLE PLASTIK', group: 'Bicycle', barcode: '2407172035102', cost: 590.00, salePrice: 890.00, taxes: '', salePriceTotal: 890.00, active: true },
  { id: '2868', code: '2858', name: 'Bicycle 2C Axel', group: 'Bicycle', barcode: '2401071319028', cost: 320.00, salePrice: 495.00, taxes: '', salePriceTotal: 495.00, active: true },
  { id: '3946', code: '3946', name: 'Bicycle 36H Hub', group: 'Bicycle', barcode: '2406061505191', cost: 790.00, salePrice: 1200.00, taxes: '', salePriceTotal: 1200.00, active: true },
  { id: '3945', code: '3945', name: 'Bicycle 40-11 Hub', group: 'Bicycle', barcode: '2406061502473', cost: 950.00, salePrice: 1250.00, taxes: '', salePriceTotal: 1250.00, active: true },
  { id: '2824', code: '2824', name: 'Bicycle A8 Axel', group: 'Bicycle', barcode: '2401071319097', cost: 330.00, salePrice: 495.00, taxes: '', salePriceTotal: 495.00, active: true },
];

export const ProductGrid: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set(['4139']));

  const handleRowClick = (id: string) => {
    setSelectedRows(new Set([id]));
  };

  return (
    <div className="product-grid-container">
      <table className="product-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>Code</th>
            <th>Name</th>
            <th>Group</th>
            <th>Barcode</th>
            <th className="text-right">Cost</th>
            <th className="text-right">Sale price...</th>
            <th>Taxes</th>
            <th className="text-right">Sale price</th>
            <th className="text-center">Active</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_GRID_DATA.map((row) => {
            const isSelected = selectedRows.has(row.id);
            return (
              <tr 
                key={row.id} 
                className={isSelected ? 'selected' : ''}
                onClick={() => handleRowClick(row.id)}
              >
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.group}</td>
                <td>{row.barcode}</td>
                <td className="text-right">{row.cost.toFixed(2)}</td>
                <td className="text-right">{row.salePrice.toFixed(2)}</td>
                <td>{row.taxes}</td>
                <td className="text-right">{row.salePriceTotal.toFixed(2)}</td>
                <td className="text-center">
                  {row.active && <Check size={14} />}
                </td>
                <td>{row.unit}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
