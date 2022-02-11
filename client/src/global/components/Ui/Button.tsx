import React from "react";

interface IButtonProps {
  variant?: "primary" | "secondary";
  label: string;
  onClick: any
}

const Button = ({ variant = "primary", label, onClick }: IButtonProps) => {
  return (
    <button
      className={`${variant === "primary" ? "btn-primary" : "btn-secondary"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
