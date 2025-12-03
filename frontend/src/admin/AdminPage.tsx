import { useEffect, useState } from "react";
import { ProductAPI } from "../graphql/product.api";
import { Button, Input, Card, Modal } from "../lib/ui";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const loadProducts = async () => {
    const res = await ProductAPI.getAll();
    setProducts(res);
  };

  useEffect(() => {
    (async () => {
      await loadProducts();
    })();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setPrice("");
    setImage("");
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setName(p.name);
    setPrice(String(p.price));
    setImage(p.image || "");
    setShowForm(true);
  };

  const submitForm = async () => {
    if (!name || !price) return;

    // Validate image URL if provided
    if (image.trim() && !isValidUrl(image.trim())) {
      alert("URL hình ảnh không hợp lệ!");
      return;
    }

    const imageValue = image.trim() === "" ? undefined : image.trim();

    try {
      if (editing) {
        await ProductAPI.update(
          editing.id,
          name.trim(),
          Number(price),
          imageValue
        );
      } else {
        await ProductAPI.create(name.trim(), Number(price), imageValue);
      }

      setShowForm(false);
      loadProducts();
    } catch (error) {
      alert("Có lỗi xảy ra khi lưu sản phẩm!");
      console.error(error);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const remove = async (id: string) => {
    await ProductAPI.delete(id);
    loadProducts();
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        📦 Admin – Quản lý sản phẩm
      </h1>

      <Button onClick={openCreate} className="mb-6">
        ➕ Thêm sản phẩm
      </Button>

      <Card className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Tên</th>
              <th className="p-2">Giá</th>
              <th className="p-2">Ảnh</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.price.toLocaleString()}đ</td>
                <td className="p-2">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Không có</span>
                  )}
                </td>
                <td className="p-2 space-x-3">
                  <Button onClick={() => openEdit(p)} size="sm">
                    ✏️ Sửa
                  </Button>
                  <Button
                    onClick={() => remove(p.id)}
                    size="sm"
                    variant="danger"
                  >
                    ❌ Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Card className="p-5 w-96 mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            {editing ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}
          </h2>

          <div className="flex flex-col gap-3">
            <Input placeholder="Tên sản phẩm" value={name} onChange={setName} />

            <Input
              placeholder="Giá"
              value={price}
              onChange={setPrice}
              type="number"
            />

            <Input
              placeholder="URL hình ảnh (tùy chọn)"
              value={image}
              onChange={setImage}
            />

            <Button onClick={submitForm}>
              {editing ? "Cập nhật" : "Thêm mới"}
            </Button>

            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Hủy
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
}
