# @khangnguyen1702/cart-ui

Một thư viện React UI component cho chức năng giỏ hàng với GraphQL backend.

## Cài đặt

```bash
npm install @khangnguyen1702/cart-ui
```

## Yêu cầu

- React 18.0+ hoặc 19.0+
- React DOM 18.0+ hoặc 19.0+
- **Tailwind CSS 3.0+** (bắt buộc)

## Cài đặt Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Thêm vào file `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@khangnguyen1702/cart-ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Thêm vào file CSS chính của bạn:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Cách sử dụng

### Import các component

```typescript
import {
  CartList,
  CartItemCard,
  AddToCartButton,
  useCart
} from '@khangnguyen1702/cart-ui';
```

### Sử dụng useCart hook

```typescript
import { useCart } from '@khangnguyen1702/cart-ui';

function MyComponent() {
  const { cart, add, update, removeItem } = useCart('user-id', 'your-api-url');

  return (
    <div>
      <button onClick={() => add('product-id', 1)}>
        Thêm sản phẩm
      </button>
    </div>
  );
}
```

### Sử dụng CartList component

```typescript
import { CartList } from '@khangnguyen1702/cart-ui';

function CartPage() {
  const { cart, update, removeItem } = useCart('user-id');

  return (
    <CartList
      cart={cart}
      onUpdate={update}
      onRemove={removeItem}
      onCheckout={() => console.log('Checkout')}
    />
  );
}
```

### Sử dụng AddToCartButton component

```typescript
import { AddToCartButton } from '@khangnguyen1702/cart-ui';

function ProductCard({ product }) {
  const { add } = useCart('user-id');

  return (
    <div>
      <h3>{product.name}</h3>
      <AddToCartButton
        productId={product.id}
        onAdd={add}
      />
    </div>
  );
}
```

## API Reference

### useCart(userId: string, apiUrl?: string)

Hook chính để quản lý giỏ hàng.

**Parameters:**
- `userId`: ID của user
- `apiUrl`: URL của GraphQL API (mặc định: localhost:4000)

**Returns:**
- `cart`: Object chứa thông tin giỏ hàng
- `add(productId, quantity)`: Hàm thêm sản phẩm vào giỏ
- `update(cartItemId, quantity)`: Hàm cập nhật số lượng
- `removeItem(cartItemId)`: Hàm xóa sản phẩm khỏi giỏ

### CartList Props

```typescript
interface CartListProps {
  cart: Cart | null;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout?: () => void;
  loading?: boolean;
}
```

### CartItemCard Props

```typescript
interface CartItemCardProps {
  item: CartItem;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  loading?: boolean;
}
```

### AddToCartButton Props

```typescript
interface AddToCartButtonProps {
  productId: string;
  onAdd: (id: string) => void;
}
```

## GraphQL Schema

Package này expect backend có GraphQL schema sau:

```graphql
type Query {
  cart(userId: String!): Cart
}

type Mutation {
  addToCart(input: AddToCartInput!): CartItem
  updateCartItem(input: UpdateCartItemInput!): CartItem
  removeCartItem(input: RemoveCartItemInput!): CartItem
}

type Cart {
  id: String!
  userId: String!
  items: [CartItem!]!
  totalQuantity: Int!
  totalPrice: Float!
}

type CartItem {
  id: String!
  quantity: Int!
  lineTotal: Float!
  product: Product!
}

type Product {
  id: String!
  name: String!
  price: Float!
  image: String
}
```

## Styling

Package sử dụng Tailwind CSS classes. Bạn cần cài đặt Tailwind CSS trong project của mình:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## License

MIT
