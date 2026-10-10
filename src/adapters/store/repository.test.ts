import { describe, it, expect, beforeEach } from "vitest";
import { repository } from "./repository";
import { useAppStore } from "@/store/app-store";
import type { PersonaId } from "@/lib/constants";
import { PERSONA_IDS } from "@/lib/constants";

describe("Repository Adapter", () => {
  beforeEach(async () => {
    await repository.resetAllData();
  });

  it("should load Persona A (GREEN_KEEP) correctly", async () => {
    await repository.loadPersona(PERSONA_IDS.A as PersonaId);
    
    // Check Zustand
    const profile = useAppStore.getState().profile;
    expect(profile).not.toBeNull();
    expect(profile?.id).toBe("persona-a");

    // Check memory store
    const scans = await repository.getRecentScans();
    expect(scans.length).toBe(2);

    const checkIns = await repository.getRecentCheckIns();
    expect(checkIns.length).toBe(6);
  });

  it("should load Persona C (CORAL_REVIEW) correctly", async () => {
    await repository.loadPersona(PERSONA_IDS.C as PersonaId);
    
    const profile = useAppStore.getState().profile;
    expect(profile?.id).toBe("persona-c");
    expect(profile?.mainConcern).toBe("প্রচুর ব্রণ ও লালচে ভাব");
  });

  it("should reset all data", async () => {
    await repository.loadPersona(PERSONA_IDS.A as PersonaId);
    await repository.resetAllData();
    
    const profile = useAppStore.getState().profile;
    expect(profile).toBeNull();
    
    const scans = await repository.getRecentScans();
    expect(scans.length).toBe(0);
  });

  it("should export data as JSON", async () => {
    await repository.loadPersona(PERSONA_IDS.B as PersonaId);
    const json = await repository.exportAllData();
    
    const parsed = JSON.parse(json);
    expect(parsed.profile.id).toBe("persona-b");
    expect(parsed.scans.length).toBe(2);
  });
});
