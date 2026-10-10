"use client";

import { useTranslations } from "next-intl";
import { X, Clock, RotateCcw, WifiOff, MessageSquare } from "lucide-react";
import { useDemoStore } from "@/store/demo-store";
import { PERSONA_IDS, type PersonaId } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DemoDirectorProps {
  onClose: () => void;
}

/**
 * Demo Director — hidden control panel for the presenter.
 * Access: press 'D' key or long-press the logo.
 * Honesty: this panel is for demo control only, not a production feature.
 */
export function DemoDirector({ onClose }: DemoDirectorProps) {
  const t = useTranslations("demo.director");
  const {
    activePersonaId,
    isForceOffline,
    showTalkingPoints,
    aiMode,
    timeTravelDays,
    setPersona,
    setForceOffline,
    setShowTalkingPoints,
    advanceDay,
    resetDemo,
  } = useDemoStore();

  const personas: { id: PersonaId; labelKey: string; color: string }[] = [
    { id: PERSONA_IDS.A, labelKey: "personaA", color: "bg-emerald-DEFAULT" },
    { id: PERSONA_IDS.B, labelKey: "personaB", color: "bg-amber-DEFAULT" },
    { id: PERSONA_IDS.C, labelKey: "personaC", color: "bg-coral-DEFAULT" },
  ];

  const aiModeColors = {
    live: "text-emerald-DEFAULT",
    cached: "text-amber-DEFAULT",
    template: "text-coral-DEFAULT",
  };

  return (
    <div className="absolute inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="w-full max-w-sm bg-navy-900 rounded-t-3xl sm:rounded-3xl p-6 border border-navy-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-white font-display font-semibold text-lg">
              {t("title")}
            </h2>
            <p className="text-white/40 text-xs mt-0.5">
              D কী বা লোগো লং-প্রেস
            </p>
          </div>
          <button
            id="demo-director-close"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white/60 hover:text-white hover:bg-navy-700 transition-colors"
            aria-label="Demo Director বন্ধ করুন"
          >
            <X size={18} />
          </button>
        </div>

        {/* AI Status */}
        <div className="mb-4 p-3 bg-navy-800 rounded-2xl">
          <p className="text-white/40 text-xs mb-1">এআই অবস্থা</p>
          <p className={cn("text-sm font-semibold", aiModeColors[aiMode])}>
            {aiMode === "live" && "● লাইভ"}
            {aiMode === "cached" && "○ সংরক্ষিত"}
            {aiMode === "template" && "△ টেমপ্লেট"}
          </p>
          <p className="text-white/30 text-xs mt-0.5">
            সময় ভ্রমণ: +{timeTravelDays} দিন
          </p>
        </div>

        {/* Persona selector */}
        <div className="mb-4">
          <p className="text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
            {t("persona")}
          </p>
          <div className="space-y-2">
            {personas.map((p) => (
              <button
                id={`demo-persona-${p.id}`}
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-200",
                  "text-left text-sm font-medium",
                  activePersonaId === p.id
                    ? "bg-teal-DEFAULT/20 text-teal-400 ring-1 ring-teal-DEFAULT/40"
                    : "bg-navy-800 text-white/70 hover:bg-navy-700"
                )}
              >
                <span className={cn("w-2.5 h-2.5 rounded-full", p.color)} />
                {t(p.labelKey)}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            id="demo-advance-day"
            onClick={advanceDay}
            className="flex items-center gap-2 p-3 bg-navy-800 hover:bg-navy-700 rounded-2xl text-white/70 hover:text-white text-sm transition-colors"
          >
            <Clock size={15} />
            {t("timeTravel")}
          </button>
          <button
            id="demo-reset"
            onClick={() => {
              resetDemo();
              // eslint-disable-next-line @next/next/no-location-assign-relative-destination
              window.location.href = "/bn/onboarding";
            }}
            className="flex items-center gap-2 p-3 bg-navy-800 hover:bg-coral-DEFAULT/20 rounded-2xl text-white/70 hover:text-coral-DEFAULT text-sm transition-colors"
          >
            <RotateCcw size={15} />
            {t("reset")}
          </button>
          <button
            id="demo-force-offline"
            onClick={() => setForceOffline(!isForceOffline)}
            className={cn(
              "flex items-center gap-2 p-3 rounded-2xl text-sm transition-colors",
              isForceOffline
                ? "bg-coral-DEFAULT/20 text-coral-DEFAULT"
                : "bg-navy-800 text-white/70 hover:bg-navy-700 hover:text-white"
            )}
          >
            <WifiOff size={15} />
            {t("forceOffline")}
          </button>
          <button
            id="demo-talking-points"
            onClick={() => setShowTalkingPoints(!showTalkingPoints)}
            className={cn(
              "flex items-center gap-2 p-3 rounded-2xl text-sm transition-colors",
              showTalkingPoints
                ? "bg-teal-DEFAULT/20 text-teal-400"
                : "bg-navy-800 text-white/70 hover:bg-navy-700 hover:text-white"
            )}
          >
            <MessageSquare size={15} />
            {t("talkingPoints")}
          </button>
        </div>

        <p className="text-white/20 text-xs text-center">
          ডেমো কন্ট্রোল প্যানেল — প্রোডাকশনে নেই
        </p>
      </div>
    </div>
  );
}
