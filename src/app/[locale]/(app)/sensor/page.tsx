"use client";

import { useTranslations } from "next-intl";
import { ThermometerSun, Droplets, Info, Activity, TestTube, Droplet } from "lucide-react";
import { useState, useEffect } from "react";

export default function SensorPage() {
  const t = useTranslations("sensor");
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 pb-24">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
        <p className="text-navy-500 text-sm">{t("subtitle")}</p>
      </header>

      {/* Device Card */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-surface-200 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-navy-900">{t("deviceCard")}</h2>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${connecting ? 'bg-amber-400 animate-pulse' : 'bg-teal-500'}`} />
            <span className="text-xs text-navy-400">
              {connecting ? t("connecting") : t("connected")}
            </span>
          </div>
        </div>

        {/* Environmental Data */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-surface-100 rounded-2xl p-4 flex flex-col items-center justify-center">
            <ThermometerSun size={24} className="text-amber-500 mb-2" />
            <span className="text-navy-400 text-xs mb-1">{t("temperature")}</span>
            <span className="text-2xl font-bold text-navy-900">
              {connecting ? "--" : "৩২"}°C
            </span>
          </div>
          <div className="bg-surface-100 rounded-2xl p-4 flex flex-col items-center justify-center">
            <Droplets size={24} className="text-soft-blue-500 mb-2" />
            <span className="text-navy-400 text-xs mb-1">{t("humidity")}</span>
            <span className="text-2xl font-bold text-navy-900">
              {connecting ? "--" : "৭৮"}%
            </span>
          </div>
        </div>

        {/* Skin Specific Data */}
        <h3 className="text-sm font-semibold text-navy-800 mb-3 mt-6">ত্বকের সরাসরি রিডিং</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <TestTube size={20} className="text-teal-500 mb-2" />
            <span className="text-navy-400 text-[10px] mb-1">পিএইচ (pH)</span>
            <span className="text-lg font-bold text-teal-700">
              {connecting ? "--" : "৫.৫"}
            </span>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <Droplet size={20} className="text-amber-500 mb-2" />
            <span className="text-navy-400 text-[10px] mb-1">তৈলাক্ততা (Sebum)</span>
            <span className="text-lg font-bold text-amber-700">
              {connecting ? "--" : "৪০%"}
            </span>
          </div>
          <div className="bg-soft-blue-50/50 border border-soft-blue-100 rounded-2xl p-3 flex flex-col items-center justify-center text-center">
            <Activity size={20} className="text-soft-blue-500 mb-2" />
            <span className="text-navy-400 text-[10px] mb-1">আর্দ্রতা (Hydration)</span>
            <span className="text-lg font-bold text-soft-blue-700">
              {connecting ? "--" : "৬০%"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-soft-blue-50 border border-soft-blue-100 rounded-2xl p-4 flex gap-3 text-sm text-soft-blue-900 mb-6">
        <Info size={20} className="shrink-0 text-soft-blue-600 mt-0.5" />
        <p>{t("disclaimer")} এই ডেমো রিডিংগুলো শুধুমাত্র প্রোটোটাইপের জন্য।</p>
      </div>
      
      <p className="text-center text-xs text-navy-400">{t("hardwareNext")}</p>
    </div>
  );
}
