import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely.
 * Use this for all dynamic className construction.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
