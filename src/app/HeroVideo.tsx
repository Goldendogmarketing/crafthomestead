"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
};

/**
 * Cinematic background video for the hero.
 *
 * The clip runs hand-places-eggs → camera push-in → macro of the eggs, so a raw
 * `loop` would hard-cut from the tight macro back to the wide shot. Instead we
 * stack two <video> elements and crossfade (a slow dissolve) across the seam, so
 * the loop reads as an intentional film transition.
 *
 * Honors prefers-reduced-motion by showing the static poster frame instead.
 */
const FADE = 0.8; // seconds of dissolve at the loop seam

export default function HeroVideo({ src, poster }: Props) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const active = useRef<"a" | "b">("a");
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMotion(false);
      return;
    }

    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    a.style.opacity = "1";
    b.style.opacity = "0";
    a.play().catch(() => {});

    const onTime = (e: Event) => {
      const vid = e.currentTarget as HTMLVideoElement;
      const isActive = (active.current === "a") === (vid === a);
      if (!isActive || !vid.duration) return;
      if (vid.currentTime < vid.duration - FADE) return;

      // Hand off to the other element with a dissolve.
      const incoming = active.current === "a" ? b : a;
      active.current = active.current === "a" ? "b" : "a";
      incoming.currentTime = 0;
      incoming.play().catch(() => {});
      incoming.style.opacity = "1";
      vid.style.opacity = "0";
      window.setTimeout(() => {
        vid.pause();
        vid.currentTime = 0;
      }, FADE * 1000);
    };

    a.addEventListener("timeupdate", onTime);
    b.addEventListener("timeupdate", onTime);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      b.removeEventListener("timeupdate", onTime);
    };
  }, []);

  if (!motion) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" aria-hidden className="h-full w-full object-cover" />;
  }

  const cls = "absolute inset-0 h-full w-full object-cover transition-opacity ease-linear";
  const style = { transitionDuration: `${FADE}s` };

  return (
    <>
      <video ref={aRef} className={cls} style={style} src={src} poster={poster} muted playsInline preload="auto" aria-hidden />
      <video ref={bRef} className={cls} style={style} src={src} muted playsInline preload="auto" aria-hidden />
    </>
  );
}
