"use client";

import { useTranslations } from "next-intl";
import { UserPlus, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { useAppStore } from "@/store/app-store";

export default function ExpertPage() {
  const t = useTranslations("expert");
  const { profile } = useAppStore();

  return (
    <div className="p-6 pb-24">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
          <Clock size={14} />
          {t("planned")}
        </div>
      </header>

      <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl p-6 text-white shadow-teal mb-8">
        <h2 className="text-xl font-bold mb-2">{t("cta")}</h2>
        <p className="text-teal-100 text-sm mb-6 leading-relaxed">
          {t("demoNote")}
        </p>
        <button className="w-full bg-white text-teal-700 py-3 rounded-xl font-semibold opacity-70 cursor-not-allowed flex items-center justify-center gap-2">
          {t("requestButton")} <ArrowRight size={18} />
        </button>
        <p className="text-center text-teal-200 text-xs mt-3">{t("demoNotActive")}</p>
      </div>

      <h3 className="font-semibold text-navy-900 mb-4">{t("summaryTitle")}</h3>
      <div className="bg-white rounded-2xl shadow-card p-5 border border-surface-200">
        <div className="flex items-start gap-3 mb-4 pb-4 border-b border-surface-100">
          <ShieldCheck size={20} className="text-teal-500 shrink-0 mt-0.5" />
          <p className="text-sm text-navy-600">{t("summaryConsent")}</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs text-navy-400 mb-1">সমস্যা</p>
            <p className="text-sm font-medium text-navy-900">{profile?.mainConcern || "অজানা"}</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 mb-1">সংগৃহীত স্ক্যান</p>
            <p className="text-sm font-medium text-navy-900">২টি ছবি (গত ১৪ দিনে)</p>
          </div>
          <div>
            <p className="text-xs text-navy-400 mb-1">রুটিন মানার হার</p>
            <p className="text-sm font-medium text-navy-900">৮৫%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
