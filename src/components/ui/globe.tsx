"use client"

import createGlobe, { type COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// ── 6 strategic hub markers across DGC's Africa footprint ───────────────────
// Fewer, well-spaced dots look sharper than 22 clustered blips.
const BLIP_LOCATIONS: [number, number][] = [
  [ -1.2921,  36.8219],  // Nairobi    — East Africa hub
  [  9.0579,   7.4951],  // Abuja      — West Africa hub
  [-25.7461,  28.1881],  // Pretoria   — Southern Africa hub
  [ 15.5007,  32.5599],  // Khartoum   — Northeast Africa
  [ -4.3217,  15.3224],  // Kinshasa   — Central Africa hub
  [ 14.7167, -17.4677],  // Dakar      — West Coast hub
]

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  // phi=0.55 → Africa slightly rotated so East + Central Africa face centre;
  // theta=0.45 → strong northward tilt, showing Europe clearly at the top
  // while Africa dominates; auto-rotation brings Asia and the Americas
  // into view for a global impression.
  phi: 0.55,
  theta: 0.45,
  dark: 1,
  diffuse: 0.45,
  mapSamples: 16000,
  mapBrightness: 1.8,
  baseColor: [11 / 255, 45 / 255, 89 / 255],     // #0B2D59 DGC dark blue
  markerColor: [61 / 255, 157 / 255, 217 / 255],  // #3D9DD9 DGC blue
  glowColor: [61 / 255, 157 / 255, 217 / 255],
  markers: BLIP_LOCATIONS.map(([lat, lng]) => ({
    location: [lat, lng] as [number, number],
    size: 0.06,
  })),
}

// ── Orthographic projection (matches COBE's rotation matrices) ───────────────
function projectPoint(
  lat: number, lng: number,
  globePhi: number, globeTheta: number,
  cw: number, ch: number,
): { x: number; y: number; visibility: number } {
  const latR = (lat * Math.PI) / 180
  const lngR = (lng * Math.PI) / 180

  const x0 = Math.cos(latR) * Math.sin(lngR)
  const y0 = Math.sin(latR)
  const z0 = Math.cos(latR) * Math.cos(lngR)

  // Rotate by phi (Y axis)
  const cP = Math.cos(globePhi), sP = Math.sin(globePhi)
  const x1 =  x0 * cP + z0 * sP
  const y1 =  y0
  const z1 = -x0 * sP + z0 * cP

  // Rotate by theta (X axis)
  const cT = Math.cos(globeTheta), sT = Math.sin(globeTheta)
  const x2 = x1
  const y2 = y1 * cT - z1 * sT
  const z2 = y1 * sT + z1 * cT

  const radius = Math.min(cw, ch) * 0.46
  return {
    x: cw / 2 + x2 * radius,
    y: ch / 2 - y2 * radius,
    visibility: z2,   // positive → facing viewer
  }
}

// ── Draw animated pulse rings on the 2-D overlay canvas ─────────────────────
const PULSE_PERIOD = 2400   // ms — full ring expand cycle
const MAX_RING_RADIUS = 14  // device-pixel units

function drawBlips(
  ctx: CanvasRenderingContext2D,
  currentPhi: number,
  theta: number,
  cw: number,
  ch: number,
  dpr: number,
  now: number,
) {
  ctx.clearRect(0, 0, cw, ch)

  BLIP_LOCATIONS.forEach(([lat, lng], i) => {
    const { x, y, visibility } = projectPoint(lat, lng, currentPhi, theta, cw, ch)
    if (visibility < 0.08) return

    const faceAlpha = Math.min(1, (visibility - 0.08) * 5)

    // Each marker has its own phase offset so pulses feel random
    const offset = (i * PULSE_PERIOD) / BLIP_LOCATIONS.length
    const t = ((now + offset) % PULSE_PERIOD) / PULSE_PERIOD  // 0 → 1

    const radius = t * MAX_RING_RADIUS * dpr
    const ringAlpha = (1 - t) * faceAlpha * 0.9

    // Outer expanding ring
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(61, 157, 217, ${ringAlpha})`
    ctx.lineWidth = 1.2 * dpr
    ctx.stroke()

    // Static inner dot (brighter, always visible)
    const dotR = 2.2 * dpr
    ctx.beginPath()
    ctx.arc(x, y, dotR, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(80, 212, 242, ${faceAlpha * 0.95})`
    ctx.fill()
  })
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const phiAccRef   = useRef<number>(config.phi ?? 0)
  const rRef        = useRef<number>(0)
  const widthRef    = useRef<number>(0)

  const canvasRef       = useRef<HTMLCanvasElement>(null)
  const overlayRef      = useRef<HTMLCanvasElement>(null)
  const pointerInteracting         = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const [, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      rRef.current = delta / 200
      setR(delta / 200)
    }
  }

  const onRender = useCallback((state: Record<string, any>) => {
    if (!pointerInteracting.current) phiAccRef.current += 0.003
    const currentPhi = phiAccRef.current + rRef.current

    state.phi    = currentPhi
    state.width  = widthRef.current * 2
    state.height = widthRef.current * 2

    // Draw blip overlay
    const lc = overlayRef.current
    if (!lc) return
    const ctx = lc.getContext("2d")
    if (!ctx) return

    const w = widthRef.current
    if (w === 0) return

    const dpr = window.devicePixelRatio || 1
    const cw  = w * dpr
    const ch  = w * dpr

    if (lc.width !== cw || lc.height !== ch) {
      lc.width  = cw
      lc.height = ch
    }

    drawBlips(ctx, currentPhi, config.theta ?? 0.15, cw, ch, dpr, Date.now())
  }, [config.theta])

  const onResize = () => {
    if (canvasRef.current) widthRef.current = canvasRef.current.offsetWidth
  }

  useEffect(() => {
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width:    widthRef.current * 2,
      height:   widthRef.current * 2,
      onRender,
    })

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1"
    })

    return () => {
      window.removeEventListener("resize", onResize)
      globe.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn("relative mx-auto aspect-[1/1] w-full max-w-[1100px]", className)}>
      {/* COBE WebGL canvas */}
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
      {/* 2-D overlay: animated blip rings */}
      <canvas
        ref={overlayRef}
        className="absolute inset-0 size-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
