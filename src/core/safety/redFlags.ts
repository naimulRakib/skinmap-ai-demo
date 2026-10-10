import type { RedFlag } from "@/db/schema";

export const RED_FLAGS: { id: RedFlag; labelKey: string }[] = [
  { id: "swelling", labelKey: "checkin.redFlagItems.swelling" },
  { id: "breathing", labelKey: "checkin.redFlagItems.breathing" },
  { id: "bleeding", labelKey: "checkin.redFlagItems.bleeding" },
  { id: "rapidChange", labelKey: "checkin.redFlagItems.rapidChange" },
  { id: "severePain", labelKey: "checkin.redFlagItems.severePain" },
];
