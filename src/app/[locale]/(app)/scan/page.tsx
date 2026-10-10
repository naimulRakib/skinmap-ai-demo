"use client";

import { useState } from "react";
import { Camera, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const DOT_POSITIONS = [
  { top: 30, left: 40 },
  { top: 50, left: 70 },
  { top: 70, left: 30 },
  { top: 40, left: 60 },
  { top: 60, left: 50 },
];

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState<"ready" | "scanning" | "analyzing" | "done">("ready");

  const handleScan = () => {
    setStep("scanning");
    
    // Simulate scan flash
    setTimeout(() => {
      setStep("analyzing");
    }, 800);

    // Simulate AI analysis time
    setTimeout(() => {
      setStep("done");
      // In a real app we'd redirect to the decision/progress page.
      // For the demo loop, going to progress makes sense.
      router.push("/bn/progress");
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-navy-950 flex flex-col sm:relative sm:h-[844px]">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 bg-gradient-to-b from-navy-950/80 to-transparent pb-10">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white"
        >
          <X size={20} />
        </button>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full">
          <Zap size={14} className="text-amber-400" />
          <span className="text-white text-xs font-medium">আলো ঠিক আছে</span>
        </div>
      </div>

      {/* Viewfinder (Fake Camera) */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {/* Fake camera feed background */}
        <div className={cn(
          "absolute inset-0 bg-navy-800 transition-all duration-300",
          step === "scanning" ? "bg-white" : ""
        )} />
        
        {/* Face oval guide */}
        <div className="relative z-10 w-64 h-80 rounded-[100px] border-2 border-white/40 border-dashed flex items-center justify-center">
          {step === "ready" && (
            <p className="text-white/60 text-sm text-center px-4">
              আপনার মুখ এই ডিম্বাকৃতির ভেতরে রাখুন
            </p>
          )}

          {/* Analysis Dots */}
          {step === "analyzing" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {DOT_POSITIONS.map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-teal-400 rounded-full animate-ping"
                    style={{
                      top: `${pos.top}%`,
                      left: `${pos.left}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scanning line animation */}
        {step === "analyzing" && (
          <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_#2dd4bf] animate-[scan_2s_ease-in-out_infinite]" />
        )}
      </div>

      {/* Controls */}
      <div className="h-40 bg-navy-950 flex flex-col items-center justify-center px-6 pb-safe">
        {step === "ready" ? (
          <button
            onClick={handleScan}
            className="w-20 h-20 rounded-full bg-white/20 p-2 transition-transform active:scale-95"
          >
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-lg">
              <Camera size={32} className="text-navy-900" />
            </div>
          </button>
        ) : (
          <div className="text-center">
            <div className="flex gap-2 justify-center mb-3">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-white font-medium text-sm">
              ত্বকের অবস্থা বিশ্লেষণ করা হচ্ছে...
            </p>
            <p className="text-white/40 text-xs mt-1">এটি আপনার ডিভাইসেই হচ্ছে</p>
          </div>
        )}
      </div>
    </div>
  );
}
