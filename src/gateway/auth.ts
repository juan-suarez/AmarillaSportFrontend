"user Server";

import axios, { AxiosHeaders } from "axios"
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

export class Auth {

  async login(email: string, password: string) {
    var data = JSON.stringify({
      "email": "juan@suarez.com",
      "password": "juan123"
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

    axios(config)
      .then(function (response) {
        const headers = response.headers as AxiosHeaders
        const setCookieHeader = headers.get("Set-Cookie") as string[];
        const millisecondsToAdd = 60 * 60 * 1000;
        
        if(setCookieHeader){
          const token = setCookieHeader[0].split(";",)[0].split("=")[1];
          console.log(token)
          cookies().set({
            name: "Authorization",
            value: token,
            secure: false,
            httpOnly:true,
            expires:  new Date(Date.now() + millisecondsToAdd)
          })
          
        }
      })
      .catch(function (error) {
        return error
      });

      redirect("");
  }
}