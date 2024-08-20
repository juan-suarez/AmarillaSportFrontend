// hooks/useProductsAndCart.ts
import { useState, useEffect } from 'react'
import { getProducts, Product } from "@/gateways/products"
import { CartItem, getStoredCart, saveCartToStorage } from "@/utils/cart-utils"

export function useProductsAndCart() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<Map<number, CartItem>>(() => getStoredCart())
  const [showCart, setShowCart] = useState(false)
  
  function toggleCart() {
    setShowCart(!showCart)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    saveCartToStorage(cart)
  }, [cart])

  async function loadProducts() {
    try {
      const fetchedProducts = await getProducts()
      setProducts(updateProductStockBasedOnCart(fetchedProducts, cart))
      setLoading(false)
    } catch (error) {
      console.error("Error loading products:", error)
      setLoading(false)
    }
  }

  function updateProductStockBasedOnCart(products: Product[], cart: Map<number, CartItem>): Product[] {
    return products.map(product => {
      const cartItem = cart.get(product.id)
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity }
      }
      return product
    })
  }

  function addToCart(product: Product) {
    if (product.stock > 0) {
      setProducts(updateProductStock(products, product.id, -1))
      setCart(updateCart(cart, product, 1))
    }
  }

  function removeFromCart(product: Product) {
    setProducts(updateProductStock(products, product.id, 1))
    setCart(updateCart(cart, product, -1))
  }

  function updateProductStock(products: Product[], productId: number, stockChange: number): Product[] {
    return products.map(p => 
      p.id === productId ? { ...p, stock: p.stock + stockChange } : p
    )
  }

  function updateCart(cart: Map<number, CartItem>, product: Product, quantityChange: number): Map<number, CartItem> {
    const newCart = new Map(cart)
    const existingItem = cart.get(product.id)
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityChange
      if (newQuantity <= 0) {
        newCart.delete(product.id)
      } else {
        newCart.set(product.id, { ...existingItem, quantity: newQuantity })
      }
    } else if (quantityChange > 0) {
      newCart.set(product.id, { ...product, quantity: quantityChange })
    }
    
    return newCart
  }

  return { products, loading, cart, addToCart, removeFromCart, showCart, toggleCart }
}