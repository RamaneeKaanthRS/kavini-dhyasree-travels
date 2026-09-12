"use client";

import { useState, useEffect } from "react";

export function useDeviceDetect() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let lowEnd = false;

    // Check CPU cores
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      lowEnd = true;
    }

    // Check Device Memory (RAM)
    // @ts-ignore - deviceMemory is not in all TS standard definitions yet
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
      lowEnd = true;
    }

    // Check if Data Saver is enabled
    // @ts-ignore - connection is not in all TS standard definitions
    if (navigator.connection && navigator.connection.saveData) {
      lowEnd = true;
    }

    setIsLowEnd(lowEnd);
    setIsReady(true);
  }, []);

  return { isLowEnd, isReady };
}
