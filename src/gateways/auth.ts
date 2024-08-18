'use server'

import axios, { AxiosHeaders } from "axios"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

export async function login(email:string, password:string) {
  var data = JSON.stringify({
    "email": email,
    "password": password
  });

  var config = {
    method: 'post',
    url: 'http://localhost:3001/auth/login',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    data
  };

  const validAcces = await axios(config)
    .then(function (response) {
      console.log(response)
      if(response.data !== 'login successufully'){
        return false
      }
      
      const headers = response.headers as AxiosHeaders
      const setCookieHeader = headers.get("Set-Cookie") as string[];

      if(setCookieHeader){
        const token = setCookieHeader[0].split(";",)[0].split("=")[1];
        console.log(token)
        cookies().set('accessToken',token,{
          secure:false
        })
      }

      return true;

    })
    .catch(function (error) {
      console.error(error)
      return false
    });
  if(!validAcces){
    return false;
  }
  redirect('/')

}