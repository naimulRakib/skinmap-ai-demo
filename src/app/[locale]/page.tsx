import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "স্কিনম্যাপ এআই",
  description: "আপনার ত্বক বদলায়। আপনার যত্নও শিখুক।",
};

// Root page redirects to the Bengali locale
export default function RootPage() {
  redirect("/bn/onboarding");
}
