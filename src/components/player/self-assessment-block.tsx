import { useEffect, useState } from "react"
import { CheckIcon } from "../icons"
import type { SelfAssessment } from "../../data/self-assessments"

type Answer = "si" | "no"

type SavedState = {
  answers: Record<string, Answer>
  submitted: boolean
  date: string
}

type SelfAssessmentBlockProps = {
  assessment: SelfAssessment
  storageKey: string
  studentName: string
  instructor?: string
}

// La clave de cada pregunta es "sección-pregunta" (ej. "0-3") para no depender del texto.
function itemKey(sectionIndex: number, itemIndex: number) {
  return `${sectionIndex}-${itemIndex}`
}

function todayLabel() {
  return new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })
}

// Las respuestas se guardan en este navegador (por usuario y curso) para que el participante
// no las pierda al recargar. Si el navegador bloquea el almacenamiento, la ficha sigue
// funcionando, solo que sin recordar las respuestas.
function loadState(key: string): SavedState | null {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as SavedState) : null
  } catch {
    return null
  }
}

function saveState(key: string, state: SavedState) {
  try {
    window.localStorage.setItem(key, JSON.stringify(state))
  } catch {
    // Sin almacenamiento disponible: se ignora.
  }
}

// Ficha de autoevaluación del participante: preguntas de Sí/No agrupadas en 3 secciones.
// Es de reflexión personal, no tiene respuestas correctas ni afecta la calificación.
export function SelfAssessmentBlock({ assessment, storageKey, studentName, instructor }: SelfAssessmentBlockProps) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [submitted, setSubmitted] = useState(false)
  const [date, setDate] = useState(todayLabel())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const saved = loadState(storageKey)
    if (saved) {
      setAnswers(saved.answers ?? {})
      setSubmitted(Boolean(saved.submitted))
      setDate(saved.date || todayLabel())
      setOpen(Boolean(saved.submitted))
    } else {
      setAnswers({})
      setSubmitted(false)
      setDate(todayLabel())
      setOpen(false)
    }
  }, [storageKey])

  const totalItems = assessment.sections.reduce((sum, s) => sum + s.items.length, 0)
  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === totalItems
  const yesCount = Object.values(answers).filter((a) => a === "si").length
  const overallPercent = totalItems > 0 ? Math.round((yesCount / totalItems) * 100) : 0

  function answer(key: string, value: Answer) {
    const next = { ...answers, [key]: value }
    setAnswers(next)
    saveState(storageKey, { answers: next, submitted: false, date })
  }

  function submit() {
    const finalDate = todayLabel()
    setDate(finalDate)
    setSubmitted(true)
    saveState(storageKey, { answers, submitted: true, date: finalDate })
  }

  function edit() {
    setSubmitted(false)
    saveState(storageKey, { answers, submitted: false, date })
  }

  if (!open) {
    return (
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <p className="text-sm font-bold text-foreground">Ficha de autoevaluación del participante</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Reflexiona sobre lo que aprendiste en el curso respondiendo {totalItems} preguntas de Sí o No. No afecta tu
          calificación: te ayuda a identificar qué dominas y qué conviene reforzar.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
        >
          {answeredCount > 0 ? "Continuar autoevaluación" : "Comenzar autoevaluación"}
        </button>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-foreground">Ficha de autoevaluación del participante</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Responde con honestidad. No hay respuestas correctas ni afecta tu calificación.
          </p>
        </div>
        {!submitted && (
          <span className="shrink-0 rounded-full bg-muted-surface px-2.5 py-1 text-xs font-semibold text-muted">
            {answeredCount} de {totalItems}
          </span>
        )}
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-2 rounded-lg border border-border bg-muted-surface/40 p-3 text-xs sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-muted">Nombre</dt>
          <dd className="mt-0.5 font-medium text-foreground">{studentName}</dd>
        </div>
        <div>
          <dt className="font-semibold text-muted">Fecha</dt>
          <dd className="mt-0.5 font-medium text-foreground">{date}</dd>
        </div>
        <div>
          <dt className="font-semibold text-muted">Instructor</dt>
          <dd className="mt-0.5 font-medium text-foreground">{instructor ?? "Por asignar"}</dd>
        </div>
      </dl>

      {submitted ? (
        <SelfAssessmentResult
          assessment={assessment}
          answers={answers}
          yesCount={yesCount}
          totalItems={totalItems}
          overallPercent={overallPercent}
          onEdit={edit}
        />
      ) : (
        <div className="mt-5 flex flex-col gap-6">
          {assessment.sections.map((section, sIndex) => (
            <section key={section.title}>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {sIndex + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">{section.title}</h3>
                  <p className="mt-0.5 text-xs text-muted">{section.prompt}</p>
                </div>
              </div>
              <ul className="mt-3 flex flex-col divide-y divide-border rounded-lg border border-border">
                {section.items.map((item, iIndex) => {
                  const key = itemKey(sIndex, iIndex)
                  const value = answers[key]
                  return (
                    <li key={key} className="flex flex-col gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm leading-snug text-foreground">{item}</span>
                      <div className="flex shrink-0 gap-2" role="radiogroup" aria-label={item}>
                        <AnswerButton label="Sí" selected={value === "si"} tone="yes" onClick={() => answer(key, "si")} />
                        <AnswerButton label="No" selected={value === "no"} tone="no" onClick={() => answer(key, "no")} />
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}

          <button
            type="button"
            onClick={submit}
            disabled={!allAnswered}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckIcon className="h-4 w-4" />
            {allAnswered ? "Ver mi resultado" : `Responde las ${totalItems - answeredCount} preguntas restantes`}
          </button>
        </div>
      )}
    </div>
  )
}

type AnswerButtonProps = {
  label: string
  selected: boolean
  tone: "yes" | "no"
  onClick: () => void
}

function AnswerButton({ label, selected, tone, onClick }: AnswerButtonProps) {
  const selectedClass =
    tone === "yes"
      ? "border-primary bg-primary text-primary-foreground"
      : "border-destructive bg-destructive text-white"
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`min-w-14 rounded-md border px-3 py-1.5 text-xs font-bold transition ${
        selected ? selectedClass : "border-border bg-card text-foreground hover:bg-muted-surface"
      }`}
    >
      {label}
    </button>
  )
}

type SelfAssessmentResultProps = {
  assessment: SelfAssessment
  answers: Record<string, Answer>
  yesCount: number
  totalItems: number
  overallPercent: number
  onEdit: () => void
}

function SelfAssessmentResult({ assessment, answers, yesCount, totalItems, overallPercent, onEdit }: SelfAssessmentResultProps) {
  const toReinforce = assessment.sections.flatMap((section, sIndex) =>
    section.items
      .map((item, iIndex) => ({ item, section: section.title, key: itemKey(sIndex, iIndex) }))
      .filter((entry) => answers[entry.key] === "no"),
  )

  return (
    <div className="mt-5 flex flex-col gap-5">
      <div>
        <p className="text-sm font-semibold text-foreground">
          Respondiste "Sí" en {yesCount} de {totalItems} puntos ({overallPercent}%).
        </p>
        <p className="mt-1 text-xs text-muted">
          {toReinforce.length === 0
            ? "Te sientes seguro en todos los puntos del curso. ¡Excelente!"
            : "Revisa los puntos marcados con \"No\" con tu instructor o en el material del curso."}
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {assessment.sections.map((section, sIndex) => {
          const yes = section.items.filter((_, iIndex) => answers[itemKey(sIndex, iIndex)] === "si").length
          const pct = Math.round((yes / section.items.length) * 100)
          return (
            <li key={section.title}>
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-foreground">
                  {sIndex + 1}. {section.title}
                </span>
                <span className="shrink-0 font-semibold text-muted">
                  {yes}/{section.items.length}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted-surface">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </li>
          )
        })}
      </ul>

      {toReinforce.length > 0 && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-destructive">Puntos a reforzar</p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {toReinforce.map((entry) => (
              <li key={entry.key} className="text-sm leading-snug text-foreground">
                {entry.item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {assessment.reminder && (
        <p className="rounded-lg bg-muted-surface/60 px-3 py-2.5 text-sm font-medium text-foreground">
          <span className="font-bold text-primary">Recuerda: </span>
          {assessment.reminder}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {assessment.pillars.map((pillar) => (
          <span key={pillar} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {pillar}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
      >
        Editar mis respuestas
      </button>
    </div>
  )
}
