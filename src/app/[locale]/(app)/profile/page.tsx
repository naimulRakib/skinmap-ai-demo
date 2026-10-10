"use client";

import { useTranslations } from "next-intl";
import { useAppStore } from "@/store/app-store";
import { User, MapPin, Target, Droplets, Package, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const { profile } = useAppStore();

  if (!profile) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <p className="text-navy-400">প্রোফাইল পাওয়া যায়নি।</p>
      </div>
    );
  }

  const sections = [
    {
      icon: Target,
      label: "প্রধান লক্ষ্য",
      value: profile.mainConcern,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      icon: Droplets,
      label: "ত্বকের ধরন",
      value: profile.skinTendency === "combination" ? "মিশ্র" : profile.skinTendency === "dry" ? "শুষ্ক" : "তৈলাক্ত",
      color: "text-soft-blue-600",
      bg: "bg-soft-blue-50",
    },
    {
      icon: Sun,
      label: "সানস্ক্রিন ব্যবহারের অভ্যাস",
      value: profile.sunscreenHabit === "daily" ? "প্রতিদিন" : profile.sunscreenHabit === "rarely" ? "মাঝে মাঝে" : "কখনো না",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="font-display text-2xl font-bold text-navy-900 mb-2">
          {t("title")}
        </h1>
      </header>

      {/* Avatar & Basic Info */}
      <div className="flex items-center gap-4 mb-8 bg-white p-5 rounded-3xl shadow-card border border-surface-200">
        <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center shrink-0">
          <User size={32} className="text-teal-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-navy-900 leading-tight">
            {profile.displayName}
          </h2>
          <div className="flex items-center gap-1 text-navy-400 text-sm mt-1">
            <MapPin size={14} />
            <span>
              {profile.cityId === "dhaka" ? "ঢাকা" : profile.cityId === "chittagong" ? "চট্টগ্রাম" : "রাজশাহী"}
            </span>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <h3 className="font-semibold text-navy-900 mb-4">{t("details")}</h3>
      <div className="space-y-3 mb-8">
        {sections.map((sec, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-surface-200">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", sec.bg)}>
              <sec.icon size={20} className={sec.color} />
            </div>
            <div>
              <p className="text-xs text-navy-400">{sec.label}</p>
              <p className="text-sm font-medium text-navy-900">{sec.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Current Products */}
      <h3 className="font-semibold text-navy-900 mb-4">{t("products")}</h3>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-surface-200">
        {profile.currentProducts.length > 0 ? (
          <ul className="space-y-3">
            {profile.currentProducts.map((prod, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <Package size={18} className="text-navy-300" />
                <span className="text-sm text-navy-700">{prod}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-navy-400">কোনো পণ্য যুক্ত করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}
