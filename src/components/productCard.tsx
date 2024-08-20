// components/ProductCard.tsx
import { Product } from "@/gateways/products"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: Product
  cartQuantity: number
  onAddToCart: () => void
  onRemoveFromCart: () => void
}

export function ProductCard({ product, cartQuantity, onAddToCart, onRemoveFromCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl || "/placeholder.svg"}
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
          <span className="font-bold">${product.price}</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={onRemoveFromCart}
              disabled={cartQuantity === 0}
            >
              -
            </Button>
            <span className="text-gray-500">{cartQuantity}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={onAddToCart}
              disabled={product.stock === 0}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}