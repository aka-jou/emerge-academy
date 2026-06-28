import { useState } from "react"
import { PlayIcon, DownloadIcon, FileTextIcon, PlusIcon, MinusIcon, CheckIcon } from "../icons"
import type { Lesson } from "../../data/player"

export function LessonViewer({ lesson }: { lesson: Lesson }) {
  if (lesson.format === "video") return <VideoViewer lesson={lesson} />
  if (lesson.format === "pdf") return <PdfViewer lesson={lesson} />
  return <QuizViewer lesson={lesson} />
}

function VideoViewer({ lesson }: { lesson: Lesson }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-foreground">
        <img
          src={lesson.videoPoster || "/placeholder.svg"}
          alt={lesson.title}
          className="h-full w-full object-cover opacity-80"
        />
        {!playing && (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
            aria-label="Reproducir video"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 shadow-lg">
              <PlayIcon className="ml-1 h-8 w-8 text-primary-foreground" />
            </span>
          </button>
        )}

        {/* Controles personalizados */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="text-white/90 transition hover:text-white"
            aria-label={playing ? "Pausar" : "Reproducir"}
          >
            <PlayIcon className="h-5 w-5" />
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30">
            <div className="h-full rounded-full bg-primary" style={{ width: playing ? "38%" : "0%" }} />
          </div>
          <span className="text-xs font-medium tabular-nums text-white/90">{lesson.duration}</span>
        </div>
      </div>

      <h2 className="mt-6 text-lg font-bold tracking-tight text-foreground">{lesson.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        En esta lección revisaremos los conceptos clave del módulo con demostraciones prácticas. Toma nota de los
        puntos destacados; aparecerán en la evaluación correspondiente.
      </p>
    </div>
  )
}

function PdfViewer({ lesson }: { lesson: Lesson }) {
  const [zoom, setZoom] = useState(100)

  return (
    <div className="flex flex-col">
      {/* Barra de herramientas */}
      <div className="flex items-center justify-between gap-3 rounded-t-2xl border border-border bg-muted-surface/60 px-4 py-2.5">
        <p className="flex items-center gap-2 truncate text-sm font-medium text-foreground">
          <FileTextIcon className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{lesson.pdfName}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="rounded-md border border-border bg-card p-1.5 text-foreground transition hover:bg-background"
            aria-label="Alejar"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-xs font-semibold tabular-nums text-muted">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(200, z + 10))}
            className="rounded-md border border-border bg-card p-1.5 text-foreground transition hover:bg-background"
            aria-label="Acercar"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="ml-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            <DownloadIcon className="h-3.5 w-3.5" />
            Descargar
          </button>
        </div>
      </div>

      {/* Lienzo del documento */}
      <div className="flex max-h-[460px] justify-center overflow-auto rounded-b-2xl border border-t-0 border-border bg-muted-surface/30 p-6">
        <div
          className="w-full max-w-md shrink-0 rounded-lg border border-border bg-card p-8 shadow-sm"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div className="h-3 w-1/3 rounded bg-primary/80" />
          <div className="mt-4 h-2 w-full rounded bg-border" />
          <div className="mt-2 h-2 w-11/12 rounded bg-border" />
          <div className="mt-2 h-2 w-full rounded bg-border" />
          <div className="mt-2 h-2 w-4/5 rounded bg-border" />
          <div className="mt-6 h-2 w-2/3 rounded bg-border" />
          <div className="mt-2 h-2 w-full rounded bg-border" />
          <div className="mt-2 h-2 w-10/12 rounded bg-border" />
        </div>
      </div>

      <h2 className="mt-6 text-lg font-bold tracking-tight text-foreground">{lesson.title}</h2>
    </div>
  )
}

function QuizViewer({ lesson }: { lesson: Lesson }) {
  const questions = lesson.quiz ?? []
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [validated, setValidated] = useState(false)

  const current = questions[index]
  if (!current) {
    return <p className="text-sm text-muted">No hay preguntas disponibles para esta evaluación.</p>
  }

  const isCorrect = selected === current.correctIndex
  const isLast = index === questions.length - 1

  function handleValidate() {
    if (selected === null) return
    setValidated(true)
  }

  function handleNext() {
    setIndex((i) => Math.min(questions.length - 1, i + 1))
    setSelected(null)
    setValidated(false)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-foreground">{lesson.title}</h2>
        <span className="rounded-full bg-muted-surface px-3 py-1 text-xs font-semibold text-muted">
          Pregunta {index + 1} de {questions.length}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <p className="text-base font-semibold text-foreground text-pretty">{current.question}</p>

        <ul className="mt-5 flex flex-col gap-3">
          {current.options.map((option, optIndex) => {
            const isSelected = selected === optIndex
            const showCorrect = validated && optIndex === current.correctIndex
            const showWrong = validated && isSelected && optIndex !== current.correctIndex

            return (
              <li key={option}>
                <button
                  type="button"
                  disabled={validated}
                  onClick={() => setSelected(optIndex)}
                  className={
                    showCorrect
                      ? "flex w-full items-center gap-3 rounded-xl border border-green-500 bg-green-50 px-4 py-3 text-left text-sm font-medium text-foreground"
                      : showWrong
                        ? "flex w-full items-center gap-3 rounded-xl border border-red-400 bg-red-50 px-4 py-3 text-left text-sm font-medium text-foreground"
                        : isSelected
                          ? "flex w-full items-center gap-3 rounded-xl border border-primary bg-green-50/50 px-4 py-3 text-left text-sm font-medium text-foreground"
                          : "flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm font-medium text-foreground transition hover:bg-muted-surface"
                  }
                >
                  <span
                    className={
                      isSelected || showCorrect
                        ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary"
                        : "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-border"
                    }
                  >
                    {(isSelected || showCorrect) && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </span>
                  {option}
                </button>
              </li>
            )
          })}
        </ul>

        {validated && (
          <p
            className={
              isCorrect
                ? "mt-4 flex items-center gap-2 text-sm font-semibold text-green-700"
                : "mt-4 flex items-center gap-2 text-sm font-semibold text-red-600"
            }
          >
            {isCorrect ? <CheckIcon className="h-4 w-4" /> : null}
            {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta. Revisa la opción resaltada."}
          </p>
        )}

        <div className="mt-6 flex justify-end">
          {!validated ? (
            <button
              type="button"
              onClick={handleValidate}
              disabled={selected === null}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              Validar respuesta
            </button>
          ) : !isLast ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
            >
              Siguiente pregunta
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-5 py-2.5 text-sm font-semibold text-green-700">
              <CheckIcon className="h-4 w-4" />
              Evaluación terminada
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
