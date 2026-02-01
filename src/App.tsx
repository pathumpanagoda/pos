import { useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { TransactionTable } from './components/POS/TransactionTable';
import { FunctionKeyPad } from './components/POS/FunctionKeyPad';
import type { CartItem } from './types';

// Mock Items for visual check (Pre-filled cart)
const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Wireless Headphones', price: 59.99, category: 'Electronics', quantity: 1 },
  { id: '2', name: 'USB-C Cable 2m', price: 12.50, category: 'Accessories', quantity: 2 },
];

function App() {
  const [cart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedId, setSelectedId] = useState<string | undefined>('1');

  return (
    <MainLayout 
      functionKeys={<FunctionKeyPad />}
    >
      <TransactionTable 
        items={cart} 
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    </MainLayout>
  );
}

export default App;
