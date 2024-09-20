'use server';

import { TransactionPayload } from "@/utils/payment";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createTransaction(transactionPayload: TransactionPayload):Promise<any> {
  
  var config = {
    method: 'post',
    url: 'http://localhost:3001/transaction',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookies().toString(),
    },
    data: JSON.stringify(transactionPayload)
  };
  //return config.data;
  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error
    });
  const transactionNumber = response.value.transaction_number;
  redirect(`payment/status?ref=${transactionNumber}`);
}