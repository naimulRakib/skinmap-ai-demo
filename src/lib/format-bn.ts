/**
 * Bengali formatting utilities.
 * All user-visible numbers and dates must go through these helpers.
 * Never display raw JavaScript numbers or date strings in the UI.
 */

const BN_LOCALE = "bn-BD";

/**
 * Format a number using Bengali numerals.
 * e.g. 42 → "৪২"
 */
export function formatBnNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(BN_LOCALE, options).format(value);
}

/**
 * Format a percentage with Bengali numeral and % sign.
 * e.g. 75 → "৭৫%"
 */
export function formatBnPercent(value: number): string {
  return new Intl.NumberFormat(BN_LOCALE, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

/**
 * Format a date using Bengali locale.
 * e.g. new Date() → "১০ অক্টোবর ২০২৬"
 */
export function formatBnDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(BN_LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(date);
}

/**
 * Format a time using Bengali locale.
 * e.g. new Date() → "সকাল ১০:৩০"
 */
export function formatBnTime(date: Date): string {
  return new Intl.DateTimeFormat(BN_LOCALE, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Format a relative date (e.g. "৩ দিন আগে").
 */
export function formatBnRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "আজ";
  if (diffDays === 1) return "গতকাল";
  return `${formatBnNumber(diffDays)} দিন আগে`;
}

/**
 * Format temperature with Bengali numeral.
 * e.g. 32 → "৩২°সে"
 */
export function formatBnTemperature(celsius: number): string {
  return `${formatBnNumber(Math.round(celsius))}°সে`;
}

/**
 * Format UV index with Bengali numeral.
 */
export function formatBnUV(uvIndex: number): string {
  return formatBnNumber(Math.round(uvIndex));
}

/**
 * Get Bengali day greeting based on time of day.
 */
export function getBnGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "শুভ সকাল";
  if (hour < 17) return "শুভ দুপুর";
  if (hour < 20) return "শুভ বিকাল";
  return "শুভ সন্ধ্যা";
}
