'use client'

import Link from "next/link"
import { CheckCircleIcon, XCircleIcon, HomeIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PaymentStatus({ status = "accepted" }: { status?: "accepted" | "rejected" }) {
  const isAccepted = status === "accepted"

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