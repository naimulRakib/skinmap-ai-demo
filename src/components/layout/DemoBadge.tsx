"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * Demo badge — shown on every screen.
 * Required by the honesty checklist: "Demo badge visible on every screen."
 */
export function DemoBadge({ className }: { className?: string }) {
  const t = useTranslations("badge");

  return (
    <div
      id="demo-badge"
      role="status"
      aria-label="ডেমো প্রোটোটাইপ সতর্কতা"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-chip",
        "bg-amber-DEFAULT/10 border border-amber-DEFAULT/30",
        "text-[11px] font-semibold text-amber-dark leading-none",
        className
      )}
    >
      {/* Pulsing dot to draw attention */}
      <span
        className="w-1.5 h-1.5 rounded-full bg-amber-DEFAULT animate-pulse"
        aria-hidden="true"
      />
      {t("demo")}
    </div>
  );
}
