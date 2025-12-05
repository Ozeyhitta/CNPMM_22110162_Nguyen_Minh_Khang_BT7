import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Card } from "../ui";
export const CartItemCard = ({ item, onUpdate, onRemove, loading = false, }) => {
    const totalPrice = item.product.price * item.quantity;
    console.log("CART ITEM PRODUCT:", item.product);
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0 && newQuantity <= 99) {
            onUpdate(item.id, newQuantity);
        }
    };
    return (_jsxs(Card, { className: "p-6", hoverable: true, children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs("div", { className: "w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative", children: [_jsx("img", { src: item.product.image, alt: item.product.name, className: "w-full h-full object-cover absolute inset-0", onError: (e) => {
                                        e.currentTarget.classList.add("hidden");
                                        e.currentTarget
                                            .parentElement.querySelector(".fallback")
                                            .classList.remove("hidden");
                                    } }), _jsx("div", { className: "fallback hidden absolute inset-0 w-full h-full flex items-center justify-center text-gray-400 text-3xl", children: "\uD83D\uDCE6" })] }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h3", { className: "font-semibold text-lg text-gray-900 truncate mb-1", children: item.product.name }), _jsxs("p", { className: "text-blue-600 font-bold text-xl", children: [item.product.price.toLocaleString(), "\u0111"] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleQuantityChange(item.quantity - 1), disabled: item.quantity <= 1 || loading, className: "w-10 h-10 rounded-full p-0 flex items-center justify-center", children: "-" }), _jsx("div", { className: "flex items-center justify-center w-12 h-10 bg-gray-50 rounded-lg border-2 border-gray-200", children: _jsx("span", { className: "font-semibold text-gray-900 text-lg", children: item.quantity }) }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => handleQuantityChange(item.quantity + 1), disabled: item.quantity >= 99 || loading, className: "w-10 h-10 rounded-full p-0 flex items-center justify-center", children: "+" })] }), _jsx(Button, { size: "sm", variant: "danger", onClick: () => onRemove(item.id), disabled: loading, className: "px-4", children: "X\u00F3a" })] }), _jsx("div", { className: "mt-4 pt-4 border-t border-gray-100", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600 font-medium", children: "T\u1ED5ng c\u1ED9ng:" }), _jsxs("span", { className: "text-2xl font-bold text-gray-900", children: [totalPrice.toLocaleString(), "\u0111"] })] }) })] }));
};
