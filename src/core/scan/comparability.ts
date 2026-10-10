import type { Scan } from "@/db/schema";

/**
 * Checks if two scans are comparable based on metadata.
 * Demands same camera facing and similar lighting.
 */
export function isComparable(scanA: Scan, scanB: Scan): boolean {
  if (scanA.cameraFacing !== scanB.cameraFacing) {
    return false;
  }
  if (scanA.brightnessBucket !== scanB.brightnessBucket) {
    return false;
  }
  // Optional strict check: require same time of day
  // if (scanA.timeOfDay !== scanB.timeOfDay) {
  //   return false;
  // }
  return true;
}
