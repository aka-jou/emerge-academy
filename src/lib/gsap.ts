import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const numberFormat = new Intl.NumberFormat("es-MX")

export function formatCount(value: number) {
  return numberFormat.format(value)
}

/** Anima el texto de `el` desde 0 hasta `to`, con separador de miles. */
export function countUp(el: HTMLElement, to: number, vars: gsap.TweenVars = {}) {
  const state = { value: 0 }
  el.textContent = formatCount(0)
  return gsap.to(state, {
    value: to,
    duration: 1.6,
    ease: "power2.out",
    ...vars,
    onUpdate: () => {
      el.textContent = formatCount(Math.round(state.value))
    },
  })
}

export { gsap, ScrollTrigger, useGSAP }
