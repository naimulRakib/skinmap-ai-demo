import type { DecisionContext, EngineResult } from "./types";
import { RULES } from "./rules";
import { DECISION_THRESHOLDS } from "@/lib/constants";

/**
 * Pure function: evaluates the current context and returns a Decision.
 * No side effects, no API calls.
 */
export function decide(ctx: DecisionContext): EngineResult {
  let matchedResult = null;

  for (const rule of RULES) {
    const res = rule.evaluate(ctx);
    if (res) {
      matchedResult = res;
      break;
    }
  }

  // Fallback (though default-stable should always catch)
  if (!matchedResult) {
    matchedResult = {
      state: "AMBER_STABLE",
      reasons: ["decision.reasons.stable"],
      allowedActions: ["continue_routine"],
      routineChange: "none",
      copyKey: "status.states.AMBER_STABLE",
    };
  }

  // Enforce routine freeze: outside coral states, routine cannot change within 14 days
  if (
    matchedResult.state !== "CORAL_REFER" &&
    matchedResult.state !== "CORAL_REVIEW"
  ) {
    if (ctx.daysSinceRoutineChange < DECISION_THRESHOLDS.ROUTINE_FREEZE_DAYS) {
      matchedResult.routineChange = "none";
    }
  }

  // Provenance tagging for inputs used
  const inputsUsed = [
    { field: "adherence7d", value: ctx.adherence7d, source: "user-reported" as const },
    { field: "irritationMax7d", value: ctx.irritationMax7d, source: "user-reported" as const },
    { field: "redFlags", value: ctx.redFlags.join(", "), source: "user-reported" as const },
    { field: "scanComparable", value: ctx.scanComparable, source: "image-estimated" as const },
    { field: "visualTrend", value: ctx.visualTrend, source: "image-estimated" as const },
  ];

  return {
    ...matchedResult,
    inputsUsed,
  };
}
