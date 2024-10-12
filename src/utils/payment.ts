import { CartItem } from "./cart-utils";

export interface FormState {
  shippingAddress: {
    address1: string;
    address2: string;
    country: string;
    region: string;
    city: string;
    zip: string;
  };
  contactInfo: {
    name: string;
    phone: string;
  };
  paymentInfo: {
    number: string;
    expiry: string;
    cvc: string;
  };
}

export const initialFormState: FormState = {
  shippingAddress: {
    address1: "",
    address2: "",
    country: "",
    region: "",
    city: "",
    zip: "",
  },
  contactInfo: {
    name: "",
    phone: "",
  },
  paymentInfo: {
    number: "",
    expiry: "",
    cvc: "",
  },
};

interface ShoppingCartProducts{
  id: number;
  name : string;
  description: string;
  price: number;
  quantity: number;
}

export interface TransactionPayload {
  base_fee: number;
  delivery_fee: number;
  total_amount: number;
  installments: number;
  card_details: {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
  }
  shipping_address_details: {
    address_line_1: string;
    country: string;
    region: string;
    city:string;
    phone_number:string;
  }
  shopping_cart_prodcuts: ShoppingCartProducts[];
}

export const createTransactionPayload = ( 
  formState: FormState,
  baseFee:number,
  deliveryFee: number, 
  totalAmount:number, 
  shoppingCart: Map<number, CartItem> 
): TransactionPayload  => {
  const { paymentInfo, shippingAddress, contactInfo} = formState;
  const { number, cvc, expiry } = paymentInfo;
  const { address1: address_line_1, country, region, city} = shippingAddress;
  const [exp_month, exp_year] = expiry.split("/");
  const shopping_cart_prodcuts: ShoppingCartProducts[] = Array.from(shoppingCart).map(([productId, cartItem])=>{
    const { description, name, price, quantity} = cartItem;

    return {
      id: productId,
      name,
      description,
      price,
      quantity
    }
  })

  return {
    base_fee: baseFee,
    delivery_fee: deliveryFee,
    total_amount: totalAmount,
    installments: 1,
    card_details: {
      card_holder: contactInfo.name,
      cvc,
      number,
      exp_month,
      exp_year
    },
    shipping_address_details: {
      phone_number: contactInfo.phone,
      address_line_1,
      country,
      region,
      city
    },
    shopping_cart_prodcuts
  }
}

export enum TransactionStatus {
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

export const createConfirmTransactionPayload = (reference: string, status: TransactionStatus ): ConfirmTransactionPayload => {
  return {
    data: [{
      reference,
      status
    }]
  }
}

export interface ConfirmTransactionPayload {
  data: ConfirmTransactionData[]
}

interface ConfirmTransactionData{
  reference: string;
  status: TransactionStatus;
}