import { useRef, useState } from "react"
import { Logo } from "./logo"
import { PauseIcon, PlayIcon, VolumeIcon, VolumeOffIcon } from "../icons"
import { countUp, formatCount, gsap, ScrollTrigger, useGSAP } from "../../lib/gsap"

// TODO: reemplaza estos datos con la información real del convenio.
// El video va en public/videos/ (MP4 en H.264, idealmente menos de 10 MB).
const convenio = {
  partner: "Centro Científico",
  video: "/videos/convenio.mp4",
  poster: "/images/training-center.png",
  summary:
    "Unimos la formación práctica de Universidad Emerge con la investigación del centro para crear programas de capacitación respaldados por evidencia científica.",
  stats: [
    { value: 12, suffix: "", label: "programas de formación conjunta" },
    { value: 40, suffix: "+", label: "especialistas entre ambas instituciones" },
    { value: 3, suffix: "", label: "laboratorios abiertos para prácticas" },
  ],
}

export function Convenio() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const frame = q("[data-convenio='frame']")[0]
      const stats = q<HTMLElement>("[data-count]")

      // El avance en silencio solo corre mientras el video está en pantalla.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (!reduce) {
        ScrollTrigger.create({
          trigger: frame,
          start: "top 80%",
          end: "bottom 20%",
          onToggle: (self) => {
            const el = video.current
            if (!el) return
            if (self.isActive && !userPaused.current) el.play().catch(() => {})
            else if (!self.isActive) el.pause()
          },
        })
      }

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: frame, start: "top 90%", end: "top 30%", scrub: true }

        // El marco del video se abre hasta el ancho completo conforme se hace scroll.
        gsap.fromTo(
          frame,
          { clipPath: "inset(0% 12% 0% 12% round 2rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 1.25rem)", ease: "none", scrollTrigger: scrub },
        )
        gsap.fromTo(q("[data-convenio='frame'] video"), { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: scrub })

        gsap.from(q("[data-convenio='line']"), {
          yPercent: 115,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-convenio='title']")[0], start: "top 80%", once: true },
        })

        stats.forEach((s) => (s.textContent = formatCount(0)))
        ScrollTrigger.create({
          trigger: q("[data-convenio='stats']")[0],
          start: "top 85%",
          once: true,
          onEnter: () =>
            stats.forEach((s, i) => countUp(s, Number(s.dataset.count), { delay: i * 0.12 })),
        })

        return () => stats.forEach((s) => (s.textContent = formatCount(Number(s.dataset.count))))
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  function togglePlay() {
    const el = video.current
    if (!el) return
    if (el.paused) {
      userPaused.current = false
      el.play().catch(() => {})
    } else {
      userPaused.current = true
      el.pause()
    }
  }

  function toggleSound() {
    const el = video.current
    if (!el) return
    if (el.muted) {
      // Al activar el sonido se reinicia para verlo completo.
      el.muted = false
      el.currentTime = 0
      userPaused.current = false
      el.play().catch(() => {})
    } else {
      el.muted = true
    }
    setMuted(el.muted)
  }

  return (
    <section id="convenio" ref={root} className="px-3 py-16 sm:px-6 lg:py-24">
      <div
        data-nav-theme="dark"
        className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ink px-5 py-14 text-white sm:px-10 lg:px-14 lg:py-20"
      >
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2
            data-convenio="title"
            className="text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-convenio="line" className="block">
                Universidad Emerge
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-convenio="line" className="block">
                y {convenio.partner},
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-convenio="line" className="block text-white/45">
                ahora en convenio.
              </span>
            </span>
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-white/70">{convenio.summary}</p>
        </div>

        <div
          data-convenio="frame"
          className="relative mt-12 aspect-video overflow-hidden rounded-[1.25rem] bg-black/30"
        >
          <video
            ref={video}
            className="h-full w-full object-cover"
            src={convenio.video}
            poster={convenio.poster}
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pausar video" : "Reproducir video"}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
            >
              {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/85"
            >
              {muted ? <VolumeIcon className="h-4 w-4" /> : <VolumeOffIcon className="h-4 w-4" />}
              {muted ? "Ver con sonido" : "Silenciar"}
            </button>
          </div>
        </div>

        <dl
          data-convenio="stats"
          className="mt-4 grid gap-6 rounded-[1.25rem] bg-accent p-6 text-accent-foreground sm:grid-cols-3 sm:p-8"
        >
          {convenio.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-5xl font-semibold tabular-nums tracking-tight sm:text-6xl">
                <span data-count={stat.value}>{formatCount(stat.value)}</span>
                {stat.suffix}
              </dd>
              <dd aria-hidden="true" className="mt-2 max-w-[16rem] text-sm leading-snug">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Logo dark />
          <span aria-hidden="true" className="h-8 w-px bg-white/20" />
          <span className="text-base font-semibold text-white">{convenio.partner}</span>
        </div>
      </div>
    </section>
  )
}
