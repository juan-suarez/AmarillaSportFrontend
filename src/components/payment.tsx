"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { FormState, initialFormState } from "@/utils/payment";
import { ShippingAddressForm } from "./shippingAddressForm";
import { PaymentForm } from "./paymentForm";
import { SubmitButton } from "./submitButton";

export function Payment() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [focused, setFocused] = useState<Focused>('name');

  useEffect(() => {
    const { shippingAddress, contactInfo, paymentInfo } = formState;
    const isValid =
      shippingAddress.address1.trim() !== "" &&
      shippingAddress.country.trim() !== "" &&
      shippingAddress.region.trim() !== "" &&
      shippingAddress.city.trim() !== "" &&
      contactInfo.phone.trim() !== "" &&
      paymentInfo.number.trim() !== "" &&
      paymentInfo.expiry.trim() !== "" &&
      paymentInfo.expiry.trim().length === 5 &&
      paymentInfo.number.trim().length >= 13 &&
      paymentInfo.number.trim().length <= 19 &&
      paymentInfo.cvc.trim().length >= 3 &&
      paymentInfo.cvc.trim().length <= 4 ;
    setIsFormValid(isValid);
  }, [formState]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormState((prevState) => {
      const newState = { ...prevState };
      if (id in newState.shippingAddress) {
        newState.shippingAddress[id as keyof typeof newState.shippingAddress] = value;
      } else if (id in newState.contactInfo) {
        newState.contactInfo[id as keyof typeof newState.contactInfo] = value;
      } else if (id in newState.paymentInfo) {
        newState.paymentInfo[id as keyof typeof newState.paymentInfo] = value;
      }
      return newState;
    });
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(event.target.id as Focused);
  };

  return (
    <div className="grid gap-8 max-w-2xl mx-auto mt-4 mb-4">
      <form >
        <ShippingAddressForm
          formState={formState.shippingAddress}
          contactInfo={formState.contactInfo}
          handleInputChange={handleInputChange}
        />
        <PaymentForm
          paymentInfo={formState.paymentInfo}
          contactInfo={formState.contactInfo}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          focused={focused}
        />
        <SubmitButton 
          isFormValid={isFormValid}
          formState = { formState}
        />
      </form>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  pattern?:string;
  title?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function InputField({ label, id, pattern, ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} pattern={pattern}/>
    </div>
  );
}
