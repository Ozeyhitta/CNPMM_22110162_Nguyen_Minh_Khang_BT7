import React from "react";
import "./product-card.css";
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
export declare const ProductCard: React.FC<ProductCardProps>;
export {};
