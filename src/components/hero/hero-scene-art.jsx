import { SpiderCharacterArt } from "./spider-character";

const spokes = Array.from({ length: 14 }, (_, index) => index);
const rings = [90, 150, 210, 270, 330];

export function HeroSceneArt({
  characterRef,
  bounceRef,
  stringPathRef,
  stringGlowRef,
  flashRef,
  onSwing,
}) {
  return (
    <svg
      viewBox="0 0 640 900"
      preserveAspectRatio="xMidYMin meet"
      className="relative h-full w-full overflow-visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="scene-aura" cx="0" cy="0" r="1">
          <stop offset="0" stopColor="#E62429" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#941B24" stopOpacity="0.12" />
          <stop offset="1" stopColor="#08090D" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="scene-string"
          x1="320"
          y1="-20"
          x2="320"
          y2="250"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5F5F5" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#F5F5F5" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E62429" stopOpacity="0.8" />
        </linearGradient>
        <filter id="scene-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter
          id="scene-soft-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx="320"
        cy="440"
        rx="235"
        ry="310"
        fill="url(#scene-aura)"
        filter="url(#scene-blur)"
        opacity="0.7"
      />

      <g stroke="#E62429" fill="none" opacity="0.13">
        {spokes.map((spoke) => {
          const angle = (spoke * Math.PI * 2) / 14;
          return (
            <line
              key={`spoke-${spoke}`}
              x1="320"
              y1="380"
              x2={320 + Math.cos(angle) * 360}
              y2={380 + Math.sin(angle) * 360}
              strokeWidth="0.7"
            />
          );
        })}
        {rings.map((radius, index) => (
          <circle
            key={`ring-${radius}`}
            cx="320"
            cy="380"
            r={radius}
            strokeDasharray={`1 ${9 + index * 2}`}
            opacity={0.4 + index * 0.07}
          />
        ))}
      </g>

      <g stroke="#F5F5F5" opacity="0.2">
        <circle cx="140" cy="250" r="1.2" fill="#F5F5F5" />
        <circle cx="530" cy="320" r="1" fill="#F5F5F5" />
        <circle cx="500" cy="180" r="1.3" fill="#E62429" />
        <circle cx="120" cy="470" r="1" fill="#F5F5F5" />
        <circle cx="560" cy="620" r="1.2" fill="#F5F5F5" />
      </g>

      <g
        stroke="#F5F5F5"
        strokeWidth="1"
        opacity="0.5"
        filter="url(#scene-soft-glow)"
      >
        <path
          d="M320-16C320 40 320 140 320 244"
          stroke="#E62429"
          strokeWidth="4"
          opacity="0.12"
        />
        <path
          ref={stringGlowRef}
          d="M320-18C320 72 320 162 320 250"
          stroke="#E62429"
          strokeWidth="5"
          opacity="0.16"
          fill="none"
        />
        <path
          ref={stringPathRef}
          d="M320-18C320 72 320 162 320 250"
          stroke="url(#scene-string)"
          strokeWidth="1.4"
          fill="none"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      </g>

      <g>
        <circle cx="320" cy="6" r="11" fill="none" stroke="#E62429" strokeOpacity="0.35" />
        <circle cx="320" cy="6" r="4" fill="#E62429" />
        <circle cx="320" cy="6" r="10" fill="#E62429" opacity="0.12" />
        <path
          d="M320 6L296-6M320 6L344-6M320 6L304 26M320 6L336 26"
          stroke="#F5F5F5"
          strokeOpacity="0.18"
          strokeWidth="0.8"
        />
      </g>

      <circle
        ref={flashRef}
        cx="320"
        cy="250"
        r="18"
        fill="none"
        stroke="#E62429"
        strokeWidth="1.5"
        opacity="0"
      />

      <g ref={characterRef} transform="translate(0 0) rotate(0 320 250)">
        <g ref={bounceRef}>
          <g
            transform="translate(320 250)"
            onPointerDown={onSwing}
            style={{ cursor: "pointer" }}
          >
            <SpiderCharacterArt />
          </g>
        </g>
      </g>
    </svg>
  );
}
