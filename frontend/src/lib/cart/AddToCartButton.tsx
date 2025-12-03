import { Button } from "../ui";

export const AddToCartButton = ({
  productId,
  onAdd,
}: {
  productId: string;
  onAdd: (id: string) => void;
}) => (
  <Button onClick={() => onAdd(productId)} variant="primary">
    Thêm vào giỏ
  </Button>
);
