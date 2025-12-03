import { IResolvers } from "@graphql-tools/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  selectedForCheckout: boolean;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

let products: Product[] = [];

let carts: Cart[] = [];

let cartAutoId = 1;
let cartItemAutoId = 1;
let productAutoId = 100;

function enrichCart(cart: Cart) {
  const items = cart.items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const lineTotal = product.price * item.quantity;

    return {
      id: item.id,
      product,
      quantity: item.quantity,
      selectedForCheckout: item.selectedForCheckout,
      lineTotal,
    };
  });

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.lineTotal, 0);

  const checkoutItems = items.filter((i) => i.selectedForCheckout);
  const checkoutTotalPrice = checkoutItems.reduce(
    (sum, i) => sum + i.lineTotal,
    0
  );

  return {
    id: cart.id,
    userId: cart.userId,
    items,
    totalQuantity,
    totalPrice,
    checkoutItems,
    checkoutTotalPrice,
  };
}

export const resolvers: IResolvers = {
  Query: {
    // PRODUCT QUERIES
    products: () => products,

    product: (_, { id }) => products.find((p) => p.id === id),

    // CART QUERIES
    cart: (_, { userId }: { userId: string }) => {
      let cart = carts.find((c) => c.userId === userId);

      if (!cart) {
        cart = {
          id: String(cartAutoId++),
          userId,
          items: [],
        };
        carts.push(cart);
      }

      return enrichCart(cart);
    },
  },

  Mutation: {
    // ===============================
    // PRODUCT CRUD
    // ===============================
    createProduct: (_, { input }) => {
      const newProduct: Product = {
        id: "p" + productAutoId++,
        name: input.name,
        price: input.price,
        image: input.image ?? null,
      };

      products.push(newProduct);
      return newProduct;
    },

    updateProduct: (_, { input }) => {
      const product = products.find((p) => p.id === input.id);
      if (!product) throw new Error("Product not found");

      if (input.name !== undefined) product.name = input.name;
      if (input.price !== undefined) product.price = input.price;
      if (input.image !== undefined) product.image = input.image;

      return product;
    },

    deleteProduct: (_, { id }) => {
      const exists = products.some((p) => p.id === id);
      if (!exists) return false;

      products = products.filter((p) => p.id !== id);
      return true;
    },

    clearProducts: () => {
      products = [];
      return true;
    },

    // ===============================
    // CART CRUD
    // ===============================
    addToCart: (_, { input }) => {
      const { userId, productId, quantity } = input;

      let cart = carts.find((c) => c.userId === userId);
      if (!cart) {
        cart = {
          id: String(cartAutoId++),
          userId,
          items: [],
        };
        carts.push(cart);
      }

      let item = cart.items.find((i) => i.productId === productId);

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({
          id: String(cartItemAutoId++),
          productId,
          quantity,
          selectedForCheckout: false,
        });
      }

      return enrichCart(cart);
    },

    updateCartItem: (_, { input }) => {
      const { cartItemId, quantity } = input;

      const cart = carts.find((c) => c.items.some((i) => i.id === cartItemId));
      if (!cart) throw new Error("Cart item not found");

      const item = cart.items.find((i) => i.id === cartItemId)!;

      if (quantity <= 0) {
        cart.items = cart.items.filter((i) => i.id !== cartItemId);
      } else {
        item.quantity = quantity;
      }

      return enrichCart(cart);
    },

    removeCartItem: (_, { input }) => {
      const { cartItemId } = input;

      const cart = carts.find((c) => c.items.some((i) => i.id === cartItemId));
      if (!cart) throw new Error("Cart item not found");

      cart.items = cart.items.filter((i) => i.id !== cartItemId);

      return enrichCart(cart);
    },

    clearCart: (_, { cartId }) => {
      const cart = carts.find((c) => c.id === cartId);
      if (!cart) throw new Error("Cart not found");

      cart.items = [];

      return enrichCart(cart);
    },

    setCartItemSelection: (_, { input }) => {
      const { cartId, itemIds, selected } = input;

      const cart = carts.find((c) => c.id === cartId);
      if (!cart) throw new Error("Cart not found");

      cart.items = cart.items.map((i) =>
        itemIds.includes(i.id) ? { ...i, selectedForCheckout: selected } : i
      );

      return enrichCart(cart);
    },
  },
};
