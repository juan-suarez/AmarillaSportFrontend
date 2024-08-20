// components/Products.tsx
"use client"

import { useProductsAndCart } from "@/hooks/useProductsAndCart"
import { ProductCard } from "@/components/productCard"
import { ShoppingCartIcon } from "@/components/icons/ShoppingCartIcon"
import { Button } from "@/components/ui/button"
import { Loader } from "./ui/loader"

export function Products(): JSX.Element {
  const { products, loading, cart, addToCart, removeFromCart } = useProductsAndCart()

  if (loading) {
    return <Loader></Loader>
  }

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartQuantity={cart.get(product.id)?.quantity || 0}
              onAddToCart={() => addToCart(product)}
              onRemoveFromCart={() => removeFromCart(product)}
            />
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