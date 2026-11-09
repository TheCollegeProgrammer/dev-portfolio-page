import { clamp } from "@/lib/utils";

export function stepSpiderPhysics({
  character,
  stringPath,
  stringGlow,
  state,
  finePointer,
  now,
  dt,
}) {
  const idleFor = now - state.lastMove;
  const influence = finePointer
    ? clamp(1 - (idleFor - 500) / 1400, 0, 1)
    : 0;
  const idleSway = finePointer
    ? 0
    : Math.sin(now * 0.00105) * 9 + Math.sin(now * 0.00043) * 3;
  const targetX = state.targetX * 58 * influence + idleSway;
  const targetY = state.targetY * 10 * influence;
  const stiffness = 23;
  const damping = 4;
  const rotationStiffness = 32;
  const rotationDamping = 6.2;

  state.vx += (stiffness * (targetX - state.x) - damping * state.vx) * dt;
  state.x += state.vx * dt;
  if (Math.abs(state.x) > 74) {
    state.x = clamp(state.x, -74, 74);
    state.vx *= -0.38;
  }

  state.vy += (20 * (targetY - state.y) - 4.5 * state.vy) * dt;
  state.y += state.vy * dt;
  if (Math.abs(state.y) > 34) {
    state.y = clamp(state.y, -34, 34);
    state.vy *= -0.35;
  }

  const targetRotation = state.x * 0.082 + state.vx * 0.016;
  state.vrot +=
    (rotationStiffness * (targetRotation - state.rot) -
      rotationDamping * state.vrot) *
    dt;
  state.rot += state.vrot * dt;
  if (Math.abs(state.rot) > 8.5) {
    state.rot = clamp(state.rot, -8.5, 8.5);
    state.vrot *= -0.4;
  }

  const cx = 320 + state.x;
  const cy = 250 + state.y;
  character.setAttribute(
    "transform",
    `translate(${state.x} ${state.y}) rotate(${state.rot} 320 250)`
  );

  const bend = clamp(state.vx * 0.36, -44, 44);
  const segment = (cy + 18) / 3;
  const d = `M 320 -18 C 320 ${-18 + segment}, ${320 + bend} ${
    -18 + segment * 2
  }, ${cx} ${cy}`;
  stringPath?.setAttribute("d", d);
  stringGlow?.setAttribute("d", d);
}
