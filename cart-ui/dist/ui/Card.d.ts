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
export declare const Card: React.FC<CardProps> & {
    Header: React.FC<CardHeaderProps>;
    Body: React.FC<CardBodyProps>;
    Footer: React.FC<CardFooterProps>;
};
export {};
