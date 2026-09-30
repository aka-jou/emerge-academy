import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "./gsap"

/**
 * Scroll suave con Lenis, sincronizado con el reloj de GSAP para que las
 * animaciones con ScrollTrigger no se desfasen. Si el usuario pidió reducir
 * el movimiento, se deja el scroll nativo.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Los enlaces #ancla respetan el scroll-padding-top de index.css (espacio del navbar).
    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    lenis.on("scroll", ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
