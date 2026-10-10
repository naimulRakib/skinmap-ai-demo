/**
 * Drizzle ORM schema — entity type definitions.
 *
 * DEMO NOTE: No live database is used. These schemas define the shape of all
 * entities stored in the in-memory Zustand store and seeded JSON files.
 * When adding a real DB (Turso/Postgres), uncomment the table definitions
 * and add the appropriate driver to drizzle.config.ts.
 *
 * Every entity has:
 *   - id: string (UUID)
 *   - createdAt: Date
 *   - source: provenance tag — never blend sources into one "certain" claim
 */

// ── Source/provenance tags ───────────────────────────────────────────────
export type DataSource =
  | "user-reported"   // User typed or selected this value
  | "image-estimated" // Derived from image analysis (low confidence)
  | "external"        // From a third-party API (weather, etc.)
  | "rule-derived";   // Computed by the decision engine

// ── Profile ──────────────────────────────────────────────────────────────
export interface Profile {
  id: string;
  displayName: string;
  mainConcern: string;
  skinTendency: "oily" | "dry" | "combination" | "normal" | "unknown";
  currentProducts: string[];
  sunscreenHabit: "daily" | "sometimes" | "rarely" | "never";
  cityId: string;
  createdAt: Date;
  updatedAt: Date;
  isSynthetic: boolean; // true for demo seed personas
}

// ── Consent ──────────────────────────────────────────────────────────────
export interface Consent {
  id: string;
  profileId: string;
  coreUse: boolean;       // Core app usage
  imageAnalysis: boolean; // Face image analysis (separate switch)
  expertShare: boolean;   // Share with dermatologist (mock in demo)
  updatedAt: Date;
}

// ── Scan ─────────────────────────────────────────────────────────────────
export interface Scan {
  id: string;
  profileId: string;
  capturedAt: Date;
  // Metadata for comparability check
  timeOfDay: "morning" | "afternoon" | "evening" | "night";
  brightnessBucket: "low" | "medium" | "high";
  cameraFacing: "front" | "rear" | "upload";
  isFilterFree: boolean;
  // Blob stored in IndexedDB — never sent to analytics
  thumbnailBlobKey: string | null;
  source: DataSource;
  isSynthetic: boolean;
}

// ── Scan Observation (from AI describe-scan) ─────────────────────────────
export interface ScanObservation {
  id: string;
  scanId: string;
  quality: "ok" | "recapture";
  regions: RegionObservation[];
  notes: string;
  source: "image-estimated"; // Always image-estimated for AI observations
  aiMode: "live" | "cached" | "template";
  createdAt: Date;
}

export interface RegionObservation {
  name: "forehead" | "nose" | "leftCheek" | "rightCheek" | "chin";
  observations: string[]; // Short Bengali phrases like "কিছু দৃশ্যমান লালচে অংশ"
  confidence: "low" | "medium";
  // NOTE: No numeric skin score, hydration%, pH or sebum values exist here.
}

// ── Check-in ─────────────────────────────────────────────────────────────
export interface CheckIn {
  id: string;
  profileId: string;
  date: Date; // Date only (no time — one check-in per day)
  completedStepIds: string[];
  irritationLevel: 0 | 1 | 2 | 3; // 0=none, 3=high
  redFlags: RedFlag[];
  note: string | null;
  source: "user-reported";
  isSynthetic: boolean;
}

export type RedFlag =
  | "swelling"
  | "breathing"
  | "bleeding"
  | "rapidChange"
  | "severePain";

// ── Routine Plan ─────────────────────────────────────────────────────────
export interface RoutinePlan {
  id: string;
  profileId: string;
  morningSteps: RoutineStep[];
  eveningSteps: RoutineStep[];
  createdAt: Date;
  changedAt: Date;
  source: "rule-derived";
  isFrozen: boolean; // true if within 14-day freeze window
}

export interface RoutineStep {
  id: string;
  blockId: string; // references content/bn/routine-blocks.json
  nameBn: string;
  whyBn: string;
  order: number;
  contentSource: string; // citation for the approved block
  contentStatus: "draft_review_planned"; // All demo content is draft
}

// ── Decision ─────────────────────────────────────────────────────────────
export interface Decision {
  id: string;
  profileId: string;
  decidedAt: Date;
  state: DecisionState;
  reasons: string[]; // i18n keys, resolved in UI
  inputsUsed: DecisionInput[];
  allowedActions: AllowedAction[];
  routineChange: "none" | "simplify" | "pause";
  copyKey: string; // i18n key for status ribbon text
  source: "rule-derived";
  isSynthetic: boolean;
}

export type DecisionState =
  | "GREEN_KEEP"
  | "AMBER_UNCERTAIN"
  | "AMBER_CONSISTENCY"
  | "AMBER_STABLE"
  | "CORAL_REVIEW"
  | "CORAL_REFER";

export interface DecisionInput {
  field: string;
  value: number | boolean | string;
  source: DataSource;
}

export type AllowedAction =
  | "continue_routine"
  | "recapture_scan"
  | "improve_consistency"
  | "simplify_routine"
  | "pause_new_products"
  | "seek_dermatologist"
  | "seek_emergency";

// ── Weather Snapshot ─────────────────────────────────────────────────────
export interface WeatherSnapshot {
  id: string;
  profileId: string;
  cityId: string;
  capturedAt: Date;
  temperatureCelsius: number;
  humidityPercent: number; // Air humidity — NOT skin hydration
  uvIndex: number;
  source: "external";
  isFallback: boolean; // true if using cached/default data
}

// ── Sensor Reading (simulated) ────────────────────────────────────────────
export interface SensorReading {
  id: string;
  profileId: string;
  capturedAt: Date;
  temperatureCelsius: number;
  humidityPercent: number; // Air humidity — explicitly NOT skin hydration
  source: "external";
  isSimulated: true; // Always true in demo
  // NOTE: No skin pH, sebum, or hydration percentage fields exist here.
}
