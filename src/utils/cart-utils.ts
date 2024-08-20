import { Product } from "@/gateways/products"

export interface CartItem extends Product {
  quantity: number;
}

export function getStoredCart(): Map<number, CartItem> {
  if (typeof window === 'undefined') return new Map();
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      return new Map(parsedCart);
    } catch (error) {
      console.error('Error parsing saved cart:', error);
    }
  }
  return new Map();
}

export function saveCartToStorage(cart: Map<number, CartItem>): void {
  if (cart.size > 0) {
    const cartArray = Array.from(cart.entries());
    const cartString = JSON.stringify(cartArray);
    try {
      localStorage.setItem('cart', cartString);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  } else {
    localStorage.removeItem('cart');
  }
}