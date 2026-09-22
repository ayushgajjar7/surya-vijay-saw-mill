// @ts-nocheck
"use client";

import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaPhone, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "whatsapp"
  | "call"
  | "ghost"
  | "outline";

export type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  "aria-label"?: string;
  type?: "button" | "submit" | "reset";
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
}

interface PureButtonProps extends BaseButtonProps {
  href?: undefined;
}

export type ButtonProps = LinkButtonProps | PureButtonProps;

const variantIconMap: Partial<Record<ButtonVariant, React.ReactNode>> = {
  whatsapp: <FaWhatsapp aria-hidden="true" />,
  call: <FaPhone aria-hidden="true" />,
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className = "",
  disabled = false,
  loading = false,
  target,
  "aria-label": ariaLabel,
  type = "button",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = [
    styles.button,
    styles[`variant--${variant}`],
    styles[`size--${size}`],
    isDisabled ? styles.disabled : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const icon = variantIconMap[variant];

  const innerContent = (
    <>
      {loading ? (
        <span className={styles.spinner} aria-hidden="true">
          <FaSpinner />
        </span>
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      <span className={styles.label}>{children}</span>
    </>
  );

  const motionProps = {
    whileHover: isDisabled ? {} : { y: -2, scale: 1.02 },
    whileTap: isDisabled ? {} : { y: 0, scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("https://wa.me");

    if (isExternal) {
      return (
        <motion.a
          href={isDisabled ? undefined : href}
          target={target ?? (href.startsWith("http") || href.startsWith("https://wa.me") ? "_blank" : undefined)}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={classes}
          aria-label={ariaLabel}
          aria-disabled={isDisabled}
          onClick={isDisabled ? (e) => e.preventDefault() : onClick as React.MouseEventHandler<HTMLAnchorElement>}
          {...motionProps}
        >
          {innerContent}
        </motion.a>
      );
    }

    return (
      <motion.div {...motionProps} style={{ display: "inline-flex" }}>
        <Link
          href={isDisabled ? "#" : href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={classes}
          aria-label={ariaLabel}
          aria-disabled={isDisabled}
          onClick={isDisabled ? (e) => e.preventDefault() : onClick as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {innerContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...motionProps}
    >
      {innerContent}
    </motion.button>
  );
}
