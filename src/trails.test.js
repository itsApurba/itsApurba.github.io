import { describe, expect, it } from "vitest";
import { createHue, createTrails, stepTrails } from "./trails";

describe("hero trails", () => {
  it("catch up with the pointer and come to rest", () => {
    const trails = createTrails(0, 0);
    expect(trails).toHaveLength(20);
    let speed = Infinity;
    let frames = 0;
    while (speed > 0.01 && frames < 1000) {
      speed = stepTrails(trails, { x: 300, y: 120 });
      frames++;
    }
    expect(frames).toBeLessThan(1000);
    for (const { nodes } of trails) {
      expect(nodes).toHaveLength(50);
      for (const node of nodes) {
        expect(node.x).toBeCloseTo(300, 0);
        expect(node.y).toBeCloseTo(120, 0);
      }
    }
  });

  it("drifts the hue between blue and red", () => {
    const hue = createHue(() => 0);
    for (let i = 0; i < 5000; i++) {
      const value = hue();
      expect(value).toBeGreaterThanOrEqual(200);
      expect(value).toBeLessThanOrEqual(370);
    }
  });
});
