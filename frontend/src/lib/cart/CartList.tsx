import React from "react";
import { CartItemCard } from "./CartItemCard";
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

interface Cart {
  id: string;
  items: CartItem[];
  userId: string;
}

interface CartListProps {
  cart: Cart | null;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout?: () => void;
  loading?: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded" />
        </div>
      </Card>
    ))}
  </div>
);

const EmptyCart: React.FC<{ onBrowseProducts?: () => void }> = ({
  onBrowseProducts,
}) => (
  <Card className="p-8 text-center" variant="elevated">
    <div className="space-y-4">
      <div className="text-6xl">🛒</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Giỏ hàng của bạn đang trống
        </h3>
        <p className="text-gray-600">
          Hãy thêm một số sản phẩm vào giỏ hàng để bắt đầu mua sắm!
        </p>
      </div>
      {onBrowseProducts && (
        <Button onClick={onBrowseProducts} variant="primary">
          Tiếp tục mua sắm
        </Button>
      )}
    </div>
  </Card>
);

const CartSummary: React.FC<{
  items: CartItem[];
  onCheckout?: () => void;
  loading?: boolean;
}> = ({ items, onCheckout, loading }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 500000 ? 0 : 30000; // Free shipping over 500k
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className="p-6" variant="elevated">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Tóm tắt đơn hàng
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Tạm tính ({items.length} sản phẩm)
          </span>
          <span className="font-medium">{subtotal.toLocaleString()}đ</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span
            className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}
          >
            {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Thuế (8%)</span>
          <span className="font-medium">{tax.toLocaleString()}đ</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Tổng cộng</span>
            <span className="text-blue-600">{total.toLocaleString()}đ</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          fullWidth
          size="lg"
          onClick={onCheckout}
          disabled={loading || items.length === 0}
          loading={loading}
        >
          Thanh toán
        </Button>

        {subtotal < 500000 && (
          <p className="text-xs text-gray-500 text-center">
            Mua thêm {(500000 - subtotal).toLocaleString()}đ để được miễn phí
            vận chuyển
          </p>
        )}
      </div>
    </Card>
  );
};

export const CartList: React.FC<CartListProps> = ({
  cart,
  onUpdate,
  onRemove,
  onCheckout,
  loading = false,
}) => {
  if (loading || !cart) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Đang tải giỏ hàng...</span>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-6">
      {/* Cart Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Giỏ hàng ({cart.items.length} sản phẩm)
        </h2>

        {cart.items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onRemove={onRemove}
            loading={loading}
          />
        ))}
      </div>

      {/* Cart Summary */}
      <CartSummary
        items={cart.items}
        onCheckout={onCheckout}
        loading={loading}
      />
    </div>
  );
};
