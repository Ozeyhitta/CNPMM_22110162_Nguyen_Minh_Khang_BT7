import React from "react";
import { Button, Card } from "../ui";

interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  loading?: boolean;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdate,
  onRemove,
  loading = false,
}) => {
  const totalPrice = item.product.price * item.quantity;
  console.log("CART ITEM PRODUCT:", item.product);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      onUpdate(item.id, newQuantity);
    }
  };

  return (
    <Card className="p-6" hoverable>
      {/* Header with Product Image and Name */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                e.currentTarget.classList.add("hidden");
                e.currentTarget
                  .parentElement!.querySelector(".fallback")!
                  .classList.remove("hidden");
              }}
            />

            <div className="fallback hidden absolute inset-0 w-full h-full flex items-center justify-center text-gray-400 text-3xl">
              📦
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">
            {item.product.name}
          </h3>
          <p className="text-blue-600 font-bold text-xl">
            {item.product.price.toLocaleString()}đ
          </p>
        </div>
      </div>

      {/* Quantity Controls and Remove Button */}
      <div className="flex items-center justify-between">
        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1 || loading}
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
          >
            -
          </Button>

          <div className="flex items-center justify-center w-12 h-10 bg-gray-50 rounded-lg border-2 border-gray-200">
            <span className="font-semibold text-gray-900 text-lg">
              {item.quantity}
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= 99 || loading}
            className="w-10 h-10 rounded-full p-0 flex items-center justify-center"
          >
            +
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          size="sm"
          variant="danger"
          onClick={() => onRemove(item.id)}
          disabled={loading}
          className="px-4"
        >
          Xóa
        </Button>
      </div>

      {/* Total Price */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Tổng cộng:</span>
          <span className="text-2xl font-bold text-gray-900">
            {totalPrice.toLocaleString()}đ
          </span>
        </div>
      </div>
    </Card>
  );
};
