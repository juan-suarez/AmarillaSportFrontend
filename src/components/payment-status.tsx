'use client'

import Link from "next/link"
import { CheckCircleIcon, XCircleIcon, HomeIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { Loader } from "./ui/loader"
import { confirmTransaction, getTransactionStatus } from "@/gateways/transaction"
import { useSearchParams } from "next/navigation"
import { createConfirmTransactionPayload, TransactionStatus } from "@/utils/payment"
import { clearCart } from "@/utils/cart-utils"

export function PaymentStatus() {
  const reference = useSearchParams().get("ref") as string
  const [isAccepted,setIsAccepted] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const hasConfirmedRef = useRef(false); // Referencia para evitar doble confirmación

  
  useEffect(() => {
    if (!hasConfirmedRef.current) {
      checkAndConfirmTransaction();
      hasConfirmedRef.current = true; // Marcamos que ya se ha confirmado para evitar repetición
    }
  }, []);
  
  async function checkAndConfirmTransaction() {
    const status = await getTransactionStatus(reference);
    
    if (status !== TransactionStatus.Approved && status !== TransactionStatus.Rejected) {
      const confirmTransactionPayload = createConfirmTransactionPayload(reference, TransactionStatus.Approved);
      await confirmTransaction(confirmTransactionPayload);
    }
    
    // Esperamos 1 segundo para verificar el estado final
    setTimeout(async () => {
      const updatedStatus = await getTransactionStatus(reference);
      setIsAccepted(updatedStatus === TransactionStatus.Approved);
      setLoading(false);
    }, 1000);
  }
  
  clearCart();// borramos el carrito a nivel de local storage
  if(isLoading){
    return <Loader></Loader>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Estado del Pago
          </CardTitle>
          <CardDescription className="text-center">
            El estado actual de tu transacción
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`flex flex-col items-center p-6 rounded-lg ${
            isAccepted ? "bg-green-50" : "bg-red-50"
          }`}>
            {isAccepted ? (
              <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
            ) : (
              <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
            )}
            <h2 className={`text-2xl font-bold mb-2 ${
              isAccepted ? "text-green-700" : "text-red-700"
            }`}>
              {isAccepted ? "Pago Aceptado" : "Pago Rechazado"}
            </h2>
            <p className={`text-center ${
              isAccepted ? "text-green-600" : "text-red-600"
            }`}>
              {isAccepted
                ? "Tu pago ha sido procesado exitosamente."
                : "Lo sentimos, tu pago no pudo ser procesado."}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          <Button asChild>
            <Link href="/" className="flex items-center">
              <HomeIcon className="w-4 h-4 mr-2" />
              Volver a la página principal
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}