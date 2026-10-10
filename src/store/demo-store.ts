import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersonaId } from "@/lib/constants";
import { PERSONA_IDS } from "@/lib/constants";

interface DemoState {
  // Current demo persona
  activePersonaId: PersonaId;
  // UI state
  showTalkingPoints: boolean;
  isDemoDirectorOpen: boolean;
  isForceOffline: boolean;
  // AI mode indicator
  aiMode: "live" | "cached" | "template";
  // Demo clock offset (days added by time-travel)
  timeTravelDays: number;

  // Actions
  setPersona: (id: PersonaId) => void;
  setShowTalkingPoints: (show: boolean) => void;
  setDemoDirectorOpen: (open: boolean) => void;
  setForceOffline: (offline: boolean) => void;
  setAiMode: (mode: "live" | "cached" | "template") => void;
  advanceDay: () => void;
  resetDemo: () => void;
}

const initialState = {
  activePersonaId: PERSONA_IDS.A as PersonaId,
  showTalkingPoints: false,
  isDemoDirectorOpen: false,
  isForceOffline: false,
  aiMode: "live" as const,
  timeTravelDays: 0,
};

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      ...initialState,

      setPersona: (id) => set({ activePersonaId: id, timeTravelDays: 0 }),

      setShowTalkingPoints: (show) => set({ showTalkingPoints: show }),

      setDemoDirectorOpen: (open) => set({ isDemoDirectorOpen: open }),

      setForceOffline: (offline) => set({ isForceOffline: offline }),

      setAiMode: (mode) => set({ aiMode: mode }),

      advanceDay: () =>
        set((state) => ({ timeTravelDays: state.timeTravelDays + 1 })),

      resetDemo: () => set({ ...initialState }),
    }),
    {
      name: "skinmap-demo-store",
      // Only persist these fields
      partialize: (state) => ({
        activePersonaId: state.activePersonaId,
        isForceOffline: state.isForceOffline,
        timeTravelDays: state.timeTravelDays,
      }),
    }
  )
);
