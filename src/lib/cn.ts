/** Tiny className joiner — filters falsy values. Keeps the bundle lean (no
 *  clsx/tailwind-merge dependency for a site this size). */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
