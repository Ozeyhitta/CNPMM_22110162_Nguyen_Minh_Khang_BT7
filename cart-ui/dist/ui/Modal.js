import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import "./modal.css"; // thêm file CSS riêng cho animation
const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
};
export const Modal = ({ open, onClose, children, size = "md", closeOnOverlayClick = true, closeOnEsc = true, showCloseButton = true, }) => {
    // ESC key
    useEffect(() => {
        if (!open || !closeOnEsc)
            return;
        const handler = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, closeOnEsc, onClose]);
    // Disable body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);
    if (!open)
        return null;
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlayClick)
            onClose();
    };
    return (_jsx("div", { className: "modal-overlay", onClick: handleOverlayClick, role: "dialog", "aria-modal": "true", children: _jsxs("div", { className: `modal-container ${sizeClasses[size]}`, children: [showCloseButton && (_jsx("button", { className: "modal-close-btn", onClick: onClose, children: "\u2715" })), children] }) }));
};
// Sub components
Modal.Header = ({ children, className = "" }) => (_jsx("div", { className: `px-6 py-4 border-b border-gray-200 ${className}`, children: _jsx("h2", { className: "text-xl font-semibold text-gray-900", children: children }) }));
Modal.Body = ({ children, className = "" }) => (_jsx("div", { className: `px-6 py-4 overflow-y-auto max-h-[60vh] ${className}`, children: children }));
Modal.Footer = ({ children, className = "" }) => (_jsx("div", { className: `px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`, children: children }));
