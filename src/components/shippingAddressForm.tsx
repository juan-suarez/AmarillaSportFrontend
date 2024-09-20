import { FormState } from "@/utils/payment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { InputField } from "./payment";

interface ShippingAddressFormProps {
  formState: FormState['shippingAddress'];
  contactInfo: FormState['contactInfo'];
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function ShippingAddressForm({
  formState,
  contactInfo,
  handleInputChange,
}: ShippingAddressFormProps) {
  return (
    <Card className="mb-2">
      <CardHeader className="items-center">
        <CardTitle>Shipping Address</CardTitle>
        <CardDescription>Enter your address details.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-6 mb-4">
          <InputField label="Address 1" id="address1" placeholder="123 Main St" required value={formState.address1} onChange={handleInputChange} />
          <InputField label="Address 2 (optional)" id="address2" placeholder="Apartment, suite, etc." value={formState.address2} onChange={handleInputChange} />
        </div>
        <div className="grid md:grid-cols-3 xs:grid-cols-1 gap-6 mb-4">
          <InputField label="Country" id="country" placeholder="Colombia" required value={formState.country} onChange={handleInputChange} />
          <InputField label="Region" id="region" placeholder="State, province, etc." required value={formState.region} onChange={handleInputChange} />
          <InputField label="City" id="city" placeholder="San Francisco" required value={formState.city} onChange={handleInputChange} />
        </div>
        <div className="grid md:grid-cols-2 xs:grid-cols-1 gap-6">
          <InputField label="Mobile Phone" id="phone" type="tel" placeholder="+1 (555) 555-5555" required value={contactInfo.phone} onChange={handleInputChange} />
          <InputField label="Zip Code" id="zip" placeholder="12345" value={formState.zip} onChange={handleInputChange} />
        </div>
      </CardContent>
    </Card>
  );
}