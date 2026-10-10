import type { DecisionRule } from "./types";
import { DECISION_THRESHOLDS } from "@/lib/constants";

/**
 * Ordered rules. The first rule to return a result wins.
 * These thresholds are demo hypotheses and must be labelled for dermatologist review.
 */
export const RULES: DecisionRule[] = [
  {
    id: "red-flag",
    evaluate: (ctx) => {
      if (ctx.redFlags.length > 0) {
        return {
          state: "CORAL_REFER",
          reasons: ["decision.reasons.redFlagDetected"],
          allowedActions: ["seek_emergency", "seek_dermatologist"],
          routineChange: "pause",
          copyKey: "status.states.CORAL_REFER",
        };
      }
      return null;
    },
  },
  {
    id: "high-irritation",
    evaluate: (ctx) => {
      if (
        ctx.irritationMax7d >= DECISION_THRESHOLDS.IRRITATION_LEVEL_THRESHOLD ||
        ctx.irritationReports7d >= DECISION_THRESHOLDS.IRRITATION_REPORTS_THRESHOLD
      ) {
        return {
          state: "CORAL_REVIEW",
          reasons: ["decision.reasons.highIrritation"],
          allowedActions: ["simplify_routine", "seek_dermatologist"],
          routineChange: "simplify",
          copyKey: "status.states.CORAL_REVIEW",
        };
      }
      return null;
    },
  },
  {
    id: "insufficient-data",
    evaluate: (ctx) => {
      if (
        !ctx.scanComparable ||
        ctx.scanCount14d < DECISION_THRESHOLDS.MIN_SCANS_14D ||
        ctx.checkinCount7d < DECISION_THRESHOLDS.MIN_CHECKINS_7D
      ) {
        return {
          state: "AMBER_UNCERTAIN",
          reasons: ["decision.reasons.insufficientData"],
          allowedActions: ["recapture_scan", "continue_routine"],
          routineChange: "none",
          copyKey: "status.states.AMBER_UNCERTAIN",
        };
      }
      return null;
    },
  },
  {
    id: "low-adherence",
    evaluate: (ctx) => {
      if (ctx.adherence7d < DECISION_THRESHOLDS.MIN_ADHERENCE) {
        return {
          state: "AMBER_CONSISTENCY",
          reasons: ["decision.reasons.lowAdherence"],
          allowedActions: ["improve_consistency", "continue_routine"],
          routineChange: "none",
          copyKey: "status.states.AMBER_CONSISTENCY",
        };
      }
      return null;
    },
  },
  {
    id: "improving-stable",
    evaluate: (ctx) => {
      if (
        ctx.visualTrend >= 0 &&
        ctx.adherence7d >= DECISION_THRESHOLDS.GREEN_ADHERENCE &&
        ctx.irritationMax7d === 0
      ) {
        return {
          state: "GREEN_KEEP",
          reasons: ["decision.reasons.stableAndImproving"],
          allowedActions: ["continue_routine"],
          routineChange: "none",
          copyKey: "status.states.GREEN_KEEP",
        };
      }
      return null;
    },
  },
  {
    id: "default-stable",
    evaluate: () => {
      return {
        state: "AMBER_STABLE",
        reasons: ["decision.reasons.stable"],
        allowedActions: ["continue_routine"],
        routineChange: "none",
        copyKey: "status.states.AMBER_STABLE",
      };
    },
  },
];
