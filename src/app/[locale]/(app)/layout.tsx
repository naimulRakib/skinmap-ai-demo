"use client";

import { useEffect, useCallback } from "react";
import { TabBar } from "@/components/layout/TabBar";
import { DemoBadge } from "@/components/layout/DemoBadge";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { useDemoStore } from "@/store/demo-store";
import { DemoDirector } from "@/components/demo-director/DemoDirector";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * App shell — wraps all (app) routes.
 * Provides:
 *   - Phone frame (desktop), full-screen (mobile)
 *   - Bottom tab bar
 *   - Demo badge (top-right, always visible)
 *   - Demo Director (hidden, press D key or long-press logo to open)
 */
export default function AppLayout({ children }: AppLayoutProps) {
  const { showTalkingPoints, isDemoDirectorOpen, setDemoDirectorOpen } =
    useDemoStore();

  // Toggle Demo Director with D key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.key === "d" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !(document.activeElement instanceof HTMLInputElement) &&
        !(document.activeElement instanceof HTMLTextAreaElement)
      ) {
        setDemoDirectorOpen(!isDemoDirectorOpen);
      }
    },
    [isDemoDirectorOpen, setDemoDirectorOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <PhoneFrame showTalkingPoints={showTalkingPoints}>
      {/* App shell — full height, flex column */}
      <div className="relative flex flex-col h-full bg-surface">
        {/* Demo badge — top right, fixed position inside frame */}
        <div className="absolute top-4 right-4 z-40 pointer-events-none">
          <DemoBadge />
        </div>

        {/* Main content — scrollable, with bottom padding for tab bar */}
        <main
          id="main-content"
          className={cn(
            "flex-1 overflow-y-auto scroll-no-bar",
            "pb-[84px]" // tab bar height + safe area
          )}
        >
          {children}
        </main>

        {/* Bottom tab bar — fixed */}
        <TabBar />

        {/* Demo Director — hidden panel */}
        {isDemoDirectorOpen && (
          <DemoDirector onClose={() => setDemoDirectorOpen(false)} />
        )}
      </div>
    </PhoneFrame>
  );
}
