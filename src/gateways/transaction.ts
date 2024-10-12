'use server';

import { ConfirmTransactionPayload, TransactionPayload } from "@/utils/payment";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createTransaction(transactionPayload: TransactionPayload): Promise<any> {

  var config = {
    method: 'post',
    url: 'http://localhost:3001/transaction',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookies().toString(),
    },
    data: JSON.stringify(transactionPayload)
  };

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

export async function confirmTransaction(confirmTransactionPayload: ConfirmTransactionPayload): Promise<boolean> {
  var config = {
    method: 'post',
    url: 'http://localhost:3001/transaction/webhook',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookies().toString(),
    },
    data: JSON.stringify(confirmTransactionPayload)
  };

  const response = await axios(config)
    .then(function (response) {
      return true
    })
    .catch(function (error) {
      return false
    });

  return response;
}

export async function getTransactionStatus(reference: string): Promise<string> {
  var config = {
    method: 'get',
    url: `http://localhost:3001/transaction?ref=${reference}`,
    headers: {
      'Content-Type': 'application/json',
      cookie: cookies().toString(),
    }
  };

  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error
    });
  const status = response.value.status;
  return status;
}