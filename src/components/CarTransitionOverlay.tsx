"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function CarTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isNavigatingRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Prefetch car rental page immediately on mount
  useEffect(() => {
    router.prefetch("/car-rental");
  }, [router]);

  const handleFinish = useCallback(() => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    // Freeze video at current/final frame so it stays covering the screen seamlessly
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // Immediately push to /car-rental while overlay is 100% opaque (NO fading out yet!)
    router.push("/car-rental");

    // Safety fallback: if pathname doesn't update within 3 seconds (e.g. slow connection), fade out gracefully
    fallbackTimerRef.current = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsPlaying(false);
        setIsFadingOut(false);
        isNavigatingRef.current = false;
      }, 350);
    }, 3000);
  }, [router]);

  const startTransition = useCallback(() => {
    if (pathname === "/car-rental" || isPlaying) return;
    isNavigatingRef.current = false;
    setIsFadingOut(false);
    setIsPlaying(true);
  }, [pathname, isPlaying]);

  // Listen for global custom event (from Navbar or BookCarTransition button)
  useEffect(() => {
    const handleGlobalTrigger = () => {
      startTransition();
    };

    window.addEventListener("trigger-car-transition", handleGlobalTrigger);
    return () => {
      window.removeEventListener("trigger-car-transition", handleGlobalTrigger);
    };
  }, [startTransition]);

  // Handle video playback and escape key listener
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.playbackRate = 1.15; // Smooth cinematic transition speed
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented or video failed, navigating directly:", err);
          handleFinish();
        });
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, handleFinish]);

  // When pathname changes to /car-rental and we are navigating, the target page is ready!
  // NOW we smoothly fade out the overlay, revealing the Car Rental page directly without ANY flash of the home page.
  useEffect(() => {
    if (isPlaying && pathname === "/car-rental" && isNavigatingRef.current) {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }

      // Small tick to ensure the new page DOM has painted
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsPlaying(false);
          setIsFadingOut(false);
          isNavigatingRef.current = false;
        }, 350);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, isPlaying]);

  if (!isPlaying) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-350 ease-out pointer-events-auto ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Transition Video */}
      <video
        ref={videoRef}
        src="/three_d_camera/car_transition.mp4"
        playsInline
        muted
        preload="auto"
        onEnded={handleFinish}
        onError={handleFinish}
        className="w-full h-full object-cover select-none"
      />

      {/* Minimalist Top Control Bar with Skip button */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <button
          type="button"
          onClick={handleFinish}
          className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:scale-105"
        >
          <span>Skip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom subtle indicator */}
      <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/70 font-light drop-shadow-md">
          Transitioning to Premium Car Rentals...
        </p>
      </div>
    </div>
  );
}
