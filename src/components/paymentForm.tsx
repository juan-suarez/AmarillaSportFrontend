import { FormState } from "@/utils/payment";
import Cards, { Focused } from "react-credit-cards-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { InputField } from "./payment";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { CreditCardIcon, DollarSignIcon, WalletCardsIcon } from "./icons/paymentIcons";

interface PaymentFormProps {
  paymentInfo: FormState['paymentInfo'];
  contactInfo: FormState['contactInfo'];
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleInputFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  focused: Focused;
}

export function PaymentForm({
  paymentInfo,
  contactInfo,
  handleInputChange,
  handleInputFocus,
  focused,
}: PaymentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Select your payment method.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <PaymentMethodRadioGroup />
        <Cards
          number={paymentInfo.number}
          expiry={paymentInfo.expiry}
          cvc={paymentInfo.cvc}
          name={contactInfo.name}
          focused={focused}
        />
        <div className="space-y-2 mt-4 mb-4">
          <InputField label="Name" id="name" placeholder="John Doe" value={contactInfo.name} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        <div className="space-y-2 mb-4">
          <InputField label="Card Number" id="number" placeholder="0000 0000 0000 0000" value={paymentInfo.number} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <InputField label="Expiration Date" id="expiry" placeholder="MM/YY" value={paymentInfo.expiry} onChange={handleInputChange} onFocus={handleInputFocus} />
          <InputField label="CVC" id="cvc" placeholder="123" required value={paymentInfo.cvc} onChange={handleInputChange} onFocus={handleInputFocus} />
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentMethodRadioGroup() {
  return (
    <div className="grid gap-6 mb-6">
      <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-6">
        <PaymentMethodOption value="card" label="Credit Card" icon={CreditCardIcon} />
        <PaymentMethodOption value="paypal" label="PayPal" icon={WalletCardsIcon} disabled />
        <PaymentMethodOption value="cash" label="Cash" icon={DollarSignIcon} disabled />
      </RadioGroup>
    </div>
  );
}

interface PaymentMethodOptionProps {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
  disabled?: boolean;
}

function PaymentMethodOption({ value, label, icon: Icon, disabled = false }: PaymentMethodOptionProps) {
  return (
    <div>
      <RadioGroupItem value={value} id={value} className="peer sr-only" disabled={disabled} />
      <Label
        htmlFor={value}
        className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Icon className="mb-3 h-6 w-6" />
        {label}
      </Label>
    </div>
  );
}

