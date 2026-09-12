"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

interface SceneWrapperProps {
  children: React.ReactNode;
  fadeInStart: number;
  fadeInEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  className?: string;
  stayVisibleAtEnd?: boolean;
}

export default function SceneWrapper({
  children,
  fadeInStart,
  fadeInEnd,
  fadeOutStart,
  fadeOutEnd,
  className = "",
  stayVisibleAtEnd = false,
}: SceneWrapperProps) {
  const { scrollYProgress } = useScroll();
  const { isLowEnd, isReady } = useDeviceDetect();

  // opacity: 0 -> 1 -> 1 -> 0 (or 1 if stayVisibleAtEnd)
  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, stayVisibleAtEnd ? 1 : 0]
  );

  // blur: 12px -> 0px -> 0px -> 12px (reduced from 20px for better low-end device performance)
  // If low end, we completely disable the blur animation to save GPU
  const filter = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    isLowEnd 
      ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"]
      : ["blur(12px)", "blur(0px)", "blur(0px)", stayVisibleAtEnd ? "blur(0px)" : "blur(12px)"]
  );

  // scale: 0.9 -> 1.0 -> 1.0 -> 1.15 (simulates camera moving FORWARD into the scene)
  const scale = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0.9, 1, 1, stayVisibleAtEnd ? 1 : 1.15]
  );

  // Crucial: Disable pointer events, set visibility: hidden, and manage z-index
  // so inactive scenes and their child elements (even with pointer-events-auto) NEVER block clicks on active scenes underneath
  const pointerEvents = useTransform(opacity, (val) => (val > 0.05 ? "auto" : "none"));
  const visibility = useTransform(opacity, (val) => (val > 0.01 ? "visible" : "hidden"));
  const zIndex = useTransform(opacity, (val) => (val > 0.05 ? 20 : 0));

  // Don't render animations until device detection is ready to avoid hydration mismatch flashes
  if (!isReady) return null;

  return (
    <motion.div
      style={{
        opacity,
        filter,
        scale,
        pointerEvents,
        visibility,
        zIndex,
        willChange: "opacity, transform, filter",
        transformOrigin: "center center",
      }}
      className={`absolute inset-0 flex flex-col items-center justify-center translate-z-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
