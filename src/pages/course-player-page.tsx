import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowRightIcon, CheckIcon, MenuIcon, ClockIcon, LockIcon } from "../components/icons"
import { courses, courseDetails } from "../data/courses"
import { moduleQuizzes, diagnosticQuizzes, practicalChecklists } from "../data/quizzes"
import { useMyCourses } from "../lib/orders"
import { useCourseProgress } from "../lib/progress"
import { useAuth } from "../lib/auth"
import { selfAssessments } from "../data/self-assessments"
import { SelfAssessmentBlock } from "../components/player/self-assessment-block"

export function CoursePlayerPage() {
  const { id } = useParams<{ id: string }>()
  const courseId = id ?? ""
  const course = courses.find((c) => c.id === courseId)
  const detail = courseDetails[courseId]

  const { user } = useAuth()
  const { courses: enrolledCourses, loading: loadingEnrollment } = useMyCourses()
  const {
    completedModules,
    moduleScores,
    loading: loadingProgress,
    error,
    setModuleCompleted,
    submitQuiz,
  } = useCourseProgress(courseId)

  const [activeModule, setActiveModule] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  // Estado del cuestionario en curso (respuestas seleccionadas y si ya se envió).
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submittedResult, setSubmittedResult] = useState<{ score: number; passed: boolean } | null>(null)

  // Evaluación diagnóstica (solo informativa, no se guarda ni afecta la calificación).
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, number>>({})
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState(false)
  const [showDiagnostic, setShowDiagnostic] = useState(false)

  const isEnrolled = enrolledCourses.some((c) => c.id === courseId)
  const modules = detail?.modules ?? []
  const totalModules = modules.length
  const percent = totalModules > 0 ? Math.round((completedModules.length / totalModules) * 100) : 0

  function isUnlocked(moduleNumber: number) {
    return moduleNumber === 1 || completedModules.includes(moduleNumber - 1)
  }

  // Al cargar el progreso, arranca en el primer módulo no completado (o el primero si ya
  // terminó todo).
  useEffect(() => {
    if (loadingProgress || totalModules === 0) return
    const firstIncomplete = modules.find((m) => !completedModules.includes(m.number))
    setActiveModule(firstIncomplete?.number ?? modules[0].number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingProgress, totalModules])

  // Al cambiar de módulo, reinicia el estado del cuestionario en pantalla.
  useEffect(() => {
    setAnswers({})
    setSubmittedResult(null)
    setDiagnosticAnswers({})
    setDiagnosticSubmitted(false)
    setShowDiagnostic(false)
  }, [activeModule])

  const currentModule = modules.find((m) => m.number === activeModule) ?? modules[0]
  const currentIndex = modules.findIndex((m) => m.number === activeModule)
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null
  const nextModule = currentIndex >= 0 && currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null
  const isCurrentCompleted = currentModule ? completedModules.includes(currentModule.number) : false
  const quiz = currentModule ? moduleQuizzes[courseId]?.[currentModule.number] : undefined
  const previousScore = currentModule ? moduleScores[String(currentModule.number)] : undefined
  const diagnosticQuestions = diagnosticQuizzes[courseId]
  const checklist = practicalChecklists[courseId]
  const selfAssessment = selfAssessments[courseId]

  function selectModule(moduleNumber: number) {
    if (!isUnlocked(moduleNumber)) return
    setActiveModule(moduleNumber)
    setSidebarOpen(false)
  }

  async function toggleCompleted() {
    if (!currentModule) return
    setSaving(true)
    await setModuleCompleted(currentModule.number, !isCurrentCompleted)
    setSaving(false)
  }

  async function handleSubmitQuiz() {
    if (!currentModule || !quiz) return
    const correctCount = quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length
    const score = Math.round((correctCount / quiz.questions.length) * 100)
    setSaving(true)
    const result = await submitQuiz(currentModule.number, score, quiz.passingScore)
    setSaving(false)
    if (result.ok) setSubmittedResult({ score, passed: result.passed })
  }

  function retryQuiz() {
    setAnswers({})
    setSubmittedResult(null)
  }

  // No existe el curso o no tiene módulos definidos.
  if (!course || !detail || totalModules === 0) {
    return <Navigate to="/dashboard" replace />
  }

  // Todavía no sabemos si está inscrito (cargando useMyCourses): esperar antes de decidir.
  if (loadingEnrollment) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <span className="text-sm font-medium text-muted">Cargando…</span>
      </div>
    )
  }

  // El usuario no compró este curso: lo mandamos a la página de venta, no a las lecciones.
  if (!isEnrolled) {
    return <Navigate to={`/cursos/${courseId}`} replace />
  }

  const allQuestionsAnswered = quiz ? quiz.questions.every((q) => answers[q.id] !== undefined) : false

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Barra lateral izquierda */}
        <aside className="hidden w-80 shrink-0 border-r border-border lg:block">
          <ModuleSidebar
            title={course.title}
            percent={percent}
            modules={modules}
            completedModules={completedModules}
            activeModuleNumber={activeModule}
            isUnlocked={isUnlocked}
            onSelectModule={selectModule}
          />
        </aside>

        {/* Barra lateral móvil (overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Cerrar contenido"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] border-r border-border shadow-xl">
              <ModuleSidebar
                title={course.title}
                percent={percent}
                modules={modules}
                completedModules={completedModules}
                activeModuleNumber={activeModule}
                isUnlocked={isUnlocked}
                onSelectModule={selectModule}
              />
            </div>
          </div>
        )}

        {/* Área principal derecha */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground"
            >
              <MenuIcon className="h-4 w-4" />
              Contenido
            </button>
            <span className="truncate text-sm font-semibold text-foreground">{course.title}</span>
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-3xl">
              {currentModule && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                    <span>Módulo {currentModule.number}</span>
                    <span className="text-muted">·</span>
                    <span className="flex items-center gap-1 text-muted">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {currentModule.hours} h · {currentModule.lessons} lecciones
                    </span>
                  </div>
                  <h1 className="mt-2 text-xl font-bold tracking-tight text-foreground text-pretty sm:text-2xl">
                    {currentModule.title}
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Revisa el contenido de este módulo con tu instructor y el material de apoyo del curso.
                    {quiz
                      ? " Cuando estés listo, responde el cuestionario para acreditar el módulo."
                      : " Cuando hayas cubierto los temas y practicado lo necesario, márcalo como completado para avanzar tu progreso real de certificación."}
                  </p>

                  {error && (
                    <p role="alert" className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive">
                      {error}
                    </p>
                  )}

                  {currentModule.number === 1 && diagnosticQuestions && (
                    <DiagnosticBlock
                      questions={diagnosticQuestions}
                      show={showDiagnostic}
                      onShow={() => setShowDiagnostic(true)}
                      answers={diagnosticAnswers}
                      onAnswer={(questionId, optionIndex) =>
                        setDiagnosticAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
                      }
                      submitted={diagnosticSubmitted}
                      onSubmit={() => setDiagnosticSubmitted(true)}
                    />
                  )}

                  {quiz ? (
                    <QuizBlock
                      quiz={quiz}
                      answers={answers}
                      onAnswer={(questionId, optionIndex) =>
                        setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
                      }
                      isCompleted={isCurrentCompleted}
                      previousScore={previousScore}
                      submittedResult={submittedResult}
                      allAnswered={allQuestionsAnswered}
                      saving={saving}
                      onSubmit={handleSubmitQuiz}
                      onRetry={retryQuiz}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={toggleCompleted}
                      disabled={saving}
                      className={
                        isCurrentCompleted
                          ? "mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-primary bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition disabled:cursor-not-allowed disabled:opacity-60"
                          : "mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface disabled:cursor-not-allowed disabled:opacity-60"
                      }
                    >
                      <CheckIcon className="h-4 w-4" />
                      {isCurrentCompleted ? "Módulo completado" : "Marcar módulo como completado"}
                    </button>
                  )}
                  {!nextModule && checklist && <ChecklistReference checklist={checklist} />}
                  {!nextModule && selfAssessment && (
                    <SelfAssessmentBlock
                      assessment={selfAssessment}
                      storageKey={`emerge.autoevaluacion.${user?.id ?? "anon"}.${courseId}`}
                      studentName={user?.name ?? ""}
                      instructor={detail.instructor}
                    />
                  )}
                </div>
              )}
            </div>
          </main>

          {/* Barra de navegación inferior fija */}
          <footer className="shrink-0 border-t border-border bg-card px-4 py-3 sm:px-8">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
              <button
                type="button"
                disabled={!prevModule}
                onClick={() => prevModule && setActiveModule(prevModule.number)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
                <span className="hidden sm:inline">Módulo anterior</span>
                <span className="sm:hidden">Anterior</span>
              </button>

              {nextModule ? (
                <button
                  type="button"
                  disabled={saving || !isCurrentCompleted}
                  onClick={() => isCurrentCompleted && setActiveModule(nextModule.number)}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRightIcon className="h-4 w-4" />
                  <span>Siguiente módulo</span>
                </button>
              ) : (
                <Link
                  to="/dashboard/logros"
                  aria-disabled={!isCurrentCompleted}
                  onClick={(e) => {
                    if (!isCurrentCompleted) e.preventDefault()
                  }}
                  className={
                    isCurrentCompleted
                      ? "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
                      : "pointer-events-none inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground opacity-40"
                  }
                >
                  <CheckIcon className="h-4 w-4" />
                  {percent === 100 ? "Ver certificado" : "Termina este módulo para finalizar"}
                </Link>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

type ModuleSidebarProps = {
  title: string
  percent: number
  modules: { number: number; title: string; lessons: number; hours: number }[]
  completedModules: number[]
  activeModuleNumber: number
  isUnlocked: (moduleNumber: number) => boolean
  onSelectModule: (moduleNumber: number) => void
}

function ModuleSidebar({
  title,
  percent,
  modules,
  completedModules,
  activeModuleNumber,
  isUnlocked,
  onSelectModule,
}: ModuleSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="shrink-0 border-b border-border p-5">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-foreground"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          Volver al Dashboard
        </Link>
        <h1 className="mt-3 text-sm font-bold leading-snug text-foreground text-pretty">{title}</h1>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-muted">Progreso del curso</span>
            <span className="text-primary">{percent}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-muted-surface"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso del curso"
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      <nav aria-label="Contenido del curso" className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-0.5">
          {modules.map((m) => {
            const isActive = m.number === activeModuleNumber
            const isCompleted = completedModules.includes(m.number)
            const unlocked = isUnlocked(m.number)
            return (
              <li key={m.number}>
                <button
                  type="button"
                  onClick={() => onSelectModule(m.number)}
                  disabled={!unlocked}
                  aria-current={isActive ? "true" : undefined}
                  className={
                    isActive
                      ? "flex w-full items-start gap-2.5 rounded-lg bg-green-50 px-3 py-2.5 text-left text-sm font-medium text-foreground"
                      : unlocked
                        ? "flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
                        : "flex w-full cursor-not-allowed items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted/50"
                  }
                >
                  <span className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                        <CheckIcon className="h-3 w-3 text-white" />
                      </span>
                    ) : unlocked ? (
                      <span className="block h-4 w-4 rounded-full border-2 border-border" />
                    ) : (
                      <LockIcon className="h-4 w-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block leading-snug text-pretty">{m.title}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {m.hours} h · {m.lessons} lecciones
                      {!unlocked && " · Bloqueado"}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

type QuizBlockProps = {
  quiz: { passingScore: number; questions: { id: string; prompt: string; options: string[]; correctIndex: number }[] }
  answers: Record<string, number>
  onAnswer: (questionId: string, optionIndex: number) => void
  isCompleted: boolean
  previousScore: number | undefined
  submittedResult: { score: number; passed: boolean } | null
  allAnswered: boolean
  saving: boolean
  onSubmit: () => void
  onRetry: () => void
}

function QuizBlock({
  quiz,
  answers,
  onAnswer,
  isCompleted,
  previousScore,
  submittedResult,
  allAnswered,
  saving,
  onSubmit,
  onRetry,
}: QuizBlockProps) {
  // Ya se completó el módulo en una sesión anterior: no hace falta repetir el cuestionario.
  if (isCompleted && !submittedResult) {
    return (
      <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary">
          <CheckIcon className="h-4 w-4" />
          Cuestionario acreditado{previousScore !== undefined ? ` con ${previousScore}%` : ""}.
        </p>
      </div>
    )
  }

  if (submittedResult) {
    return (
      <div
        className={
          submittedResult.passed
            ? "mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5"
            : "mt-6 rounded-xl border border-destructive/30 bg-destructive/10 p-5"
        }
      >
        <p className={submittedResult.passed ? "text-sm font-semibold text-primary" : "text-sm font-semibold text-destructive"}>
          Obtuviste {submittedResult.score}% (mínimo para aprobar: {quiz.passingScore}%).
        </p>
        {submittedResult.passed ? (
          <p className="mt-1 text-sm text-muted">Módulo acreditado. Ya puedes avanzar al siguiente.</p>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">No alcanzaste el mínimo. Repasa el contenido e inténtalo de nuevo.</p>
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
            >
              Reintentar cuestionario
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col gap-5">
      {quiz.questions.map((q, qIndex) => (
        <fieldset key={q.id} className="rounded-xl border border-border bg-card p-4">
          <legend className="px-1 text-sm font-semibold text-foreground">
            {qIndex + 1}. {q.prompt}
          </legend>
          <div className="mt-3 flex flex-col gap-2">
            {q.options.map((option, optIndex) => (
              <label
                key={optIndex}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm text-foreground transition hover:bg-muted-surface has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === optIndex}
                  onChange={() => onAnswer(q.id, optIndex)}
                  className="h-4 w-4 accent-primary"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!allAnswered || saving}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CheckIcon className="h-4 w-4" />
        {saving ? "Enviando…" : "Enviar respuestas"}
      </button>
    </div>
  )
}

type DiagnosticBlockProps = {
  questions: { id: string; prompt: string; options: string[]; correctIndex: number }[]
  show: boolean
  onShow: () => void
  answers: Record<string, number>
  onAnswer: (questionId: string, optionIndex: number) => void
  submitted: boolean
  onSubmit: () => void
}

// Evaluación diagnóstica: puramente informativa, no se guarda ni afecta la calificación
// (así lo indica el documento oficial GE-F-CAP-11). Por eso no llama a ningún endpoint.
function DiagnosticBlock({ questions, show, onShow, answers, onAnswer, submitted, onSubmit }: DiagnosticBlockProps) {
  const allAnswered = questions.every((q) => answers[q.id] !== undefined)
  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length

  if (!show) {
    return (
      <button
        type="button"
        onClick={onShow}
        className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface"
      >
        Responder evaluación diagnóstica (opcional, no afecta tu calificación)
      </button>
    )
  }

  return (
    <div className="mt-4 rounded-xl border border-border bg-muted-surface/40 p-4">
      <p className="text-sm font-semibold text-foreground">Evaluación diagnóstica</p>
      <p className="mt-1 text-xs text-muted">
        Mide tus conocimientos previos al inicio del taller. No tiene impacto en tu calificación final.
      </p>

      {submitted ? (
        <p className="mt-3 text-sm font-medium text-foreground">
          Obtuviste {correctCount} de {questions.length} aciertos. Tenlo en mente al repasar los siguientes módulos.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-4">
          {questions.map((q, qIndex) => (
            <fieldset key={q.id}>
              <legend className="text-sm font-medium text-foreground">
                {qIndex + 1}. {q.prompt}
              </legend>
              <div className="mt-2 flex flex-col gap-1.5">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === optIndex}
                      onChange={() => onAnswer(q.id, optIndex)}
                      className="h-4 w-4 accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button
            type="button"
            onClick={onSubmit}
            disabled={!allAnswered}
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-muted-surface disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ver mi resultado
          </button>
        </div>
      )}
    </div>
  )
}

type ChecklistReferenceProps = {
  checklist: {
    code: string
    weightPercentage: number
    passingRule: string
    items: { number: number; skill: string; isCritical: boolean }[]
  }
}

// Guía de observación práctica: es una evaluación en persona que hace el instructor
// observando el desempeño físico del participante, por eso se muestra como referencia de
// lo que se evaluará (no como un cuestionario que se responde en la plataforma).
function ChecklistReference({ checklist }: ChecklistReferenceProps) {
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-foreground">Evaluación práctica presencial ({checklist.code})</p>
        <span className="shrink-0 rounded-full bg-muted-surface px-2.5 py-1 text-xs font-semibold text-muted">
          {checklist.weightPercentage}% de tu calificación
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Tu instructor observará estos pasos durante la práctica presencial y marcará si los cumples. {checklist.passingRule}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {checklist.items.map((item) => (
          <li key={item.number} className="flex items-start gap-2.5 text-sm text-foreground">
            <span
              className={
                item.isCritical
                  ? "mt-0.5 shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary"
                  : "mt-0.5 shrink-0 rounded-full bg-muted-surface px-1.5 py-0.5 text-[10px] font-bold text-muted"
              }
            >
              {item.number}
            </span>
            <span className="leading-snug">
              {item.skill}
              {item.isCritical && <span className="ml-1.5 text-xs font-semibold text-primary">(paso obligatorio)</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
