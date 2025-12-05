import React from "react";

type CardVariant = "default" | "elevated" | "outlined";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

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

export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
} = ({
  children,
  variant = "default",
  padding = "md",
  className = "",
  onClick,
  hoverable = false,
}) => {
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

  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className = "" }) => (
  <div className={`border-b border-gray-200 pb-3 mb-3 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

Card.Footer = ({ children, className = "" }) => (
  <div className={`border-t border-gray-200 pt-3 mt-3 ${className}`}>
    {children}
  </div>
);
