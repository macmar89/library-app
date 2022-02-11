import React from "react";

interface IButtonProps {
  variant?: "primary" | "secondary";
  label: string;
  onClick?: any;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  variant = "primary",
  label,
  onClick,
  disabled,
  className,
}: IButtonProps) => {
  return (
    <button
      className={`${
        variant === "primary" ? "btn-primary" : "btn-secondary"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
