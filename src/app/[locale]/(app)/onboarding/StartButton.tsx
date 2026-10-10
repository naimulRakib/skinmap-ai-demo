"use client";

import { useRouter } from "next/navigation";
import { repository } from "@/adapters/store/repository";

export function StartButton() {
  const router = useRouter();

  const handleStart = async () => {
    // Automatically load Persona A (Demo Data) for investors
    await repository.loadPersona("persona-a");
    router.push("/bn/home");
  };

  return (
    <button
      onClick={handleStart}
      id="onboarding-get-started"
      className="w-full max-w-xs bg-teal-DEFAULT hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-chip shadow-teal transition-all duration-200 text-center block"
    >
      শুরু করুন (লোড ডেমো ডেটা)
    </button>
  );
}
