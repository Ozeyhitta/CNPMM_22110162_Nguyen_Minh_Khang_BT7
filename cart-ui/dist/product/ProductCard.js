import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import "./product-card.css";
export const ProductCard = ({ product, onAddToCart, loading = false, }) => {
    return (_jsxs(Card, { hoverable: true, className: "overflow-hidden", children: [_jsxs("div", { className: "aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 relative", children: [product.image ? (_jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover product-image", onError: (e) => {
                            e.currentTarget.style.display = "none";
                            const fallback = e.currentTarget
                                .nextElementSibling;
                            fallback.classList.remove("hidden");
                        } })) : null, _jsx("div", { className: `fallback-icon ${product.image ? "hidden" : ""}`, children: "\uD83D\uDCE6" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold text-lg text-gray-900 line-clamp-2-custom", children: product.name }), product.description && (_jsx("p", { className: "text-gray-600 text-sm line-clamp-2-custom", children: product.description })), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("span", { className: "text-xl font-bold text-blue-600", children: [product.price.toLocaleString(), "\u0111"] }) })] }), _jsx("div", { className: "mt-4", children: _jsx(Button, { fullWidth: true, variant: "primary", onClick: () => onAddToCart(product.id), disabled: loading, loading: loading, children: "Th\u00EAm v\u00E0o gi\u1ECF" }) })] }));
};
