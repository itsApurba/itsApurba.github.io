import { useEffect, useRef } from "react";
import { createHue, createTrails, drawTrails, stepTrails } from "../trails";

// Draws the trails on a canvas behind the hero, as wide as the viewport and as
// tall as the hero. Returns a function that stops it and clears the canvas.
const run = (canvas, hero) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const hue = createHue();
  const pointer = { x: 0, y: 0 }; // viewport coordinates
  let trails = null; // created on the first pointer move or touch
  let visible = true;
  let frame = 0;
  let width = 0;
  let height = 0;

  const tick = () => {
    frame = 0;
    const rect = canvas.getBoundingClientRect();
    const speed = stepTrails(trails, { x: pointer.x - rect.left, y: pointer.y - rect.top });
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `hsla(${Math.round(hue())},90%,50%,0.25)`;
    ctx.lineWidth = 1;
    drawTrails(ctx, trails);
    // Once the lines have caught up with the pointer, rest until it moves.
    if (speed > 0.01) wake();
  };

  const wake = () => {
    if (!frame && trails && visible) frame = requestAnimationFrame(tick);
  };

  const resize = () => {
    const rect = hero.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = document.documentElement.clientWidth;
    height = hero.offsetHeight;
    canvas.style.left = `${-rect.left}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    cancelAnimationFrame(frame);
    frame = 0;
    if (trails) tick();
  };

  const move = (x, y) => {
    pointer.x = x;
    pointer.y = y;
    if (!trails) {
      const rect = canvas.getBoundingClientRect();
      trails = createTrails(x - rect.left, y - rect.top);
    }
    wake();
  };

  // Touch is read from passive touch events rather than pointer events: the
  // browser cancels a touch pointer once the finger starts scrolling, and the
  // lines should keep following it. Nothing here blocks scrolling.
  const onPointer = (event) => {
    if (event.pointerType !== "touch") move(event.clientX, event.clientY);
  };
  const onTouch = (event) => {
    const touch = event.touches[0];
    if (touch) move(touch.clientX, touch.clientY);
  };

  const passive = { passive: true };
  window.addEventListener("pointermove", onPointer, passive);
  window.addEventListener("touchstart", onTouch, passive);
  window.addEventListener("touchmove", onTouch, passive);
  // Scrolling moves the hero under a still mouse, so the lines re-aim.
  window.addEventListener("scroll", wake, passive);
  window.addEventListener("resize", resize);
  const sized = new ResizeObserver(resize);
  sized.observe(hero);
  const seen = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    wake();
  });
  seen.observe(hero);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onPointer, passive);
    window.removeEventListener("touchstart", onTouch, passive);
    window.removeEventListener("touchmove", onTouch, passive);
    window.removeEventListener("scroll", wake, passive);
    window.removeEventListener("resize", resize);
    sized.disconnect();
    seen.disconnect();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
};

const HeroTrails = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};
    const start = () => {
      stop();
      stop = motion.matches ? () => {} : run(canvas, canvas.parentElement);
    };
    start();
    motion.addEventListener("change", start);
    return () => {
      motion.removeEventListener("change", start);
      stop();
    };
  }, []);

  return <canvas ref={ref} className="hero__trails" aria-hidden="true" />;
};

export default HeroTrails;
