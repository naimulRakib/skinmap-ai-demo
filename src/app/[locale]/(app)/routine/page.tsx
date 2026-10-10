"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { repository } from "@/adapters/store/repository";
import type { RoutinePlan } from "@/db/schema";
import { Sun, Moon, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoutinePage() {
  const t = useTranslations("routine");
  const [routine, setRoutine] = useState<RoutinePlan | null>(null);
  const [activeTab, setActiveTab] = useState<"morning" | "evening">("morning");

  useEffect(() => {
    async function load() {
      const plan = await repository.getRoutinePlan();
      setRoutine(plan);
    }
    load();
  }, []);

  if (!routine) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse w-8 h-8 rounded-full bg-surface-200" />
      </div>
    );
  }

  const steps = activeTab === "morning" ? routine.morningSteps : routine.eveningSteps;

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-navy-500 text-sm leading-relaxed">
          আপনার ত্বকের অবস্থা ও আবহাওয়ার ওপর ভিত্তি করে তৈরি।
        </p>
      </header>

      {/* Tabs */}
      <div className="flex bg-surface-100 p-1 rounded-2xl mb-6">
        <button
          onClick={() => setActiveTab("morning")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200",
            activeTab === "morning"
              ? "bg-white text-amber-600 shadow-sm"
              : "text-navy-400 hover:text-navy-600"
          )}
        >
          <Sun size={18} /> সকাল
        </button>
        <button
          onClick={() => setActiveTab("evening")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200",
            activeTab === "evening"
              ? "bg-white text-soft-blue-600 shadow-sm"
              : "text-navy-400 hover:text-navy-600"
          )}
        >
          <Moon size={18} /> রাত
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="bg-white rounded-2xl p-5 shadow-sm border border-surface-200 flex gap-4">
            <div className={cn(
              "w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold",
              activeTab === "morning" ? "bg-amber-100 text-amber-700" : "bg-soft-blue-100 text-soft-blue-700"
            )}>
              {index + 1}
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-1">{step.nameBn}</h3>
              <p className="text-sm text-navy-500 leading-relaxed mb-3">
                {step.whyBn}
              </p>
              
              {step.contentSource === "guidelines" && (
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-surface-100 rounded-md text-[10px] text-navy-400 uppercase tracking-wider">
                  <Info size={12} />
                  <span>গাইডলাইন থেকে</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {steps.length === 0 && (
          <div className="text-center py-10">
            <p className="text-navy-400 text-sm">এই বেলার জন্য কোনো ধাপ নেই।</p>
          </div>
        )}
      </div>

      <p className="mt-8 text-center text-navy-300 text-xs">
        এটি একটি ডেমো প্রোটোটাইপ। সব ডেটা সিন্থেটিক।
      </p>
    </div>
  );
}
