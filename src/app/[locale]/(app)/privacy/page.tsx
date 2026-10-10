"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Download, Trash2, Shield, Info } from "lucide-react";
import { repository } from "@/adapters/store/repository";

export default function PrivacyPage() {
  const t = useTranslations("privacy");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  const handleExport = async () => {
    const data = await repository.exportAllData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skinmap-demo-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    if (confirm("আপনি কি নিশ্চিত? সব ডেমো ডেটা মুছে যাবে।")) {
      await repository.resetAllData();
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/bn/onboarding";
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-navy-500 text-sm leading-relaxed">
          {t("subtitle")}
        </p>
      </header>

      {/* Security note */}
      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-8 flex gap-4">
        <Shield className="text-teal-600 shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-teal-900 mb-1">
            লোকাল স্টোরেজ (ডেমো)
          </h3>
          <p className="text-teal-800/80 text-sm leading-relaxed">
            এই ডেমো প্রোটোটাইপে সব ডেটা শুধুমাত্র আপনার ডিভাইসে সংরক্ষিত থাকে। কোনো ডেটা আমাদের সার্ভারে যায় না।
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Export Data */}
        <div className="bg-white rounded-2xl shadow-card p-5 border border-surface-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-navy-900">{t("export.title")}</h3>
              <p className="text-navy-400 text-sm mt-1">{t("export.description")}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-soft-blue-50 flex items-center justify-center text-soft-blue-600">
              <Download size={20} />
            </div>
          </div>
          <button
            onClick={handleExport}
            className="w-full py-3 bg-surface-100 hover:bg-surface-200 text-navy-700 font-medium rounded-xl transition-colors text-sm"
          >
            {t("export.button")}
          </button>
        </div>

        {/* Delete Data */}
        <div className="bg-white rounded-2xl shadow-card p-5 border border-coral-DEFAULT/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-coral-700">{t("delete.title")}</h3>
              <p className="text-navy-400 text-sm mt-1">{t("delete.description")}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-coral-50 flex items-center justify-center text-coral-DEFAULT">
              <Trash2 size={20} />
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="w-full py-3 bg-coral-50 hover:bg-coral-100 text-coral-700 font-medium rounded-xl transition-colors text-sm"
          >
            {t("delete.button")}
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-navy-300 text-xs flex items-center justify-center gap-1">
        <Info size={14} /> ডেমো সেশন আইডি: {sessionId}
      </p>
    </div>
  );
}
