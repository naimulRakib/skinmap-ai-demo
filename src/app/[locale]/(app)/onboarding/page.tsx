import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("onboarding");
  return { title: t("title") };
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen navy-hero flex flex-col items-center justify-center p-6 text-center">
      {/* Logo / App Name */}
      <div className="mb-8">
        <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-teal">
          <span className="text-3xl">🌿</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-2">
          স্কিনম্যাপ এআই
        </h1>
        <p className="text-teal-300 text-base">
          আপনার ত্বক বদলায়। আপনার যত্নও শিখুক।
        </p>
      </div>

      {/* Demo note */}
      <div className="bg-amber-DEFAULT/10 border border-amber-DEFAULT/20 rounded-2xl p-4 mb-8 max-w-xs text-left">
        <p className="text-amber-DEFAULT text-sm leading-relaxed">
          🔔 এটি একটি ডেমো প্রোটোটাইপ। সব ডেটা সিন্থেটিক ও আপনার ডিভাইসে সংরক্ষিত।
        </p>
      </div>

      {/* CTA */}
      <a
        href="/bn/home"
        id="onboarding-get-started"
        className="w-full max-w-xs bg-teal-DEFAULT hover:bg-teal-600 text-white font-semibold py-4 px-8 rounded-chip shadow-teal transition-all duration-200 text-center block"
      >
        শুরু করুন
      </a>

      <p className="mt-6 text-white/30 text-xs text-center max-w-xs">
        এটি সাধারণ যত্নের পরামর্শ, চিকিৎসা নির্ণয় নয়।
      </p>
    </div>
  );
}
