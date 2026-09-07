import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";

/**
 * Premium 3D-like interactive product viewer.
 *
 * - Move the cursor (or drag on touch) to spin the product through
 *   front -> right -> back -> left -> front, with crossfade blending
 *   between the 4 supplied perspectives.
 * - Click a thumbnail to animate directly to that angle.
 * - Subtle floating, soft ground shadow, reflection, ambient glow,
 *   and CSS 3D transforms (rotateX / rotateY / translateZ / perspective)
 *   sell the "real 3D product" feel even though only 4 static shots exist.
 *
 * Images live in /public/product/: front.png, left.png, back.png, right.png
 */

const KEYFRAMES = [
  { angle: 0, label: "Front", src: "/product/front.png" },
  { angle: 90, label: "Right", src: "/product/right.png" },
  { angle: 180, label: "Back", src: "/product/back.png" },
  { angle: 270, label: "Left", src: "/product/left.png" },
];

function norm360(a) {
  let x = a % 360;
  if (x < 0) x += 360;
  return x;
}

function shortestDelta(from, to) {
  let d = (to - from) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

export default function ProductViewer() {
  const containerRef = useRef(null);

  const theta = useMotionValue(0);
  const thetaSpring = useSpring(theta, { stiffness: 90, damping: 18, mass: 0.6 });

  const tiltX = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 120, damping: 16 });

  const draggingRef = useRef(false);
  const hoverRef = useRef(false);
  const lastXRef = useRef(0);

  const [reduced, setReduced] = useState(false);
  const [activeLabel, setActiveLabel] = useState("Front");
  const [frameState, setFrameState] = useState({ idx: 0, nextIdx: 1, frac: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // idle floating bob
  const bobY = useMotionValue(0);
  useEffect(() => {
    if (reduced) return;
    let raf;
    const start = performance.now();
    const loop = (t) => {
      const elapsed = (t - start) / 1000;
      bobY.set(Math.sin(elapsed * 1.15) * 9);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [bobY, reduced]);

  // derive crossfade frame indices from spring value
  useEffect(() => {
    const unsub = thetaSpring.on("change", (v) => {
      const n = norm360(v);
      const idx = Math.floor(n / 90) % 4;
      const nextIdx = (idx + 1) % 4;
      const frac = (n % 90) / 90;
      setFrameState({ idx, nextIdx, frac });
      setActiveLabel(KEYFRAMES[idx].label);
    });
    return unsub;
  }, [thetaSpring]);

  const rotateY = useTransform(thetaSpring, (v) => Math.sin((norm360(v) * Math.PI) / 180) * 24);
  const translateZ = useTransform(thetaSpring, (v) => Math.cos((norm360(v) * Math.PI) / 180) * 26);
  const scale = useTransform(thetaSpring, (v) => 1 + Math.cos((norm360(v) * Math.PI) / 180) * 0.015);
  const rotateX = useTransform(tiltXSpring, (v) => v);
  const reflectionRotateY = useTransform(thetaSpring, (v) => Math.sin((norm360(v) * Math.PI) / 180) * 24);
  const reflectionY = useTransform(bobY, (v) => -v);

  const handlePointerMove = useCallback(
    (clientX, clientY) => {
      const el = containerRef.current;
      if (!el || reduced) return;
      const rect = el.getBoundingClientRect();
      const relX = (clientX - rect.left) / rect.width - 0.5;
      const relY = (clientY - rect.top) / rect.height - 0.5;

      if (draggingRef.current) {
        const dx = clientX - lastXRef.current;
        const degPerPx = 0.35;
        theta.set(theta.get() + dx * degPerPx);
        lastXRef.current = clientX;
      } else if (hoverRef.current) {
        theta.set(relX * 190);
      }
      tiltX.set(-relY * 10);
    },
    [theta, tiltX, reduced]
  );

  const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
  const onMouseEnter = () => (hoverRef.current = true);
  const onMouseLeave = () => {
    hoverRef.current = false;
    if (!draggingRef.current) {
      const nearestFront = Math.round(theta.get() / 360) * 360;
      animate(theta, nearestFront, { type: "spring", stiffness: 90, damping: 18 });
    }
    animate(tiltX, 0, { type: "spring", stiffness: 120, damping: 16 });
  };
  const onMouseDown = (e) => {
    draggingRef.current = true;
    hoverRef.current = false;
    lastXRef.current = e.clientX;
  };
  const onMouseUp = () => (draggingRef.current = false);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    draggingRef.current = true;
    lastXRef.current = t.clientX;
  };
  const onTouchMove = (e) => {
    const t = e.touches[0];
    handlePointerMove(t.clientX, t.clientY);
  };
  const onTouchEnd = () => (draggingRef.current = false);

  useEffect(() => {
    const up = () => (draggingRef.current = false);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  const goToAngle = (angle) => {
    hoverRef.current = false;
    draggingRef.current = false;
    const cur = theta.get();
    const curNorm = norm360(cur);
    const delta = shortestDelta(curNorm, angle);
    animate(theta, cur + delta, { type: "spring", stiffness: 90, damping: 18 });
  };

  return (
    <div className="pv-root">
      <div
        ref={containerRef}
        className="pv-stage"
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="pv-glow" />

        <div className="pv-perspective">
          <motion.div className="pv-3d-group" style={{ y: bobY, rotateX, rotateY, translateZ, scale }}>
            {KEYFRAMES.map((kf, i) => {
              const opacity =
                i === frameState.idx
                  ? 1 - frameState.frac
                  : i === frameState.nextIdx
                  ? frameState.frac
                  : 0;
              return (
                <img
                  key={kf.label}
                  src={kf.src}
                  alt={`${kf.label} view`}
                  draggable={false}
                  className="pv-image"
                  style={{ opacity }}
                />
              );
            })}
          </motion.div>
        </div>

        {/* reflection */}
        <div className="pv-reflection">
          <motion.div className="pv-reflection-inner" style={{ rotateY: reflectionRotateY, y: reflectionY }}>
            {KEYFRAMES.map((kf, i) => {
              const opacity =
                i === frameState.idx
                  ? 1 - frameState.frac
                  : i === frameState.nextIdx
                  ? frameState.frac
                  : 0;
              return (
                <img
                  key={kf.label + "-refl"}
                  src={kf.src}
                  alt=""
                  draggable={false}
                  className="pv-image"
                  style={{ opacity }}
                />
              );
            })}
          </motion.div>
        </div>

        <div className="pv-shadow" />
      </div>

      <div className="pv-thumbs">
        {KEYFRAMES.map((kf) => (
          <button
            key={kf.label}
            className={`pv-thumb ${activeLabel === kf.label ? "active" : ""}`}
            onClick={() => goToAngle(kf.angle)}
            aria-label={`${kf.label} view`}
          >
            <img src={kf.src} alt={kf.label} draggable={false} />
          </button>
        ))}
      </div>
      <div className="pv-active-label">{activeLabel} view</div>

      <style>{`
        .pv-root {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .pv-stage {
          position: relative;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 1 / 1.05;
          cursor: grab;
          touch-action: none;
          user-select: none;
        }
        .pv-stage:active {
          cursor: grabbing;
        }
        .pv-glow {
          position: absolute;
          left: 50%;
          top: 42%;
          width: 70%;
          height: 70%;
          background: radial-gradient(
            circle,
            rgba(201, 162, 39, 0.16) 0%,
            rgba(201, 162, 39, 0.06) 45%,
            transparent 72%
          );
          filter: blur(6px);
          animation: pvGlowPulse 5s ease-in-out infinite;
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        @keyframes pvGlowPulse {
          0%,
          100% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }
        .pv-perspective {
          position: absolute;
          inset: 0;
          perspective: 1400px;
        }
        .pv-3d-group {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }
        .pv-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
          will-change: opacity;
        }
        .pv-reflection {
          position: absolute;
          left: 0;
          right: 0;
          top: 62%;
          height: 38%;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.55;
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.22), transparent 78%);
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.22), transparent 78%);
        }
        .pv-reflection-inner {
          position: absolute;
          left: 0;
          right: 0;
          top: -100%;
          height: 100%;
          transform: scaleY(-1);
          transform-origin: top center;
        }
        .pv-shadow {
          position: absolute;
          left: 50%;
          bottom: 10%;
          width: 46%;
          height: 7%;
          background: #1a1a1a;
          border-radius: 50%;
          filter: blur(14px);
          opacity: 0.3;
          transform: translateX(-50%);
          pointer-events: none;
        }
        .pv-thumbs {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .pv-thumb {
          width: 64px;
          height: 64px;
          border-radius: 14px;
          border: 1px solid #e4ddce;
          background: #fdfcfa;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          padding: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease,
            border-color 0.25s ease;
        }
        .pv-thumb:hover {
          transform: translateY(-3px);
        }
        .pv-thumb.active {
          border: 2px solid #c9a227;
          box-shadow: 0 6px 16px rgba(201, 162, 39, 0.25);
        }
        .pv-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .pv-active-label {
          margin-top: 10px;
          font-size: 12px;
          letter-spacing: 0.06em;
          color: #9a917f;
          text-transform: uppercase;
        }
        @media (prefers-reduced-motion: reduce) {
          .pv-stage,
          .pv-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}