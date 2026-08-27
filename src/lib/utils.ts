import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeSpecialCharacters(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

export function formatCPF(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);
  return numbers
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2");
}

export function formatCNPJ(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 14);
  return numbers
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2");
}

export function formatPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);
  if (numbers.length <= 10) {
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
  return numbers
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

const PROTOCOL_PATTERN = /^[a-z][a-z0-9+.-]*:/i;

export function isInternalHref(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

export function normalizeHref(href: string | undefined): string | undefined {
  if (!href) return undefined;

  const trimmed = href.trim();
  if (!trimmed) return undefined;

  if (isInternalHref(trimmed) || PROTOCOL_PATTERN.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}
