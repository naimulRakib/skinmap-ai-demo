"use client";

import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  showTalkingPoints?: boolean;
}

/**
 * Desktop phone frame — centers the app in a phone-sized frame on desktop.
 * On mobile (<640px), renders children directly with no frame.
 * On desktop/projector, shows a navy frame with optional talking points panel.
 *
 * Design principle: judges see a phone-in-frame on the projector, not a
 * stretched web app. The talking points help the presenter.
 */
export function PhoneFrame({ children, showTalkingPoints = false }: PhoneFrameProps) {
  return (
    <>
      {/* Mobile: no frame, full screen */}
      <div className="sm:hidden h-full">{children}</div>

      {/* Desktop: centered phone frame */}
      <div className="hidden sm:flex min-h-screen bg-navy-950 items-center justify-center gap-8 p-8">
        {/* Phone frame */}
        <div
          className={cn(
            "relative w-[390px] h-[844px] rounded-[48px] overflow-hidden",
            "ring-[8px] ring-navy-800 shadow-2xl",
            "bg-surface flex flex-col"
          )}
          style={{
            boxShadow:
              "0 0 0 8px #1e293b, 0 32px 80px 0 rgba(0,0,0,0.6), 0 0 80px 0 rgba(19,184,166,0.08)",
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-navy-950 rounded-b-2xl z-10" />
          {/* Content */}
          <div className="flex-1 overflow-hidden pt-7">{children}</div>
        </div>

        {/* Talking points panel (toggle with D key or Demo Director) */}
        {showTalkingPoints && <TalkingPointsPanel />}
      </div>
    </>
  );
}

/**
 * Side panel with presenter talking points — shown on desktop/projector only.
 * Press D or use the Demo Director to toggle.
 */
function TalkingPointsPanel() {

  const points = [
    {
      time: "০-২০ সে",
      text: "সম্মতি ও শহর বেছে নেওয়া — স্বচ্ছতার প্রথম পদক্ষেপ।",
    },
    {
      time: "২০-৭০ সে",
      text: "লাইভ ক্যামেরা: আলোর মান পরীক্ষা হচ্ছে রিয়েল-টাইমে। ছবি নিচ্ছে না — এআই দেখছে।",
    },
    {
      time: "৭০-১০০ সে",
      text: "রুটিন ও আবহাওয়া: বাংলাদেশের প্রেক্ষাপটে ইউভি ও আর্দ্রতা।",
    },
    {
      time: "১০০-১২০ সে",
      text: "টাইম ট্রাভেল → ১৪তম দিন। রুটিন ১৪ দিন ধরে চলে।",
    },
    {
      time: "১২০-১৯০ সে",
      text: "সিদ্ধান্ত ফ্লোচার্ট: সবুজ পারসোনা (ক) → লাল পারসোনা (গ) → বিশেষজ্ঞ হ্যান্ডঅফ।",
    },
    {
      time: "১৯০-২২০ সে",
      text: '"অ্যাপ প্রথমে, হার্ডওয়্যার পরে।" সেন্সর সিমুলেটেড — সৎভাবে লেবেল করা।',
    },
    {
      time: "২২০-২৪০ সে",
      text: "আপনার ত্বক বদলায়। আপনার যত্নও শিখুক।",
    },
  ];

  return (
    <div
      id="talking-points-panel"
      className="w-72 bg-navy-900/90 backdrop-blur-xl rounded-2xl p-5 border border-navy-700 self-center"
    >
      <h2 className="text-white font-display text-sm font-semibold mb-4 opacity-60 uppercase tracking-widest">
        Talking Points
      </h2>
      <ol className="space-y-4">
        {points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-teal-400 text-xs font-mono font-semibold mt-0.5 whitespace-nowrap">
              {point.time}
            </span>
            <p className="text-white/80 text-sm leading-relaxed">{point.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 pt-4 border-t border-navy-700 text-xs text-white/40 text-center">
        D কী চাপুন বা লোগো লং-প্রেস করুন
      </p>
    </div>
  );
}
