/**
 * Clock Port — abstracts time so we can time-travel in the demo.
 */
export interface ClockPort {
  now(): Date;
  today(): Date; // Returns date normalized to midnight
}
