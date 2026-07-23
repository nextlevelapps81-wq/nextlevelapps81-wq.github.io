"use client";

import { useSyncExternalStore } from "react";

/** Avoid hydration mismatches without setState in useEffect. */
export function useClientMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
