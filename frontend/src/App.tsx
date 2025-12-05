import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart, CartList, ProductCard } from "./lib";
import { ProductAPI } from "./graphql/product.api";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

function App() {
  const { cart, add, update, removeItem } = useCart("u1");
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  React.useEffect(() => {
    ProductAPI.getAll().then((list) => {
      setProducts(list);
    });
  }, []);

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    try {
      await add(productId, 1);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleCheckout = () => {
    alert(
      "🎉 Cảm ơn bạn đã mua hàng! Đây là demo nên chức năng thanh toán chưa được triển khai."
    );
  };

  const cartItemCount = cart?.items?.length || 0;
  const cartTotal =
    cart?.items?.reduce(
      (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">🛒 TechShop</h1>
            </div>

            {/* Cart Summary in Header */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <span>Giỏ hàng: {cartItemCount} sản phẩm</span>
                {cartItemCount > 0 && (
                  <span className="font-semibold text-blue-600">
                    {cartTotal.toLocaleString()}đ
                  </span>
                )}
              </div>

              {/* Admin Button */}
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                title="Quản lý sản phẩm"
              >
                <span className="animate-spin-slow">⚙️</span>
                <span className="hidden sm:inline">Admin</span>
              </Link>

              {/* Mobile Cart Icon */}
              <div className="sm:hidden relative">
                <div className="p-2 text-gray-600">
                  🛒
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2 min-w-0">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sản phẩm nổi bật
              </h2>
              <p className="text-gray-600">
                Khám phá các sản phẩm công nghệ hàng đầu
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    image:
                      product.image ||
                      "https://placehold.co/300x300?text=" +
                        encodeURIComponent(product.name),
                  }}
                  onAddToCart={handleAddToCart}
                  loading={addingToCart === product.id}
                />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Giỏ hàng
              </h2>

              <div className="min-w-0">
                <CartList
                  cart={cart}
                  onUpdate={update}
                  onRemove={removeItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 TechShop. Dự án demo GraphQL + React.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
