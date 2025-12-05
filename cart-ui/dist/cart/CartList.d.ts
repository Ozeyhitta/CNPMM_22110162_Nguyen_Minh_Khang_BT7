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
export declare const CartList: React.FC<CartListProps>;
export {};
