import { useState } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { TransactionTable } from '../components/POS/TransactionTable';
import { FunctionKeyPad } from '../components/POS/FunctionKeyPad';
import { SideMenu } from '../components/POS/SideMenu';
import type { CartItem, Product } from '../types';

// Mock Items for visual check (Pre-filled cart)
const INITIAL_CART: CartItem[] = [
  { id: '1', name: 'Wireless Headphones', price: 59.99, category: 'Electronics', quantity: 1 },
  { id: '2', name: 'USB-C Cable 2m', price: 12.50, category: 'Accessories', quantity: 2 },
];

export const POS = () => {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedId, setSelectedId] = useState<string | undefined>('1');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ... (existing helper functions)

  const addToCart = (product: Product) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find((item: CartItem) => item.id === product.id);
      if (existing) {
        return prev.map((item: CartItem) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== id));
    if (selectedId === id) setSelectedId(undefined);
  };

  const clearCart = () => {
    setCart([]);
    setSelectedId(undefined);
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  // Handlers for FunctionKeyPad
  const handleKeyPadAction = (action: string) => {
    switch (action) {
      case 'DELETE':
        if (selectedId) removeFromCart(selectedId);
        break;
      case 'PAYMENT':
      case 'NEW_SALE':
        if (confirm('Start new sale? Current cart will be cleared.')) {
          clearCart();
        }
        break;
      case 'MENU':
        setIsMenuOpen(true);
        break;
      default:
        console.log('Action:', action);
    }
  };

  return (
    <MainLayout 
      functionKeys={<FunctionKeyPad onAction={handleKeyPadAction} />}
      onProductSelect={addToCart}
    >
      <TransactionTable 
        items={cart} 
        selectedId={selectedId}
        onSelect={setSelectedId}
        subtotal={subtotal}
        tax={tax}
        total={total}
      />
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </MainLayout>
  );
};
