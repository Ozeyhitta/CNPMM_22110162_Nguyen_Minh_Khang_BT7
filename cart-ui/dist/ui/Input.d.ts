import React from "react";
type InputSize = "sm" | "md" | "lg";
type InputType = "text" | "email" | "password" | "number" | "tel" | "url";
interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    type?: InputType;
    size?: InputSize;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    icon?: React.ReactNode;
    className?: string;
    id?: string;
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    onBlur?: () => void;
    onFocus?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export declare const Input: React.FC<InputProps>;
export {};
