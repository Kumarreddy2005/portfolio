import { useEffect, useRef } from "react";

const GOLD = "201,163,106";
const HIGHLIGHT = "231,207,160";
export default function ParticleMesh() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      console.error("Unable to initialize the hero particle mesh canvas.");
      return undefined;
    }

    const highlightCanvas = document.createElement("canvas");
    highlightCanvas.width = 128;
    highlightCanvas.height = 128;
    const highlightContext = highlightCanvas.getContext("2d");
    if (highlightContext) {
      const highlightGradient = highlightContext.createRadialGradient(64, 64, 0, 64, 64, 64);
      highlightGradient.addColorStop(0, `rgba(${HIGHLIGHT},0.12)`);
      highlightGradient.addColorStop(1, `rgba(${HIGHLIGHT},0)`);
      highlightContext.fillStyle = highlightGradient;
      highlightContext.fillRect(0, 0, 128, 128);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 640px)");
    const mediumScreen = window.matchMedia("(max-width: 1023px)");
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    let width = 0;
    let height = 0;
    let pageLeft = 0;
    let pageTop = 0;
    let frame = 0;
    let previousFrameTime = 0;
    let time = 0;
    let columns = 0;
    let rows = 0;
    let dpr = 1;
    let inView = false;
    let pageVisible = !document.hidden;
    let listeningForPointer = false;
    let xPositions = new Float32Array(0);
    let yPositions = new Float32Array(0);
    let depths = new Float32Array(0);
    let lineGradient = null;

    const indexOf = (row, column) => row * (columns + 1) + column;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pageLeft = bounds.left + window.scrollX;
      pageTop = bounds.top + window.scrollY;
      dpr = Math.min(
        window.devicePixelRatio || 1,
        smallScreen.matches ? 1 : 1.25,
      );
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (smallScreen.matches) {
        columns = 11;
        rows = 8;
      } else if (mediumScreen.matches) {
        columns = 17;
        rows = 12;
      } else {
        columns = 24;
        rows = 16;
      }

      const pointCount = (columns + 1) * (rows + 1);
      xPositions = new Float32Array(pointCount);
      yPositions = new Float32Array(pointCount);
      depths = new Float32Array(pointCount);

      lineGradient = context.createLinearGradient(0, 0, width, 0);
      lineGradient.addColorStop(0, `rgba(${GOLD},0)`);
      lineGradient.addColorStop(0.16, `rgba(${GOLD},0.03)`);
      lineGradient.addColorStop(0.4, `rgba(${GOLD},0.2)`);
      lineGradient.addColorStop(0.68, `rgba(${GOLD},0.27)`);
      lineGradient.addColorStop(0.88, `rgba(${GOLD},0.12)`);
      lineGradient.addColorStop(1, `rgba(${GOLD},0)`);
    };

    const onPointerMove = (event) => {
      pointer.targetX = event.clientX + window.scrollX - pageLeft;
      pointer.targetY = event.clientY + window.scrollY - pageTop;
    };

    const onPointerLeave = () => {
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    const draw = () => {
      if (!width || !height) return;

      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      const meshLeft = width * (smallScreen.matches ? 0.08 : 0.2);
      const meshWidth = width * (smallScreen.matches ? 1.02 : 0.86);
      const meshTop = height * 0.12;
      const meshHeight = height * 0.76;
      const pointerInfluence =
        smallScreen.matches || reducedMotion.matches ? 0 : mediumScreen.matches ? 125 : 155;
      const influenceRangeSquared = pointerInfluence * pointerInfluence * 9;
      const influenceRadiusSquared = pointerInfluence * pointerInfluence;

      for (let row = 0; row <= rows; row += 1) {
        const v = row / rows;
        for (let column = 0; column <= columns; column += 1) {
          const u = column / columns;
          const index = indexOf(row, column);
          const baseX = meshLeft + u * meshWidth;
          const baseY = meshTop + v * meshHeight;
          const wave =
            Math.sin(u * 5.4 + time * 0.42 + v * 2.1) * 25 +
            Math.sin(u * 10.5 - time * 0.27 + v * 3.7) * 9 +
            Math.cos(v * 7.5 + time * 0.2 + u * 2.8) * 8;
          const depth =
            Math.sin(u * 6.2 + time * 0.28 + v * 2.4) * 0.62 +
            Math.cos(v * 8 + u * 4.1 - time * 0.22) * 0.38;
          let displacement = 0;
          if (pointerInfluence > 0) {
            const distanceX = baseX - pointer.x;
            const distanceY = baseY + wave - pointer.y;
            const distanceSquared = distanceX * distanceX + distanceY * distanceY;
            if (distanceSquared < influenceRangeSquared) {
              const distance = Math.sqrt(distanceSquared);
              const influence = Math.exp(-distanceSquared / influenceRadiusSquared);
              displacement = influence * Math.sin(distance * 0.035) * 24;
            }
          }

          xPositions[index] = baseX + depth * 19;
          yPositions[index] = baseY + wave + displacement;
          depths[index] = depth;
        }
      }

      context.beginPath();
      for (let row = 0; row <= rows; row += 1) {
        for (let column = 0; column <= columns; column += 1) {
          const index = indexOf(row, column);
          const x = xPositions[index];
          const y = yPositions[index];

          if (column < columns) {
            context.moveTo(x, y);
            context.lineTo(xPositions[index + 1], yPositions[index + 1]);
          }
          if (row < rows) {
            context.moveTo(x, y);
            context.lineTo(xPositions[index + columns + 1], yPositions[index + columns + 1]);
          }
          if (row < rows && column < columns && (row + column) % 2 === 0) {
            context.moveTo(x, y);
            context.lineTo(
              xPositions[index + columns + 2],
              yPositions[index + columns + 2],
            );
          }
        }
      }

      context.strokeStyle = lineGradient;
      context.lineWidth = 0.65;
      context.stroke();

      context.beginPath();
      for (let row = 0; row <= rows; row += 2) {
        for (let column = 0; column <= columns; column += 2) {
          const index = indexOf(row, column);
          const radius = 0.65 + (depths[index] + 1) * 0.28;
          context.moveTo(xPositions[index] + radius, yPositions[index]);
          context.arc(xPositions[index], yPositions[index], radius, 0, Math.PI * 2);
        }
      }
      context.fillStyle = `rgba(${GOLD},0.48)`;
      context.fill();

      context.beginPath();
      for (let row = 0; row <= rows; row += 1) {
        for (let column = 0; column <= columns; column += 1) {
          const index = indexOf(row, column);
          const isGlint = (row * 17 + column * 31) % 127 === 0;
          if (isGlint) {
            context.moveTo(xPositions[index] + 1.25, yPositions[index]);
            context.arc(xPositions[index], yPositions[index], 1.25, 0, Math.PI * 2);
          }
        }
      }
      context.fillStyle = `rgba(${HIGHLIGHT},0.34)`;
      context.fill();

      if (
        !smallScreen.matches &&
        highlightContext &&
        pointer.x >= 0 &&
        pointer.x <= width &&
        pointer.y >= 0 &&
        pointer.y <= height
      ) {
        const radius = mediumScreen.matches ? 125 : 155;
        context.drawImage(
          highlightCanvas,
          pointer.x - radius,
          pointer.y - radius,
          radius * 2,
          radius * 2,
        );
      }
    };

    const stopLoop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
      previousFrameTime = 0;
    };

    const canAnimate = () =>
      inView && pageVisible && !reducedMotion.matches;

    const tick = (now) => {
      frame = 0;
      if (!canAnimate()) return;

      const frameInterval = 1000 / 30;
      if (!previousFrameTime || now - previousFrameTime >= frameInterval) {
        const delta = previousFrameTime ? Math.min(now - previousFrameTime, 50) : frameInterval;
        time += delta * 0.00048;
        previousFrameTime = now;
        draw();
      }

      frame = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      stopLoop();
      if (reducedMotion.matches) {
        draw();
      } else if (canAnimate()) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      syncPointerListeners();
      startLoop();
    };

    const onMotionPreferenceChange = () => {
      syncPointerListeners();
      startLoop();
    };

    const onScreenSizeChange = () => {
      resize();
      syncPointerListeners();
      startLoop();
    };

    const syncPointerListeners = () => {
      const shouldListen =
        inView && pageVisible && !reducedMotion.matches && !smallScreen.matches;
      if (shouldListen === listeningForPointer) return;

      if (shouldListen) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", onPointerLeave, { passive: true });
      } else {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
        onPointerLeave();
      }
      listeningForPointer = shouldListen;
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion.matches) draw();
    });
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPointerListeners();
      startLoop();
    });

    resizeObserver.observe(canvas);
    intersectionObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    smallScreen.addEventListener("change", onScreenSizeChange);
    mediumScreen.addEventListener("change", onScreenSizeChange);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (listeningForPointer) {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
      }
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      smallScreen.removeEventListener("change", onScreenSizeChange);
      mediumScreen.removeEventListener("change", onScreenSizeChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-mesh" aria-hidden="true" />;
}
