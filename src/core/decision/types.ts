import type { DecisionState, AllowedAction, DataSource } from "@/db/schema";

export interface DecisionContext {
  adherence7d: number; // 0 to 100
  irritationMax7d: number; // 0 to 3
  irritationReports7d: number;
  redFlags: string[];
  scanComparable: boolean;
  scanCount14d: number;
  checkinCount7d: number;
  visualTrend: -1 | 0 | 1; // -1: worse, 0: neutral, 1: better
  daysSinceRoutineChange: number;
}

export interface RuleResult {
  state: DecisionState;
  reasons: string[];
  allowedActions: AllowedAction[];
  routineChange: "none" | "simplify" | "pause";
  copyKey: string;
}

export interface EngineResult extends RuleResult {
  inputsUsed: { field: string; value: any; source: DataSource }[];
}

export interface DecisionRule {
  id: string;
  evaluate: (ctx: DecisionContext) => RuleResult | null;
}
