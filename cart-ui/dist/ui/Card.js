import { jsx as _jsx } from "react/jsx-runtime";
const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
};
const variantClasses = {
    default: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white border border-gray-200 shadow-lg",
    outlined: "bg-white border-2 border-gray-300 shadow-none",
};
export const Card = ({ children, variant = "default", padding = "md", className = "", onClick, hoverable = false, }) => {
    const baseClasses = "rounded-xl transition-all duration-200";
    const hoverClasses = hoverable
        ? "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        : "hover:shadow-md";
    const combinedClasses = [
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        hoverClasses,
        onClick ? "cursor-pointer" : "",
        className,
    ].join(" ");
    return (_jsx("div", { className: combinedClasses, onClick: onClick, children: children }));
};
Card.Header = ({ children, className = "" }) => (_jsx("div", { className: `border-b border-gray-200 pb-3 mb-3 ${className}`, children: children }));
Card.Body = ({ children, className = "" }) => (_jsx("div", { className: className, children: children }));
Card.Footer = ({ children, className = "" }) => (_jsx("div", { className: `border-t border-gray-200 pt-3 mt-3 ${className}`, children: children }));
