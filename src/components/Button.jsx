import { ArrowUpRight } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}) {
  const sizeStyle =
    size === "sm"
      ? { padding: "10px 20px", fontSize: "0.825rem" }
      : size === "lg"
      ? { padding: "16px 36px", fontSize: "1rem" }
      : {};

  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`}
      style={sizeStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
      {arrow && (
        <span className="btn-arrow" aria-hidden="true">
          <ArrowUpRight size={15} strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}
