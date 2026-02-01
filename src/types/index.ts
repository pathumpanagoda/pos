export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  color?: string; // For placeholder styling
}

export interface CartItem extends Product {
  quantity: number;
}
