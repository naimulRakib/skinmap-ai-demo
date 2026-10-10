import { BANNED_TERMS } from "./bannedTerms";

export interface GateResult {
  pass: boolean;
  reason?: string;
}

/**
 * Validates AI output against safety rules.
 */
export function validateText(text: string): GateResult {
  if (!text || text.trim().length === 0) {
    return { pass: false, reason: "Empty output" };
  }

  // 1. Check length
  if (text.length > 500) {
    return { pass: false, reason: "Text too long" };
  }

  // 2. Check banned terms
  const lowerText = text.toLowerCase();
  for (const term of BANNED_TERMS) {
    if (lowerText.includes(term.toLowerCase())) {
      return { pass: false, reason: `Contains banned term: ${term}` };
    }
  }

  // 3. Bengali script ratio check (>70%)
  const totalChars = text.replace(/\s+/g, "").length;
  if (totalChars > 0) {
    const bengaliMatch = text.match(/[\u0980-\u09FF]/g);
    const bengaliChars = bengaliMatch ? bengaliMatch.length : 0;
    const ratio = bengaliChars / totalChars;
    if (ratio < 0.7) {
      return { pass: false, reason: "Bengali script ratio below 70%" };
    }
  }

  return { pass: true };
}

/**
 * Helper for validating a full JSON object's string fields.
 */
export function validateObjectStrings(obj: Record<string, any>): GateResult {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      const res = validateText(obj[key]);
      if (!res.pass) {
        return res;
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      const res = validateObjectStrings(obj[key]);
      if (!res.pass) return res;
    }
  }
  return { pass: true };
}
