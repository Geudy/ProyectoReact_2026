import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        {...props}
        style={{
          padding: "8px 12px",
          border: error ? "1px solid #e53e3e" : "1px solid #ccc",
          borderRadius: 4,
          outline: "none",
          ...props.style,
        }}
      />
      {error && <span style={{ color: "#e53e3e", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
