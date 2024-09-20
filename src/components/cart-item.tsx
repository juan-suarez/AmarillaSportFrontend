type CartItemProps = {
  product: {
    name: string;
    price: number;
    quantity: number;
  }
}

export function CartItem({ product }: CartItemProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
      <img
        src="/placeholder.svg"
        alt={product.name}
        width={64}
        height={64}
        className="rounded-md"
        style={{ aspectRatio: "64/64", objectFit: "cover" }}
      />
      <div>
        <h4 className="font-medium">{product.name}</h4>
        <p className="text-muted-foreground">${product.price * product.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-500">{product.quantity}</span>
      </div>
    </div>
  )
}