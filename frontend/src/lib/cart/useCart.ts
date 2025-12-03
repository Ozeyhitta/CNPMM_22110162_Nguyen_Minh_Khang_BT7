import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:4000/";

interface CartItem {
  id: string;
  quantity: number;
  lineTotal: number;
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
  };
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

async function gql(query: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const data = await res.json();
  return data.data;
}

export function useCart(userId: string) {
  const [cart, setCart] = useState<Cart | null>(null);

  const loadCart = useCallback(async () => {
    const r = await gql(`
      query {
        cart(userId: "${userId}") {
          id
          userId
          items {
            id
            quantity
            lineTotal
            product { id name price image}
          }
          totalQuantity
          totalPrice
        }
      }
    `);
    setCart(r.cart);
  }, [userId]);

  async function add(productId: string, qty: number) {
    await gql(`
      mutation {
        addToCart(input: { userId: "${userId}", productId: "${productId}", quantity: ${qty} }) {
          id
        }
      }
    `);
    loadCart();
  }

  async function update(itemId: string, qty: number) {
    await gql(`
      mutation {
        updateCartItem(input: { cartItemId: "${itemId}", quantity: ${qty} }) {
          id
        }
      }
    `);
    loadCart();
  }

  async function removeItem(itemId: string) {
    await gql(`
      mutation {
        removeCartItem(input: { cartItemId: "${itemId}" }) {
          id
        }
      }
    `);
    loadCart();
  }

  useEffect(() => {
    (async () => {
      await loadCart();
    })();
  }, [loadCart]);

  return { cart, add, update, removeItem };
}
