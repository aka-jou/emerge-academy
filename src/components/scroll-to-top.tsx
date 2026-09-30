import { useLayoutEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

/**
 * Al entrar a otra página se sube al inicio (antes se conservaba el scroll de la
 * página anterior). Con "atrás/adelante" se respeta la posición del navegador,
 * y los enlaces con #ancla se dejan al navegador.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (hash || navigationType === "POP") return
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname, hash, navigationType])

  return null
}
