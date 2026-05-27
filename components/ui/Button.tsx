import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface LinkProps extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

type Props = ButtonProps | LinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900 shadow-sm",
  secondary:
    "bg-grey-100 text-grey-900 hover:bg-grey-200 active:bg-grey-300",
  outline:
    "border-2 border-primary-700 text-primary-700 hover:bg-primary-50 active:bg-primary-100",
  ghost:
    "text-grey-700 hover:bg-grey-100 active:bg-grey-200",
  danger:
    "bg-danger text-white hover:bg-red-600 active:bg-red-700 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md gap-1.5",
  md: "text-sm px-4 py-2.5 rounded-lg gap-2",
  lg: "text-base px-6 py-3 rounded-lg gap-2.5",
};

const baseClasses =
  "inline-flex items-center justify-center font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-600 focus-visible:outline-offset-2 select-none";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className = "",
      children,
      ...rest
    } = props;

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </>
    );

    if ("href" in props && props.href !== undefined) {
      const { href, external, ...linkRest } = props as LinkProps;
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(linkRest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={loading || (rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);
