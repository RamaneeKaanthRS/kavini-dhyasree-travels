"use client";

import { useState, useEffect } from "react";

export function useDeviceDetect() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let lowEnd = false;

    // Check CPU cores (e.g. 1-2 cores)
    if (typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      lowEnd = true;
    }

    // Check Device Memory (RAM in GB, e.g. <= 4GB)
    // @ts-expect-error - deviceMemory is not in all TS standard definitions yet
    if (typeof navigator !== "undefined" && navigator.deviceMemory && navigator.deviceMemory <= 4) {
      lowEnd = true;
    }

    // Check if Data Saver is enabled
    // @ts-expect-error - connection is not in all TS standard definitions
    if (typeof navigator !== "undefined" && navigator.connection && navigator.connection.saveData) {
      lowEnd = true;
    }

    setIsLowEnd(lowEnd);
    setIsReady(true);
  }, []);

  return { isLowEnd, isReady };
}

