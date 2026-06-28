import { useState, type JSX } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CheckIcon,
  LockIcon,
  PlayIcon,
  FileTextIcon,
  AwardIcon,
} from "../icons"
import type { Lesson, LessonFormat, Module } from "../../data/player"

const formatIcon: Record<LessonFormat, (props: { className?: string }) => JSX.Element> = {
  video: PlayIcon,
  pdf: FileTextIcon,
  quiz: AwardIcon,
}

type PlayerSidebarProps = {
  course: { title: string; progress: number }
  modules: Module[]
  activeLessonId: string
  onSelectLesson: (lesson: Lesson) => void
}

export function PlayerSidebar({ course, modules, activeLessonId, onSelectLesson }: PlayerSidebarProps) {
  const [openModules, setOpenModules] = useState<string[]>(modules.map((m) => m.id))

  function toggleModule(id: string) {
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Cabecera fija con progreso */}
      <div className="shrink-0 border-b border-border p-5">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-foreground"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180" />
          Volver al Dashboard
        </Link>
        <h1 className="mt-3 text-sm font-bold leading-snug text-foreground text-pretty">{course.title}</h1>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-muted">Progreso del curso</span>
            <span className="text-primary">{course.progress}%</span>
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-muted-surface"
            role="progressbar"
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progreso del curso"
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </div>

      {/* Lista de módulos colapsables */}
      <nav aria-label="Contenido del curso" className="flex-1 overflow-y-auto p-3">
        {modules.map((module) => {
          const isOpen = openModules.includes(module.id)
          return (
            <div key={module.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleModule(module.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-foreground transition hover:bg-muted-surface"
              >
                <span className="text-pretty">{module.title}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "" : "-rotate-90"}`}
                />
              </button>

              {isOpen && (
                <ul className="mt-1 flex flex-col gap-0.5">
                  {module.lessons.map((lesson) => {
                    const Icon = formatIcon[lesson.format]
                    const isActive = lesson.id === activeLessonId
                    const isLocked = lesson.status === "locked"
                    const isCompleted = lesson.status === "completed"

                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          disabled={isLocked}
                          onClick={() => onSelectLesson(lesson)}
                          aria-current={isActive ? "true" : undefined}
                          className={
                            isActive
                              ? "flex w-full items-start gap-2.5 rounded-lg bg-green-50 px-3 py-2.5 text-left text-sm font-medium text-foreground"
                              : isLocked
                                ? "flex w-full cursor-not-allowed items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted/60"
                                : "flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted transition hover:bg-muted-surface hover:text-foreground"
                          }
                        >
                          {/* Indicador de estado */}
                          <span className="mt-0.5 shrink-0">
                            {isCompleted ? (
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500">
                                <CheckIcon className="h-3 w-3 text-white" />
                              </span>
                            ) : isLocked ? (
                              <LockIcon className="h-4 w-4" />
                            ) : (
                              <Icon className="h-4 w-4" />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block leading-snug text-pretty">{lesson.title}</span>
                            <span className="mt-0.5 block text-xs text-muted">{lesson.duration}</span>
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
