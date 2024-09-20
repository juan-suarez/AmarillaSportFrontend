import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { useProductsAndCart } from "@/hooks/useProductsAndCart"
import { ShoppingCartIcon } from "./icons/ShoppingCartIcon"
import { CartItem as CartItemInterface} from "@/utils/cart-utils"
import { CartItem } from "./cart-item"
import { redirect } from "next/navigation"
import Link from "next/link"

interface props {
  cart: Map<number, CartItemInterface>
}

export function CartSection( {cart}: props ) {
  
  const { showCart, toggleCart } = useProductsAndCart()

  const totalPrice = Array.from(cart).reduce((total, [, product]) => 
    total + (product.price * product.quantity), 0
  ).toFixed(2)

  return (
    <div className="fixed bottom-6 right-6">
      <Sheet open={showCart} onOpenChange={toggleCart}>
        <SheetTrigger asChild>
          <Button size="lg">
            <ShoppingCartIcon className="w-6 h-6 mr-2" />
            Ver carrito ({cart.size})
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-md">
          <div className="flex flex-col h-full">
            <SheetHeader className="text-primary-foreground px-6 py-4 flex items-center justify-between">
              <SheetTitle>Carrito de compras</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-auto p-6">
              {cart.size === 0 ? (
                <div className="text-center text-muted-foreground">Tu carrito está vacío.</div>
              ) : (
                <div className="grid gap-6">
                  {Array.from(cart).map(([productId, product]) => (
                    <CartItem key={productId} product={product} />
                  ))}
                </div>
              )}
            </div>
            <SheetFooter className="bg-muted px-6 py-4">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <span className="font-medium">Sub total:</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                
                  <Button className="mt-4" disabled= {cart.size === 0} ><Link href="/payment">Proceder al pago</Link></Button>
                
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}



