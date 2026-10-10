import { describe, it, expect } from "vitest";
import { decide } from "./engine";
import type { DecisionContext } from "./types";
import { DECISION_THRESHOLDS } from "@/lib/constants";

describe("Decision Engine", () => {
  const baseContext: DecisionContext = {
    adherence7d: 100,
    irritationMax7d: 0,
    irritationReports7d: 0,
    redFlags: [],
    scanComparable: true,
    scanCount14d: 2,
    checkinCount7d: 7,
    visualTrend: 0,
    daysSinceRoutineChange: 20,
  };

  describe("Rule 1: Red Flags (CORAL_REFER)", () => {
    it("should return CORAL_REFER if any red flag is present", () => {
      const result = decide({ ...baseContext, redFlags: ["swelling"] });
      expect(result.state).toBe("CORAL_REFER");
      expect(result.routineChange).toBe("pause");
      expect(result.allowedActions).toContain("seek_emergency");
    });

    it("should return CORAL_REFER for severe pain", () => {
      const result = decide({ ...baseContext, redFlags: ["severePain"] });
      expect(result.state).toBe("CORAL_REFER");
    });

    it("should return CORAL_REFER for multiple red flags", () => {
      const result = decide({ ...baseContext, redFlags: ["swelling", "bleeding"] });
      expect(result.state).toBe("CORAL_REFER");
    });

    it("should prioritize CORAL_REFER over high irritation", () => {
      const result = decide({
        ...baseContext,
        redFlags: ["swelling"],
        irritationMax7d: 3,
      });
      expect(result.state).toBe("CORAL_REFER");
    });
  });

  describe("Rule 2: High Irritation (CORAL_REVIEW)", () => {
    it("should return CORAL_REVIEW if max irritation >= threshold", () => {
      const result = decide({
        ...baseContext,
        irritationMax7d: DECISION_THRESHOLDS.IRRITATION_LEVEL_THRESHOLD,
      });
      expect(result.state).toBe("CORAL_REVIEW");
      expect(result.routineChange).toBe("simplify");
    });

    it("should return CORAL_REVIEW if irritation reports >= threshold", () => {
      const result = decide({
        ...baseContext,
        irritationMax7d: 1, // Below max threshold, but...
        irritationReports7d: DECISION_THRESHOLDS.IRRITATION_REPORTS_THRESHOLD,
      });
      expect(result.state).toBe("CORAL_REVIEW");
    });

    it("should prioritize CORAL_REVIEW over low adherence", () => {
      const result = decide({
        ...baseContext,
        irritationMax7d: 2,
        adherence7d: 10,
      });
      expect(result.state).toBe("CORAL_REVIEW");
    });
  });

  describe("Rule 3: Insufficient Data (AMBER_UNCERTAIN)", () => {
    it("should return AMBER_UNCERTAIN if scan is not comparable", () => {
      const result = decide({ ...baseContext, scanComparable: false });
      expect(result.state).toBe("AMBER_UNCERTAIN");
      expect(result.routineChange).toBe("none"); // Never changes routine
    });

    it("should return AMBER_UNCERTAIN if scanCount < minimum", () => {
      const result = decide({
        ...baseContext,
        scanCount14d: DECISION_THRESHOLDS.MIN_SCANS_14D - 1,
      });
      expect(result.state).toBe("AMBER_UNCERTAIN");
    });

    it("should return AMBER_UNCERTAIN if checkinCount < minimum", () => {
      const result = decide({
        ...baseContext,
        checkinCount7d: DECISION_THRESHOLDS.MIN_CHECKINS_7D - 1,
      });
      expect(result.state).toBe("AMBER_UNCERTAIN");
    });

    it("should prioritize AMBER_UNCERTAIN over low adherence", () => {
      const result = decide({
        ...baseContext,
        scanComparable: false,
        adherence7d: 10,
      });
      expect(result.state).toBe("AMBER_UNCERTAIN");
    });
  });

  describe("Rule 4: Low Adherence (AMBER_CONSISTENCY)", () => {
    it("should return AMBER_CONSISTENCY if adherence is below threshold", () => {
      const result = decide({
        ...baseContext,
        adherence7d: DECISION_THRESHOLDS.MIN_ADHERENCE - 1,
      });
      expect(result.state).toBe("AMBER_CONSISTENCY");
    });

    it("should prioritize AMBER_CONSISTENCY over stable trend", () => {
      const result = decide({
        ...baseContext,
        adherence7d: DECISION_THRESHOLDS.MIN_ADHERENCE - 1,
        visualTrend: 1,
      });
      expect(result.state).toBe("AMBER_CONSISTENCY");
    });
  });

  describe("Rule 5: Improving and Stable (GREEN_KEEP)", () => {
    it("should return GREEN_KEEP if visualTrend >= 0, adherence >= threshold, and no irritation", () => {
      const result = decide({
        ...baseContext,
        visualTrend: 1, // Improving
        adherence7d: DECISION_THRESHOLDS.GREEN_ADHERENCE,
        irritationMax7d: 0,
      });
      expect(result.state).toBe("GREEN_KEEP");
    });

    it("should return GREEN_KEEP for neutral visual trend if other conditions met", () => {
      const result = decide({
        ...baseContext,
        visualTrend: 0,
        adherence7d: DECISION_THRESHOLDS.GREEN_ADHERENCE,
        irritationMax7d: 0,
      });
      expect(result.state).toBe("GREEN_KEEP");
    });
  });

  describe("Rule 6: Default (AMBER_STABLE)", () => {
    it("should return AMBER_STABLE if no other rules match", () => {
      const result = decide({
        ...baseContext,
        visualTrend: -1, // Getting worse visually, but adherence is ok and no irritation
      });
      expect(result.state).toBe("AMBER_STABLE");
    });
  });

  describe("Routine Freeze Enforcement", () => {
    it("should force routineChange='none' if within freeze window (AMBER_STABLE)", () => {
      const result = decide({
        ...baseContext,
        visualTrend: -1,
        daysSinceRoutineChange: DECISION_THRESHOLDS.ROUTINE_FREEZE_DAYS - 1,
      });
      expect(result.state).toBe("AMBER_STABLE");
      expect(result.routineChange).toBe("none");
    });

    it("should force routineChange='none' if within freeze window (GREEN_KEEP)", () => {
      const result = decide({
        ...baseContext,
        visualTrend: 1,
        daysSinceRoutineChange: DECISION_THRESHOLDS.ROUTINE_FREEZE_DAYS - 1,
      });
      expect(result.state).toBe("GREEN_KEEP");
      expect(result.routineChange).toBe("none");
    });

    it("should allow routineChange='pause' for CORAL_REFER even if within freeze window", () => {
      const result = decide({
        ...baseContext,
        redFlags: ["swelling"],
        daysSinceRoutineChange: 1, // Changed yesterday
      });
      expect(result.state).toBe("CORAL_REFER");
      expect(result.routineChange).toBe("pause");
    });

    it("should allow routineChange='simplify' for CORAL_REVIEW even if within freeze window", () => {
      const result = decide({
        ...baseContext,
        irritationMax7d: 2,
        daysSinceRoutineChange: 1,
      });
      expect(result.state).toBe("CORAL_REVIEW");
      expect(result.routineChange).toBe("simplify");
    });
  });

  describe("Safety Contracts (No Product Added)", () => {
    it("should never return a routineChange that adds a product (red flags)", () => {
      const result = decide({ ...baseContext, redFlags: ["swelling"] });
      expect(result.routineChange).not.toBe("add");
    });

    it("should never return a routineChange that adds a product (high irritation)", () => {
      const result = decide({ ...baseContext, irritationMax7d: 3 });
      expect(result.routineChange).not.toBe("add");
    });

    it("should never return a routineChange that adds a product (insufficient data)", () => {
      const result = decide({ ...baseContext, scanComparable: false });
      expect(result.routineChange).not.toBe("add");
    });

    it("should never return a routineChange that adds a product (low adherence)", () => {
      const result = decide({ ...baseContext, adherence7d: 10 });
      expect(result.routineChange).not.toBe("add");
    });

    it("should never return a routineChange that adds a product (green keep)", () => {
      const result = decide({ ...baseContext, visualTrend: 1 });
      expect(result.routineChange).not.toBe("add");
    });

    it("should never return a routineChange that adds a product (amber stable)", () => {
      const result = decide({ ...baseContext, visualTrend: -1 });
      expect(result.routineChange).not.toBe("add");
    });
  });

  describe("Provenance Tagging", () => {
    it("should include inputsUsed array with correct source tags", () => {
      const result = decide(baseContext);
      expect(result.inputsUsed).toBeDefined();
      
      const adherenceInput = result.inputsUsed.find((i) => i.field === "adherence7d");
      expect(adherenceInput).toBeDefined();
      expect(adherenceInput?.source).toBe("user-reported");

      const trendInput = result.inputsUsed.find((i) => i.field === "visualTrend");
      expect(trendInput).toBeDefined();
      expect(trendInput?.source).toBe("image-estimated");
    });
  });
});
