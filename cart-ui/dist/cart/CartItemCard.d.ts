import React from "react";
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
export declare const CartItemCard: React.FC<CartItemCardProps>;
export {};
