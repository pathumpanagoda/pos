import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '101', name: 'Espresso', price: 2.50, category: 'Beverage', image: '☕' },
  { id: '102', name: 'Cappuccino', price: 3.50, category: 'Beverage', image: '☕' },
  { id: '103', name: 'Latte', price: 3.75, category: 'Beverage', image: '☕' },
  { id: '104', name: 'Mocha', price: 4.00, category: 'Beverage', image: '☕' },
  { id: '105', name: 'Americano', price: 2.75, category: 'Beverage', image: '☕' },
  { id: '201', name: 'Croissant', price: 2.25, category: 'Food', image: '🥐' },
  { id: '202', name: 'Blueberry Muffin', price: 2.50, category: 'Food', image: '🧁' },
  { id: '203', name: 'Bagel with Cream Cheese', price: 3.00, category: 'Food', image: '🥯' },
  { id: '204', name: 'Sandwich', price: 6.50, category: 'Food', image: '🥪' },
  { id: '301', name: 'Water Bottle', price: 1.50, category: 'Beverage', image: '💧' },
  { id: '302', name: 'Orange Juice', price: 3.00, category: 'Beverage', image: '🍊' },
];
