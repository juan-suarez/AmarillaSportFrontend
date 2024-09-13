import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useProductsAndCart } from "@/hooks/useProductsAndCart";
import { CartItem } from "./cart-item";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SubmitButtonProps {
  isFormValid: boolean;
}

export function SubmitButton({ isFormValid }: SubmitButtonProps) {

  const { cart } = useProductsAndCart();
  const subTotal = Array.from(cart).reduce((total, [, product]) =>
    total + (product.price * product.quantity), 0
  )
  const deliveryFee = 15000;
  const totalPrice = subTotal + deliveryFee;

  return isFormValid ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Continue</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh]">
        <div className="flex flex-col h-full">
          <DialogHeader className="mb-3">
            <DialogTitle className="font-bold text-lg text-center">Resumen de la compra</DialogTitle>
          </DialogHeader>

          <div className="max-h-[40vh] flex-1 overflow-auto p-6">
            <div className="grid gap-6">
              {Array.from(cart).map(([productId, product]) => (
                <CartItem key={productId} product={product} />
              ))}
            </div>
          </div>

          <DialogFooter className="mt-3">
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full text-sm">
                <span>Sub total</span>
                <span>${subTotal}</span>
              </div>
              <div className="flex justify-between w-full text-sm">
                <span>Precio del envío</span>
                <span>${deliveryFee}</span>
              </div>
              <div className="flex justify-between w-full text-xl mt-3">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${totalPrice}</span>
              </div>

              <Button className="mt-4" disabled={cart.size === 0}>
                Confirmar pago
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Button className="w-full" type="submit">
      Continue
    </Button>
  );
}
