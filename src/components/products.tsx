// components/Products.tsx
"use client"

import { useProductsAndCart } from "@/hooks/useProductsAndCart"
import { ProductCard } from "@/components/productCard"
import { Loader } from "./ui/loader"
import { CartSection } from "./cart-section"

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
      <CartSection cart = {cart} />
    </div>
  )
}