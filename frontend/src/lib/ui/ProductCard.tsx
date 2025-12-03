import React from "react";
import { Card, Button } from "./";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  loading = false,
}) => {
  return (
    <Card hoverable className="overflow-hidden">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling!.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`w-full h-full flex items-center justify-center text-gray-400 text-4xl ${
            product.image ? "hidden" : ""
          }`}
        >
          📦
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            {product.price.toLocaleString()}đ
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <Button
          fullWidth
          variant="primary"
          onClick={() => onAddToCart(product.id)}
          disabled={loading}
          loading={loading}
        >
          Thêm vào giỏ
        </Button>
      </div>
    </Card>
  );
};
