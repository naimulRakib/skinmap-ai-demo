"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { repository } from "@/adapters/store/repository";
import { decide } from "@/core/decision/engine";
import type { Decision } from "@/db/schema";
import type { EngineResult, DecisionContext } from "@/core/decision/types";
import { clock } from "@/adapters/clock/demo";
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DecisionPage() {
  const t = useTranslations("decision");
  const [decision, setDecision] = useState<Decision | null>(null);
  const [engineResult, setEngineResult] = useState<EngineResult | null>(null);

  useEffect(() => {
    async function runEngine() {
      // 1. Gather context from repository (naive demo calculation)
      const checkIns = await repository.getRecentCheckIns(7);
      const plan = await repository.getRoutinePlan();
      
      const irritationMax7d = checkIns.length > 0 ? Math.max(...checkIns.map(c => c.irritationLevel)) : 0;
      const redFlags = Array.from(new Set(checkIns.flatMap(c => c.redFlags)));
      
      // Calculate adherence (naive: completed steps / expected steps)
      let adherence7d = 1.0;
      if (checkIns.length > 0 && plan) {
        const expectedPerDay = plan.morningSteps.length + plan.eveningSteps.length;
        const totalCompleted = checkIns.reduce((sum, c) => sum + c.completedStepIds.length, 0);
        const totalExpected = checkIns.length * expectedPerDay;
        adherence7d = totalExpected > 0 ? totalCompleted / totalExpected : 1.0;
      }

      const daysSinceRoutineChange = plan ? Math.floor((clock.today().getTime() - new Date(plan.changedAt).getTime()) / (1000 * 60 * 60 * 24)) : 100;

      // Mock visual trend based on persona data or just neutral (0)
      const visualTrend = 0;
      const scanComparable = true;

      const ctx: DecisionContext = {
        adherence7d,
        irritationMax7d,
        redFlags,
        scanComparable,
        visualTrend,
        daysSinceRoutineChange,
        irritationReports7d: checkIns.filter(c => c.irritationLevel > 0).length,
        scanCount14d: 2,
        checkinCount7d: checkIns.length
      };

      // 2. Run deterministic engine
      const result = decide(ctx);
      setEngineResult(result);

      // 3. Save decision
      const profile = await repository.getProfile();
      if (profile) {
        const newDecision: Decision = {
          id: `dec-${Date.now()}`,
          profileId: profile.id,
          decidedAt: clock.today(),
          state: result.state,
          reasons: result.reasons,
          inputsUsed: result.inputsUsed as Decision["inputsUsed"],
          allowedActions: result.allowedActions,
          routineChange: result.routineChange,
          copyKey: result.copyKey,
          source: "rule-derived",
          isSynthetic: false
        };
        await repository.saveDecision(newDecision);
        setDecision(newDecision);
      }
    }
    runEngine();
  }, []);

  if (!decision || !engineResult) {
    return (
      <div className="p-6 flex flex-col gap-4 min-h-[50vh] items-center justify-center">
        <div className="flex gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="text-sm text-navy-400">বিশ্লেষণ করা হচ্ছে...</p>
      </div>
    );
  }

  // Ribbon Styling
  let ribbonConfig = {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-800",
    icon: <CheckCircle2 className="text-teal-600" size={24} />
  };

  if (decision.state.startsWith("AMBER")) {
    ribbonConfig = {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      icon: <AlertTriangle className="text-amber-600" size={24} />
    };
  } else if (decision.state.startsWith("CORAL")) {
    ribbonConfig = {
      bg: "bg-coral-50",
      border: "border-coral-200",
      text: "text-coral-800",
      icon: <ShieldAlert className="text-coral-600" size={24} />
    };
  }

  return (
    <div className="p-6 pb-24">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-navy-900">
          {t("title")}
        </h1>
      </header>

      {/* Decision Ribbon */}
      <div className={cn("p-5 rounded-3xl border shadow-sm mb-8 flex gap-4 items-start", ribbonConfig.bg, ribbonConfig.border)}>
        <div className="shrink-0 mt-1">
          {ribbonConfig.icon}
        </div>
        <div>
          <h2 className={cn("font-bold text-lg mb-1", ribbonConfig.text)}>
            {t(decision.copyKey)}
          </h2>
          <ul className="space-y-1 mt-3">
            {decision.reasons.map((r, i) => (
              <li key={i} className="text-sm opacity-90 flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                {t(r)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Transparency: Inputs Used */}
      <section className="mb-8">
        <h3 className="font-semibold text-navy-900 mb-3 text-sm uppercase tracking-wide">
          কীসের ভিত্তিতে এই সিদ্ধান্ত?
        </h3>
        <div className="bg-white rounded-2xl border border-surface-200 p-4 shadow-sm text-sm">
          <ul className="space-y-2">
            {decision.inputsUsed.map((input, idx) => (
              <li key={idx} className="flex justify-between border-b border-surface-100 last:border-0 pb-2 last:pb-0">
                <span className="text-navy-500 font-mono text-xs">{input.field}</span>
                <span className="font-medium text-navy-900">
                  {typeof input.value === "boolean" ? (input.value ? "হ্যাঁ" : "না") : input.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Actions */}
      <section>
        <h3 className="font-semibold text-navy-900 mb-4">পরবর্তী ধাপ</h3>
        <div className="space-y-3">
          {decision.allowedActions.map((action) => {
            const isEmergency = action === "seek_emergency" || action === "seek_dermatologist";
            
            return (
              <Link
                key={action}
                href={isEmergency ? "/bn/referral" : "/bn/home"}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 font-medium",
                  isEmergency 
                    ? "bg-coral-DEFAULT text-white border-coral-DEFAULT shadow-md"
                    : "bg-white text-navy-900 border-surface-200 hover:border-surface-300 shadow-sm"
                )}
              >
                <span>{t(`actions.${action}`)}</span>
                <ArrowRight size={18} opacity={isEmergency ? 1 : 0.4} />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
