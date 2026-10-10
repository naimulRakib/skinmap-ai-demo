"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { repository } from "@/adapters/store/repository";
import { clock } from "@/adapters/clock/demo";
import { useAppStore } from "@/store/app-store";
import type { RoutinePlan, RedFlag } from "@/db/schema";
import { RED_FLAGS } from "@/core/safety/redFlags";
import { Check, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckinPage() {
  const t = useTranslations("checkin");
  const router = useRouter();
  const { profile } = useAppStore();
  
  const [routine, setRoutine] = useState<RoutinePlan | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [irritation, setIrritation] = useState(0);
  const [activeRedFlags, setActiveRedFlags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const plan = await repository.getRoutinePlan();
      setRoutine(plan);
    }
    load();
  }, []);

  const toggleStep = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleRedFlag = (id: string) => {
    setActiveRedFlags((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!profile) return;
    setIsSubmitting(true);

    const checkIn = {
      id: `checkin-${Date.now()}`,
      profileId: profile.id,
      date: clock.today(),
      completedStepIds: completedIds,
      irritationLevel: irritation as 0 | 1 | 2 | 3,
      redFlags: activeRedFlags as RedFlag[],
      note: note || null,
      source: "user-reported" as const,
      isSynthetic: false,
    };

    await repository.saveCheckIn(checkIn);
    
    // In demo, we redirect to decision so the engine runs right away
    router.push("/bn/decision");
  };

  if (!routine) return null;

  const allSteps = [...routine.morningSteps, ...routine.eveningSteps];

  return (
    <div className="p-6 pb-24">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-navy-500 text-sm">
          আজকের রুটিন কেমন ছিল?
        </p>
      </header>

      {/* Routine Completion */}
      <section className="mb-8">
        <h2 className="font-semibold text-navy-900 mb-4">{t("routineLabel")}</h2>
        <div className="space-y-3">
          {allSteps.map((step) => {
            const isSelected = completedIds.includes(step.id);
            const isMorning = step.id.startsWith("am-");
            return (
              <button
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left",
                  isSelected
                    ? "bg-teal-50 border-teal-200"
                    : "bg-white border-surface-200"
                )}
              >
                <div>
                  <div className={cn(
                    "text-xs font-medium mb-1",
                    isMorning ? "text-amber-600" : "text-soft-blue-600"
                  )}>
                    {isMorning ? "সকাল" : "রাত"}
                  </div>
                  <div className={cn("font-medium", isSelected ? "text-teal-900" : "text-navy-900")}>
                    {step.nameBn}
                  </div>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  isSelected ? "bg-teal-500 border-teal-500 text-white" : "border-navy-200"
                )}>
                  {isSelected && <Check size={14} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Irritation Level */}
      <section className="mb-8">
        <h2 className="font-semibold text-navy-900 mb-4">{t("irritationLabel")}</h2>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-surface-200">
          <input
            type="range"
            min="0"
            max="3"
            value={irritation}
            onChange={(e) => setIrritation(Number(e.target.value))}
            className="w-full accent-teal-500 mb-4"
          />
          <div className="flex justify-between text-xs font-medium">
            <span className={irritation === 0 ? "text-teal-600" : "text-navy-400"}>{t("irritationLevels.0")}</span>
            <span className={irritation === 1 ? "text-amber-500" : "text-navy-400"}>{t("irritationLevels.1")}</span>
            <span className={irritation === 2 ? "text-coral-500" : "text-navy-400"}>{t("irritationLevels.2")}</span>
            <span className={irritation === 3 ? "text-coral-600" : "text-navy-400"}>{t("irritationLevels.3")}</span>
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="mb-8">
        <h2 className="font-semibold text-coral-600 flex items-center gap-2 mb-4">
          <AlertTriangle size={18} /> {t("redFlagLabel")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {RED_FLAGS.map((flag) => {
            const isActive = activeRedFlags.includes(flag.id);
            return (
              <button
                key={flag.id}
                onClick={() => toggleRedFlag(flag.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                  isActive
                    ? "bg-coral-DEFAULT text-white border-coral-DEFAULT"
                    : "bg-white text-navy-600 border-surface-200 hover:border-coral-200"
                )}
              >
                {t(`redFlagItems.${flag.id}`)}
              </button>
            );
          })}
        </div>
      </section>

      {/* Note */}
      <section className="mb-8">
        <h2 className="font-semibold text-navy-900 mb-4">{t("noteLabel")}</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("notePlaceholder")}
          className="w-full bg-white border border-surface-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[100px] resize-none"
        />
      </section>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-4 rounded-2xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? "সংরক্ষণ করা হচ্ছে..." : "সংরক্ষণ করুন"}
        {!isSubmitting && <ArrowRight size={18} />}
      </button>
    </div>
  );
}
