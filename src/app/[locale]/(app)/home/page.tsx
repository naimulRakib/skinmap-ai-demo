"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/store/app-store";
import { repository } from "@/adapters/store/repository";
import type { RoutinePlan, CheckIn } from "@/db/schema";
import { CheckCircle2, Circle, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatBnDate } from "@/lib/format-bn";

export default function HomePage() {
  const { profile } = useAppStore();
  const [routine, setRoutine] = useState<RoutinePlan | null>(null);
  const [checkIn, setCheckIn] = useState<CheckIn | null>(null);

  useEffect(() => {
    async function loadData() {
      const plan = await repository.getRoutinePlan();
      setRoutine(plan);

      const checkIns = await repository.getRecentCheckIns(1);
      if (checkIns.length > 0) {
        // Just for demo, assume the latest checkin is today's
        setCheckIn(checkIns[0]);
      }
    }
    loadData();
  }, []);

  if (!profile || !routine) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <div className="h-8 w-1/2 bg-surface-200 rounded animate-pulse" />
        <div className="h-32 bg-surface-200 rounded-2xl animate-pulse" />
        <div className="h-48 bg-surface-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  const completedIds = checkIn?.completedStepIds || [];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-1">
          শুভ সকাল, {profile.displayName.split(" ")[0]}
        </h1>
        <p className="text-navy-400 text-sm">{formatBnDate(new Date())}</p>
      </header>

      {/* Progress Widget */}
      <section className="mb-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl p-6 text-white shadow-teal">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-teal-50">আপনার অগ্রগতি</h2>
          <Link href="/bn/progress" className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors">
            বিস্তারিত
          </Link>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-display font-bold">১৪</span>
          <span className="text-teal-100 mb-1">দিন ধরে রুটিন মানছেন</span>
        </div>
      </section>

      {/* Morning Routine */}
      <section className="mb-8">
        <h2 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Sun size={18} className="text-amber-500" /> সকালের রুটিন
        </h2>
        <div className="space-y-3">
          {routine.morningSteps.map((step) => {
            const isDone = completedIds.includes(step.id);
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300",
                  isDone
                    ? "bg-teal-50/50 border-teal-100"
                    : "bg-white border-surface-200 shadow-sm"
                )}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 size={20} className="text-teal-500" />
                  ) : (
                    <Circle size={20} className="text-navy-200" />
                  )}
                </div>
                <div>
                  <h3 className={cn("font-medium", isDone ? "text-teal-900" : "text-navy-900")}>
                    {step.nameBn}
                  </h3>
                  <p className="text-sm text-navy-500 mt-1">{step.whyBn}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Evening Routine */}
      <section className="mb-8">
        <h2 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
          <Moon size={18} className="text-soft-blue-500" /> রাতের রুটিন
        </h2>
        <div className="space-y-3">
          {routine.eveningSteps.map((step) => {
            const isDone = completedIds.includes(step.id);
            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300",
                  isDone
                    ? "bg-teal-50/50 border-teal-100"
                    : "bg-white border-surface-200 shadow-sm"
                )}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 size={20} className="text-teal-500" />
                  ) : (
                    <Circle size={20} className="text-navy-200" />
                  )}
                </div>
                <div>
                  <h3 className={cn("font-medium", isDone ? "text-teal-900" : "text-navy-900")}>
                    {step.nameBn}
                  </h3>
                  <p className="text-sm text-navy-500 mt-1">{step.whyBn}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Check-in CTA */}
      <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 w-full max-w-[390px] px-6 pointer-events-none">
        <Link
          href="/bn/checkin"
          className="pointer-events-auto w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-4 rounded-2xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={18} />
          আজকের রুটিন আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
