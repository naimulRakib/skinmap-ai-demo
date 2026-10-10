/**
 * App-wide constants.
 * All thresholds used by the decision engine are here with explicit labels
 * marking them as demo hypotheses requiring dermatologist review.
 */

// ── Design tokens (mirrors tailwind.config.ts) ───────────────────────────
export const COLORS = {
  navy: "#101828",
  teal: "#13B8A6",
  surface: "#F8FAFC",
  amber: "#FFB547",
  coral: "#FF7A66",
  green: "#4ADE80",
  softBlue: "#7DB7F0",
} as const;

// ── Decision engine thresholds (DEMO HYPOTHESES — dermatologist review planned) ──
export const DECISION_THRESHOLDS = {
  /** Minimum adherence % to avoid AMBER_CONSISTENCY */
  MIN_ADHERENCE: 60,
  /** Minimum adherence % for GREEN_KEEP */
  GREEN_ADHERENCE: 70,
  /** Max irritation level before CORAL_REVIEW */
  IRRITATION_LEVEL_THRESHOLD: 2,
  /** Min irritation report count before CORAL_REVIEW */
  IRRITATION_REPORTS_THRESHOLD: 2,
  /** Min scans in 14 days for comparability */
  MIN_SCANS_14D: 2,
  /** Min check-ins in 7 days for data sufficiency */
  MIN_CHECKINS_7D: 4,
  /** Days routine cannot change after last change (outside coral) */
  ROUTINE_FREEZE_DAYS: 14,
} as const;

// ── AI / network config ──────────────────────────────────────────────────
export const AI_CONFIG = {
  DESCRIBE_SCAN_TIMEOUT_MS: 8000,
  EXPLAIN_TIMEOUT_MS: 8000,
  CHAT_FIRST_TOKEN_TIMEOUT_MS: 15000,
  MAX_IMAGE_SIZE_PX: 1024,
  MAX_REQUEST_BODY_BYTES: 1_500_000, // 1.5 MB
  CACHE_TTL_MS: 24 * 60 * 60 * 1000, // 24 hours
} as const;

// ── Scan quality thresholds ───────────────────────────────────────────────
export const SCAN_QUALITY = {
  /** Minimum Laplacian variance for "not blurry" */
  MIN_BLUR_SCORE: 100,
  /** Minimum mean brightness (0-255) */
  MIN_BRIGHTNESS: 80,
  /** Maximum mean brightness (0-255) */
  MAX_BRIGHTNESS: 230,
  /** Minimum fraction of frame that face should fill */
  MIN_FACE_FILL: 0.25,
  /** Quality check FPS in web worker */
  CHECK_FPS: 5,
} as const;

// ── Cities for weather ───────────────────────────────────────────────────
export const BANGLADESH_CITIES = [
  { id: "dhaka", nameKey: "cities.dhaka", lat: 23.8103, lon: 90.4125 },
  { id: "chittagong", nameKey: "cities.chittagong", lat: 22.3569, lon: 91.7832 },
  { id: "sylhet", nameKey: "cities.sylhet", lat: 24.8949, lon: 91.8687 },
  { id: "rajshahi", nameKey: "cities.rajshahi", lat: 24.3745, lon: 88.6042 },
  { id: "khulna", nameKey: "cities.khulna", lat: 22.8456, lon: 89.5403 },
  { id: "barishal", nameKey: "cities.barishal", lat: 22.701, lon: 90.3535 },
  { id: "rangpur", nameKey: "cities.rangpur", lat: 25.7439, lon: 89.2752 },
  { id: "mymensingh", nameKey: "cities.mymensingh", lat: 24.7471, lon: 90.4203 },
  { id: "comilla", nameKey: "cities.comilla", lat: 23.4607, lon: 91.1809 },
  { id: "narayanganj", nameKey: "cities.narayanganj", lat: 23.6238, lon: 90.4997 },
] as const;

// ── Persona IDs ──────────────────────────────────────────────────────────
export const PERSONA_IDS = {
  A: "persona-a", // GREEN_KEEP
  B: "persona-b", // AMBER_UNCERTAIN
  C: "persona-c", // CORAL_REVIEW
} as const;

export type PersonaId = (typeof PERSONA_IDS)[keyof typeof PERSONA_IDS];
