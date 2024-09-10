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