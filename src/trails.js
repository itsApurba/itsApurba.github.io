// The neon trails from the hero of the owner's earlier portfolio: a bundle of
// springy lines that chase the pointer. The physics and constants are the
// original's; only the drawing surface and input handling are new.

const settings = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

// The stroke hue drifts along a sine wave (200 to 370 degrees: blue, violet,
// magenta, red).
export const createHue = (random = Math.random) => {
  let phase = random() * 2 * Math.PI;
  return () => {
    phase += 0.0015;
    return 285 + Math.sin(phase) * 85;
  };
};

const createTrail = (spring, x, y, random) => {
  const nodes = [];
  for (let i = 0; i < settings.size; i++) {
    nodes.push({ x, y, vx: 0, vy: 0 });
  }
  return {
    spring: spring + 0.1 * random() - 0.05,
    friction: settings.friction + 0.01 * random() - 0.005,
    nodes,
  };
};

// Every trail starts collapsed on the first pointer position.
export const createTrails = (x, y, random = Math.random) => {
  const trails = [];
  for (let i = 0; i < settings.trails; i++) {
    trails.push(createTrail(0.45 + (i / settings.trails) * 0.025, x, y, random));
  }
  return trails;
};

// Advances every node one frame towards the target and returns the fastest
// node's speed, so the caller can stop animating once the lines are at rest.
export const stepTrails = (trails, target) => {
  let fastest = 0;
  for (const trail of trails) {
    let spring = trail.spring;
    let node = trail.nodes[0];
    node.vx += (target.x - node.x) * spring;
    node.vy += (target.y - node.y) * spring;
    for (let i = 0; i < trail.nodes.length; i++) {
      node = trail.nodes[i];
      if (i > 0) {
        const prev = trail.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring + prev.vx * settings.dampening;
        node.vy += (prev.y - node.y) * spring + prev.vy * settings.dampening;
      }
      node.vx *= trail.friction;
      node.vy *= trail.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= settings.tension;
      fastest = Math.max(fastest, Math.abs(node.vx), Math.abs(node.vy));
    }
  }
  return fastest;
};

export const drawTrails = (ctx, trails) => {
  for (const { nodes } of trails) {
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    let i = 1;
    for (; i < nodes.length - 2; i++) {
      const a = nodes[i];
      const b = nodes[i + 1];
      ctx.quadraticCurveTo(a.x, a.y, 0.5 * (a.x + b.x), 0.5 * (a.y + b.y));
    }
    ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, nodes[i + 1].x, nodes[i + 1].y);
    ctx.stroke();
  }
};
