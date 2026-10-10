import type { RoutineStep } from "@/db/schema";
import blocksData from "@/content/bn/routine-blocks.json";

export interface RoutineBlock {
  id: string;
  nameBn: string;
  whyBn: string;
  source: string;
  status: "draft_review_planned";
}

const ALL_BLOCKS = blocksData as RoutineBlock[];

/**
 * Builds a basic routine plan from approved blocks.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildInitialRoutine(_profileId: string): { morning: RoutineStep[]; evening: RoutineStep[] } {
  // Demo hardcoded logic: AM (Cleanser, Sunscreen), PM (Cleanser, Moisturizer)
  const cleanser = ALL_BLOCKS.find((b) => b.id === "gentle-cleanser")!;
  const sunscreen = ALL_BLOCKS.find((b) => b.id === "sunscreen")!;
  const moisturizer = ALL_BLOCKS.find((b) => b.id === "moisturizer")!;

  return {
    morning: [
      {
        id: "am-1",
        blockId: cleanser.id,
        nameBn: cleanser.nameBn,
        whyBn: cleanser.whyBn,
        order: 1,
        contentSource: cleanser.source,
        contentStatus: cleanser.status,
      },
      {
        id: "am-2",
        blockId: sunscreen.id,
        nameBn: sunscreen.nameBn,
        whyBn: sunscreen.whyBn,
        order: 2,
        contentSource: sunscreen.source,
        contentStatus: sunscreen.status,
      },
    ],
    evening: [
      {
        id: "pm-1",
        blockId: cleanser.id,
        nameBn: cleanser.nameBn,
        whyBn: cleanser.whyBn,
        order: 1,
        contentSource: cleanser.source,
        contentStatus: cleanser.status,
      },
      {
        id: "pm-2",
        blockId: moisturizer.id,
        nameBn: moisturizer.nameBn,
        whyBn: moisturizer.whyBn,
        order: 2,
        contentSource: moisturizer.source,
        contentStatus: moisturizer.status,
      },
    ],
  };
}

export function simplifyRoutine(
  currentMorning: RoutineStep[],
  currentEvening: RoutineStep[]
): { morning: RoutineStep[]; evening: RoutineStep[] } {
  // In demo: simplify removes anything that isn't cleanser/moisturizer/sunscreen
  const safeIds = ["gentle-cleanser", "moisturizer", "sunscreen"];
  return {
    morning: currentMorning.filter((s) => safeIds.includes(s.blockId)),
    evening: currentEvening.filter((s) => safeIds.includes(s.blockId)),
  };
}
