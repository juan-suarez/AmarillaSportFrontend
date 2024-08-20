'use server'

import axios, { AxiosHeaders } from "axios"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { json } from "stream/consumers";

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
      if(response.data !== 'login successufully'){
        return false
      }
      
      const headers = response.headers as AxiosHeaders
      const setCookieHeader = headers.get("Set-Cookie") as string[];

      if(setCookieHeader){
        const decodedToken = decodeURIComponent(setCookieHeader[0].split("=")[1]);
        const token = decodedToken.split(":")[2].split('"')[1]
        cookies().set('accessToken',token,{
          secure:false,
          httpOnly:true
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