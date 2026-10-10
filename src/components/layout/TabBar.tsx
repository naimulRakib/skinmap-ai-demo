"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Camera,
  BookOpen,
  BarChart2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  href: string;
  icon: React.ElementType;
  labelKey: string;
  id: string;
}

const TABS: TabItem[] = [
  { href: "/bn/home", icon: Home, labelKey: "tab.today", id: "tab-home" },
  { href: "/bn/scan", icon: Camera, labelKey: "tab.scan", id: "tab-scan" },
  { href: "/bn/routine", icon: BookOpen, labelKey: "tab.routine", id: "tab-routine" },
  { href: "/bn/progress", icon: BarChart2, labelKey: "tab.progress", id: "tab-progress" },
  { href: "/bn/more", icon: MoreHorizontal, labelKey: "tab.more", id: "tab-more" },
];

export function TabBar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-surface-200"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="tablist"
      aria-label="প্রধান নেভিগেশন"
    >
      <div className="max-w-[390px] mx-auto flex items-center justify-around px-2 h-[68px]">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/bn/more"
              ? false
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.id}
              id={tab.id}
              href={tab.href}
              role="tab"
              aria-selected={isActive}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[48px] min-h-[48px] justify-center",
                "rounded-xl px-3 py-2 transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
                isActive
                  ? "text-teal-DEFAULT"
                  : "text-navy-300 hover:text-navy-700"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                  isActive && "bg-teal-50 shadow-teal-sm"
                )}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={cn(
                    "transition-all duration-200",
                    isActive ? "text-teal-DEFAULT" : "text-navy-400"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-all duration-200 leading-none",
                  isActive ? "text-teal-600 font-semibold" : "text-navy-400"
                )}
              >
                {t(tab.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
