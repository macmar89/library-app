import React from "react";

interface IButtonProps {
  variant?: "primary" | "secondary";
  label?: string;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  variant = "primary",
  label,
  onClick,
  disabled,
  className,
}: IButtonProps) => {
  return (
    <button
      className={`transition py-3 px-6 border rounded uppercase tracking-wider cursor-pointer ${
        variant === "primary" ? "btn-primary" : "btn-secondary"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label || 'Potvrdiť'}
    </button>
  );
};
