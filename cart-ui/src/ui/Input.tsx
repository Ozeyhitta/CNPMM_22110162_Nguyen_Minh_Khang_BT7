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

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  size = "md",
  disabled = false,
  error,
  required = false,
  icon,
  className = "",
  id,
  name,
  min,
  max,
  step,
  onBlur,
  onFocus,
  onKeyDown,
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = "w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const stateClasses = error
    ? "border-red-300 bg-red-50"
    : "border-gray-300 bg-white hover:border-gray-400";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "";

  const inputClasses = [
    baseClasses,
    sizeClasses[size],
    stateClasses,
    disabledClasses,
    icon ? "pl-10" : "",
    className,
  ].join(" ");

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          name={name || inputId}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          className={inputClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-red-600 flex items-center gap-1"
          role="alert"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
