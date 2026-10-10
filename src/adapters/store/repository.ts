import type { StoragePort } from "@/ports/storage";
import type { PersonaId } from "@/lib/constants";
import type { Profile, Consent, Scan, ScanObservation, CheckIn, RoutinePlan, Decision } from "@/db/schema";
import { useAppStore } from "@/store/app-store";

import personaA from "@/seeds/persona-a.json";
import personaB from "@/seeds/persona-b.json";
import personaC from "@/seeds/persona-c.json";

const SEEDS: Record<string, unknown> = {
  "persona-a": personaA,
  "persona-b": personaB,
  "persona-c": personaC,
};

type SeedData = {
  profile: Profile;
  consent: Consent;
  scans: { scan: Scan; observation: ScanObservation }[];
  checkIns: CheckIn[];
  routinePlan: RoutinePlan;
  decisions: Decision[];
};

// We keep scans, check-ins, decisions in memory purely for the demo session.
// In a real app, these would be in IndexedDB or a remote DB.
class MemoryStorageAdapter implements StoragePort {
  private scans: { scan: Scan; observation: ScanObservation }[] = [];
  private checkIns: CheckIn[] = [];
  private routinePlan: RoutinePlan | null = null;
  private decisions: Decision[] = [];

  async loadPersona(personaId: PersonaId): Promise<void> {
    const data = SEEDS[personaId];
    if (!data) throw new Error(`Seed data not found for ${personaId}`);

    const seed = data as SeedData;
    // Load into Zustand
    useAppStore.getState().setProfile(seed.profile);
    useAppStore.getState().setConsent(seed.consent);
    useAppStore.getState().setOnboarded(true);

    // Load into memory arrays
    this.scans = [...seed.scans];
    this.checkIns = [...seed.checkIns];
    this.routinePlan = seed.routinePlan;
    this.decisions = [...seed.decisions];
  }

  async resetAllData(): Promise<void> {
    useAppStore.getState().resetApp();
    this.scans = [];
    this.checkIns = [];
    this.routinePlan = null;
    this.decisions = [];
  }

  async exportAllData(): Promise<string> {
    const profile = useAppStore.getState().profile;
    const consent = useAppStore.getState().consent;

    const data = {
      profile,
      consent,
      scans: this.scans,
      checkIns: this.checkIns,
      routinePlan: this.routinePlan,
      decisions: this.decisions,
    };
    return JSON.stringify(data, null, 2);
  }

  // Profile & Consent (uses AppStore for persistence)
  async getProfile(): Promise<Profile | null> {
    return useAppStore.getState().profile;
  }
  async saveProfile(profile: Profile): Promise<void> {
    useAppStore.getState().setProfile(profile);
  }
  async getConsent(): Promise<Consent | null> {
    return useAppStore.getState().consent;
  }
  async saveConsent(consent: Consent): Promise<void> {
    useAppStore.getState().setConsent(consent);
  }

  // Scans
  async saveScan(scan: Scan, observation: ScanObservation): Promise<void> {
    this.scans.push({ scan, observation });
  }
  async getRecentScans(limit: number = 10): Promise<{ scan: Scan; observation: ScanObservation }[]> {
    return [...this.scans]
      .sort((a, b) => new Date(b.scan.capturedAt).getTime() - new Date(a.scan.capturedAt).getTime())
      .slice(0, limit);
  }
  async getScanCountSince(date: Date): Promise<number> {
    return this.scans.filter((s) => new Date(s.scan.capturedAt) >= date).length;
  }

  // Check-ins
  async saveCheckIn(checkIn: CheckIn): Promise<void> {
    this.checkIns.push(checkIn);
  }
  async getRecentCheckIns(limit: number = 7): Promise<CheckIn[]> {
    return [...this.checkIns]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
  async getCheckInCountSince(date: Date): Promise<number> {
    return this.checkIns.filter((c) => new Date(c.date) >= date).length;
  }

  // Routine
  async getRoutinePlan(): Promise<RoutinePlan | null> {
    return this.routinePlan;
  }
  async saveRoutinePlan(plan: RoutinePlan): Promise<void> {
    this.routinePlan = plan;
  }

  // Decisions
  async saveDecision(decision: Decision): Promise<void> {
    this.decisions.push(decision);
  }
  async getLatestDecision(): Promise<Decision | null> {
    if (this.decisions.length === 0) return null;
    return [...this.decisions].sort(
      (a, b) => new Date(b.decidedAt).getTime() - new Date(a.decidedAt).getTime()
    )[0];
  }
}

// Singleton export
export const repository = new MemoryStorageAdapter();
