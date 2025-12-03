import { gql } from "apollo-server";

export const typeDefs = gql`
  # ===========================
  # Product
  # ===========================
  type Product {
    id: ID!
    name: String!
    price: Int!
    image: String
  }

  input CreateProductInput {
    name: String!
    price: Int!
    image: String
  }

  input UpdateProductInput {
    id: ID!
    name: String
    price: Int
    image: String
  }

  # ===========================
  # Cart
  # ===========================
  type CartItem {
    id: ID!
    product: Product!
    quantity: Int!
    selectedForCheckout: Boolean!
    lineTotal: Int!
  }

  type Cart {
    id: ID!
    userId: ID!
    items: [CartItem!]!
    totalQuantity: Int!
    totalPrice: Int!
    checkoutItems: [CartItem!]!
    checkoutTotalPrice: Int!
  }

  # ===========================
  # Queries
  # ===========================
  type Query {
    products: [Product!]!
    product(id: ID!): Product

    cart(userId: ID!): Cart
  }

  # ===========================
  # Cart Inputs
  # ===========================
  input AddToCartInput {
    userId: ID!
    productId: ID!
    quantity: Int!
  }

  input UpdateCartItemInput {
    cartItemId: ID!
    quantity: Int!
  }

  input RemoveCartItemInput {
    cartItemId: ID!
  }

  input SetCartItemSelectionInput {
    cartId: ID!
    itemIds: [ID!]!
    selected: Boolean!
  }

  # ===========================
  # Mutations
  # ===========================
  type Mutation {
    # Product CRUD
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
    clearProducts: Boolean!
    # Cart CRUD
    addToCart(input: AddToCartInput!): Cart!
    updateCartItem(input: UpdateCartItemInput!): Cart!
    removeCartItem(input: RemoveCartItemInput!): Cart!
    clearCart(cartId: ID!): Cart!
    setCartItemSelection(input: SetCartItemSelectionInput!): Cart!
  }
`;
