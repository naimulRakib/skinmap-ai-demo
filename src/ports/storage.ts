import type {
  Profile,
  Consent,
  Scan,
  ScanObservation,
  CheckIn,
  RoutinePlan,
  Decision,
} from "@/db/schema";
import type { PersonaId } from "@/lib/constants";

/**
 * Storage Port — defines how the application interacts with data.
 * The UI and Domain Core only know this interface, not how it's stored.
 */
export interface StoragePort {
  // Initialization & Persona switching
  loadPersona(personaId: PersonaId): Promise<void>;
  resetAllData(): Promise<void>;
  exportAllData(): Promise<string>; // Returns JSON string

  // Profile & Consent
  getProfile(): Promise<Profile | null>;
  saveProfile(profile: Profile): Promise<void>;
  getConsent(): Promise<Consent | null>;
  saveConsent(consent: Consent): Promise<void>;

  // Scans
  saveScan(scan: Scan, observation: ScanObservation): Promise<void>;
  getRecentScans(limit?: number): Promise<{ scan: Scan; observation: ScanObservation }[]>;
  getScanCountSince(date: Date): Promise<number>;

  // Check-ins
  saveCheckIn(checkIn: CheckIn): Promise<void>;
  getRecentCheckIns(limit?: number): Promise<CheckIn[]>;
  getCheckInCountSince(date: Date): Promise<number>;

  // Routine
  getRoutinePlan(): Promise<RoutinePlan | null>;
  saveRoutinePlan(plan: RoutinePlan): Promise<void>;

  // Decisions
  saveDecision(decision: Decision): Promise<void>;
  getLatestDecision(): Promise<Decision | null>;
}
