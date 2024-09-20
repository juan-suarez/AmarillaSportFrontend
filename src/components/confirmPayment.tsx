'use server'

import { TransactionPayload } from "@/utils/payment";
import { Button } from "./ui/button";
import { createTransaction } from "@/gateways/transaction";

interface ConfirmPaymentProps {
  transactionPayload: TransactionPayload
}

export function ConfirmPayment({transactionPayload} : ConfirmPaymentProps ) {
  const paymentProccess = async () => {
    await createTransaction(transactionPayload);
  }

  return <Button className="mt-4" onClick={paymentProccess}>
    Confirmar pago
  </Button>
}