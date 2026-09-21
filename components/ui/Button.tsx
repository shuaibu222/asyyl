import type { ReactNode } from "react";
import { site } from "@/content/site";

type ButtonProps = {
  children: ReactNode;
  variant: "primary" | "secondary";
  href: string;
  className?: string;
};

export function Button({ children, variant, href, className = "" }: ButtonProps) {
  const isWhatsApp = href === "whatsapp";
  const resolvedHref = isWhatsApp ? site.contact.whatsappUrl : href;

  return (
    <a
      className={`btn btn-${variant} min-h-11 justify-center ${className}`}
      href={resolvedHref}
      target={isWhatsApp ? "_blank" : undefined}
      rel={isWhatsApp ? "noopener" : undefined}
    >
      {children}
    </a>
  );
}
