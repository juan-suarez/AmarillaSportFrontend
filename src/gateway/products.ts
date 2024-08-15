import axios from "axios";

export class Product {

  async getProducts() {
    const config = {
      method: 'get',
      url: 'http://localhost:3001/products',
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}