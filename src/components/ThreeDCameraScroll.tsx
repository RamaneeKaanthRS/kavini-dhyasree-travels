"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export interface ThreeDCameraScrollProps {
  /**
   * Which asset sequence to use:
   * - 'full_length': The 839-frame 3D camera flyover (mountains, cottages, luxury room interior)
   * - 'car': The 192-frame car movement sequence (car driving on mountain road)
   */
  sequence?: 'full_length' | 'car';
  /**
   * Start frame index in the sequence (0-based)
   */
  startFrame?: number;
  /**
   * End frame index in the sequence (inclusive, 0-based)
   */
  endFrame?: number;
  /**
   * Initial poster image before canvas loads
   */
  initialPoster?: string;
  /**
   * Custom overlay class name
   */
  overlayClassName?: string;
  /**
   * Whether to show small loading badge
   */
  showProgress?: boolean;
}

export default function ThreeDCameraScroll({
  sequence = 'full_length',
  startFrame = 0,
  endFrame,
  initialPoster,
  overlayClassName = 'bg-gradient-to-b from-black/65 via-black/35 to-black/80',
  showProgress = false,
}: ThreeDCameraScrollProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track whole window scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();

  // Sequence bounds
  const maxAvailableIndex = sequence === 'car' ? 191 : 838;
  const actualEnd = useMemo(() => {
    return endFrame !== undefined ? Math.min(maxAvailableIndex, Math.max(0, endFrame)) : maxAvailableIndex;
  }, [endFrame, maxAvailableIndex]);

  const actualStart = useMemo(() => {
    return Math.max(0, Math.min(startFrame, actualEnd));
  }, [startFrame, actualEnd]);

  const totalFrames = actualEnd - actualStart + 1;

  // Frame URL resolver
  const getFrameSrc = useCallback((f: number) => {
    const indexStr = f.toString().padStart(3, "0");
    if (sequence === 'car') {
      return `/three_d_camera/car_sequence/car_${indexStr}.jpg`;
    }
    return `/three_d_camera/full_length/full_length${indexStr}.png`;
  }, [sequence]);

  const posterSrc = initialPoster || getFrameSrc(actualStart);

  // Track current frame index
  const [currentFrame, setCurrentFrame] = useState(actualStart);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Map of loaded images
  const imagesMapRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const activeFrameRef = useRef(actualStart);
  const loadingSetRef = useRef<Set<number>>(new Set());

  // Helper to draw image covering the canvas (like object-fit: cover) with high resolution & proper framing
  const drawImageCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number, isFirstFrame = false) => {
    const imgRatio = img.width / img.height;
    const canvasRatio = w / h;
    let renderW = w;
    let renderH = h;
    let x = 0;
    let y = 0;

    if (canvasRatio > imgRatio) {
      renderH = w / imgRatio;
      y = isFirstFrame ? (h - renderH) * 0.35 : (h - renderH) / 2;
    } else {
      renderW = h * imgRatio;
      x = (w - renderW) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, x, y, renderW, renderH);
  }, []);

  // Resize canvas to window size with device pixel ratio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    // Redraw current frame
    const ctx = canvas.getContext("2d");
    const img = imagesMapRef.current.get(currentFrame) || imagesMapRef.current.get(actualStart);
    if (ctx && img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageCover(ctx, img, canvas.width, canvas.height, currentFrame === actualStart);
    }
  }, [currentFrame, actualStart, drawImageCover]);

  // Helper to load a single frame on-demand
  const loadSingleFrame = useCallback((i: number): Promise<void> => {
    if (i < actualStart || i > actualEnd) return Promise.resolve();
    if (imagesMapRef.current.has(i) || loadingSetRef.current.has(i)) return Promise.resolve();

    loadingSetRef.current.add(i);
    return new Promise((resolve) => {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        imagesMapRef.current.set(i, img);
        loadingSetRef.current.delete(i);

        // If user is currently near this frame, draw it immediately for instant sharpness
        if (Math.abs(activeFrameRef.current - i) <= 2) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawImageCover(ctx, img, canvas.width, canvas.height, i === actualStart);
          }
        }
        resolve();
      };
      img.onerror = () => {
        loadingSetRef.current.delete(i);
        resolve();
      };
    });
  }, [actualStart, actualEnd, getFrameSrc, drawImageCover]);

  // Preload images progressively in passes
  useEffect(() => {
    let isCancelled = false;

    const loadProgressively = async () => {
      // Pass 0: First 4 frames immediately for instant zero-delay first impression
      const initialFrames: number[] = [];
      for (let f = actualStart; f <= Math.min(actualStart + 4, actualEnd); f++) {
        initialFrames.push(f);
      }
      await Promise.all(initialFrames.map(loadSingleFrame));

      if (isCancelled) return;
      setImagesLoaded(true);

      // Draw starting frame immediately
      const canvas = canvasRef.current;
      const startImg = imagesMapRef.current.get(actualStart);
      if (canvas && startImg) {
        const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawImageCover(ctx, startImg, canvas.width, canvas.height, true);
        }
      }

      // Step size for Pass 1 based on range size
      const step1 = totalFrames > 300 ? 8 : totalFrames > 100 ? 5 : 3;
      const pass1: number[] = [];
      for (let f = actualStart; f <= actualEnd; f += step1) {
        if (!imagesMapRef.current.has(f)) pass1.push(f);
      }
      for (let i = 0; i < pass1.length; i += 10) {
        if (isCancelled) return;
        await Promise.all(pass1.slice(i, i + 10).map(loadSingleFrame));
        setLoadedPercentage(Math.min(100, Math.round((i / pass1.length) * 50)));
      }

      // Pass 2: Fill in remaining frames smoothly
      const remaining: number[] = [];
      for (let f = actualStart; f <= actualEnd; f++) {
        if (!imagesMapRef.current.has(f)) remaining.push(f);
      }
      for (let i = 0; i < remaining.length; i += 12) {
        if (isCancelled) return;
        await Promise.all(remaining.slice(i, i + 12).map(loadSingleFrame));
        setLoadedPercentage(50 + Math.min(50, Math.round((i / remaining.length) * 50)));
      }
      setLoadedPercentage(100);
    };

    loadProgressively();
    return () => { isCancelled = true; };
  }, [actualStart, actualEnd, totalFrames, loadSingleFrame, drawImageCover]);

  // Window resize handler
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Update canvas on scroll with instant nearest-frame fallback
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which frame to show in [actualStart, actualEnd]
    const frameIndex = Math.min(
      actualEnd,
      Math.max(actualStart, actualStart + Math.floor(latest * (totalFrames - 1)))
    );
    
    activeFrameRef.current = frameIndex;

    // Avoid redundant renders if on same frame
    if (frameIndex === currentFrame) return;
    setCurrentFrame(frameIndex);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // 1. Check if exact frame is loaded
    let imgToDraw = imagesMapRef.current.get(frameIndex);

    // 2. If not loaded, find the closest loaded frame so the screen NEVER freezes
    if (!imgToDraw) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = frameIndex - offset;
        const next = frameIndex + offset;
        if (prev >= actualStart && imagesMapRef.current.has(prev)) {
          imgToDraw = imagesMapRef.current.get(prev);
          break;
        }
        if (next <= actualEnd && imagesMapRef.current.has(next)) {
          imgToDraw = imagesMapRef.current.get(next);
          break;
        }
      }

      // Proactively fetch current and surrounding frames with priority
      loadSingleFrame(frameIndex);
      if (frameIndex + 1 <= actualEnd) loadSingleFrame(frameIndex + 1);
      if (frameIndex - 1 >= actualStart) loadSingleFrame(frameIndex - 1);
    }

    // 3. Render the best available frame
    if (imgToDraw) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageCover(ctx, imgToDraw, canvas.width, canvas.height, frameIndex === actualStart);
    }
  });

  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none overflow-hidden">
      {/* Crisp fallback poster for initial page load */}
      <img
        src={posterSrc}
        alt="Scenic Yercaud Experience"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-0 ${
          imagesLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ objectPosition: "center 45%" }}
      />

      {/* Loading Progress State */}
      {showProgress && loadedPercentage < 100 && (
        <div className="absolute bottom-4 right-4 z-30 text-white/60 text-xs font-mono flex gap-2 items-center bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
           <div className="h-1.5 w-16 bg-white/20 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-400 transition-all duration-300" style={{ width: `${loadedPercentage}%` }} />
           </div>
           <span>Loading 3D {loadedPercentage}%</span>
        </div>
      )}

      {/* Canvas for image sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block z-0 opacity-100"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Dynamic Overlay Gradient for perfect readability */}
      <div className={`absolute inset-0 z-[5] ${overlayClassName}`} />
    </div>
  );
}
