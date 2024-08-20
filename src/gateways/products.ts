'use server'

import axios from "axios"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export async function getProducts():Promise<Product[]> {

  var config = {
    method: 'get',
    url: 'http://localhost:3001/products',
    headers: {
      cookie: cookies().toString(),
    }
  };

  const response = await axios(config)
    .then(function (response) {
      return response.data.value;

    })
    .catch(function (error) {
      return null
    });

    if(!response){
      redirect('/login')
    }
    return response;
}