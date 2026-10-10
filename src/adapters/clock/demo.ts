import type { ClockPort } from "@/ports/clock";
import { useDemoStore } from "@/store/demo-store";

/**
 * Demo clock that adds timeTravelDays from the demo store.
 */
export class DemoClock implements ClockPort {
  now(): Date {
    const daysOffset = useDemoStore.getState().timeTravelDays;
    const date = new Date();
    if (daysOffset > 0) {
      date.setDate(date.getDate() + daysOffset);
    }
    return date;
  }

  today(): Date {
    const date = this.now();
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

export const clock = new DemoClock();
