"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

// Simulated async function to fetch products
async function fetchProducts(): Promise<Product[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Camiseta de algodón",
          description: "Camiseta de algodón suave y cómoda",
          price: 19.99,
          image: "/placeholder.svg?height=200&width=200",
          stock: 25,
        },
        {
          id: 2,
          name: "Pantalón de mezclilla",
          description: "Pantalón de mezclilla de corte clásico",
          price: 39.99,
          image: "/placeholder.svg?height=200&width=200",
          stock: 15,
        },
        {
          id: 3,
          name: "Zapatos deportivos",
          description: "Zapatos deportivos con suela antideslizante",
          price: 49.99,
          image: "/placeholder.svg?height=200&width=200",
          stock: 10,
        },
        {
          id: 4,
          name: "Chaqueta de invierno",
          description: "Chaqueta de invierno abrigada y resistente al viento",
          price: 59.99,
          image: "/placeholder.svg?height=200&width=200",
          stock: 8,
        },
      ]);
    }, 1000);
  });
}

function getStoredCart(): Map<number, CartItem> {
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

export function Products(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [cart, setCart] = useState<Map<number, CartItem>>(() => getStoredCart());

  useEffect(() => {
    // Load products and cart when component mounts
    const loadData = async () => {
      try {
        const fetchedProducts = await fetchProducts()
        
        setProducts(fetchedProducts.map((product => {
          const cartItem = cart.get(product.id);
          if(cartItem){
            product.stock -= cartItem.quantity;
          }
          return product;
        })))
        setLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (cart.size > 0) {
      const cartArray = Array.from(cart.entries())
      const cartString = JSON.stringify(cartArray)
      console.log('Saving cart to localStorage:', cartString)
      try {
        localStorage.setItem('cart', cartString)
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    } else {
      console.log('Removing cart from localStorage')
      localStorage.removeItem('cart')
    }
  }, [cart])

  const addToCart = (product: Product) => {
    if (product.stock > 0) {
      setProducts(products.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)))
      setCart(prevCart => {
        const newCart = new Map(prevCart);
        const existingItem = prevCart.get(product.id);
        newCart.set(product.id, { 
          ...product, 
          quantity: (existingItem?.quantity || 0) + 1 
        });
        console.log('Updated cart after adding:', newCart)
        return newCart;
      });
    }
  }

  const removeFromCart = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? { ...p, stock: p.stock + 1 } : p)))
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      const existingItem = prevCart.get(product.id);
      if (existingItem && existingItem.quantity <= 1) {
        newCart.delete(product.id);
      } else if (existingItem) {
        newCart.set(product.id, { ...existingItem, quantity: existingItem.quantity - 1 });
      }
      console.log('Updated cart after removing:', newCart)
      return newCart;
    });
  }

  if (loading) {
    return <div>Loading products...</div>
  }

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover"
                  style={{ aspectRatio: "400/400", objectFit: "cover" }}
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm">
                  {product.stock} en stock
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-500 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">${product.price}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFromCart(product)}
                      disabled={!cart.has(product.id)}
                    >
                      -
                    </Button>
                    <span className="text-gray-500">{cart.get(product.id)?.quantity || 0}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <Button size="lg">
          <ShoppingCartIcon className="w-6 h-6 mr-2" />
          Ver carrito ({cart.size})
        </Button>
      </div>
    </div>
  )
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}