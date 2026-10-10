"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { repository } from "@/adapters/store/repository";
import type { Scan, ScanObservation } from "@/db/schema";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";
import { formatBnDate } from "@/lib/format-bn";

export default function ProgressPage() {
  const t = useTranslations("progress");
  const [scans, setScans] = useState<{ scan: Scan; observation: ScanObservation }[]>([]);

  useEffect(() => {
    async function load() {
      // Get the two most recent scans
      const recent = await repository.getRecentScans(2);
      setScans(recent);
    }
    load();
  }, []);

  if (scans.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse w-8 h-8 rounded-full bg-surface-200" />
      </div>
    );
  }

  const current = scans[0];
  const previous = scans[1]; // Might be undefined if only 1 scan exists

  return (
    <div className="p-6 pb-24">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-navy-500 text-sm">
          আপনার ত্বকের পরিবর্তনের একটি ঝলক।
        </p>
      </header>

      {/* Side-by-side comparison */}
      <div className="flex gap-4 mb-8">
        {/* Previous Scan */}
        <div className="flex-1">
          <p className="text-xs font-medium text-navy-400 mb-2 text-center">
            {previous ? formatBnDate(new Date(previous.scan.capturedAt)) : "আগে"}
          </p>
          <div className="aspect-[3/4] bg-surface-200 rounded-2xl relative overflow-hidden flex items-center justify-center border border-surface-200">
            {previous ? (
              <div className="absolute inset-0 bg-navy-100 flex flex-col items-center justify-center text-navy-300">
                <span className="text-sm font-medium">ছবি {previous.scan.id.split("-").pop()}</span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-surface-100 flex items-center justify-center text-navy-300">
                <span className="text-xs text-center px-4">আগের কোনো ছবি নেই</span>
              </div>
            )}
          </div>
        </div>

        {/* Divider / Arrow */}
        <div className="flex flex-col justify-center items-center">
          <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-navy-400 z-10 -mx-4">
            <ArrowLeftRight size={16} />
          </div>
        </div>

        {/* Current Scan */}
        <div className="flex-1">
          <p className="text-xs font-medium text-teal-600 mb-2 text-center">
            {formatBnDate(new Date(current.scan.capturedAt))}
          </p>
          <div className="aspect-[3/4] bg-teal-50 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-teal-200">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-teal-700/50">
               <span className="text-sm font-medium">ছবি {current.scan.id.split("-").pop()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Observations */}
      <section>
        <h2 className="font-semibold text-navy-900 mb-4">সর্বশেষ বিশ্লেষণ</h2>
        <div className="space-y-3">
          {current.observation.regions.map((region, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-surface-200 flex items-start gap-3">
              <div className="mt-0.5">
                <CheckCircle2 size={16} className="text-teal-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-900 capitalize mb-1">
                  {region.name}
                </p>
                <p className="text-xs text-navy-500 leading-relaxed">
                  {region.observations.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
