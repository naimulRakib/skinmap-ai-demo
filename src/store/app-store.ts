import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Profile, Consent } from "@/db/schema";

interface AppState {
  // User profile
  profile: Profile | null;
  consent: Consent | null;

  // Onboarding status
  isOnboarded: boolean;
  hasImageConsent: boolean;

  // City
  selectedCityId: string;

  // Actions
  setProfile: (profile: Profile) => void;
  setConsent: (consent: Consent) => void;
  setOnboarded: (onboarded: boolean) => void;
  setSelectedCity: (cityId: string) => void;
  resetApp: () => void;
}

const initialState = {
  profile: null,
  consent: null,
  isOnboarded: false,
  hasImageConsent: false,
  selectedCityId: "dhaka",
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setProfile: (profile) => set({ profile }),

      setConsent: (consent) =>
        set({
          consent,
          hasImageConsent: consent.imageAnalysis,
        }),

      setOnboarded: (onboarded) => set({ isOnboarded: onboarded }),

      setSelectedCity: (cityId) => set({ selectedCityId: cityId }),

      resetApp: () => set(initialState),
    }),
    {
      name: "skinmap-app-store",
    }
  )
);
