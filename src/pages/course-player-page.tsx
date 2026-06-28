import { useMemo, useState } from "react"
import { PlayerSidebar } from "../components/player/player-sidebar"
import { LessonViewer } from "../components/player/lesson-viewer"
import { ArrowRightIcon, CheckIcon, MenuIcon } from "../components/icons"
import { playerCourse, playerModules, type Lesson } from "../data/player"

// Lista plana de lecciones para navegación anterior/siguiente.
const flatLessons: Lesson[] = playerModules.flatMap((m) => m.lessons)

export function CoursePlayerPage() {
  const initial = flatLessons.find((l) => l.status === "current") ?? flatLessons[0]
  const [activeLesson, setActiveLesson] = useState<Lesson>(initial)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { prevLesson, nextLesson } = useMemo(() => {
    const idx = flatLessons.findIndex((l) => l.id === activeLesson.id)
    return {
      prevLesson: idx > 0 ? flatLessons[idx - 1] : null,
      nextLesson: idx < flatLessons.length - 1 ? flatLessons[idx + 1] : null,
    }
  }, [activeLesson])

  function selectLesson(lesson: Lesson) {
    setActiveLesson(lesson)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        {/* Barra lateral izquierda (25%) */}
        <aside className="hidden w-80 shrink-0 border-r border-border lg:block">
          <PlayerSidebar
            course={playerCourse}
            modules={playerModules}
            activeLessonId={activeLesson.id}
            onSelectLesson={selectLesson}
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
              <PlayerSidebar
                course={playerCourse}
                modules={playerModules}
                activeLessonId={activeLesson.id}
                onSelectLesson={selectLesson}
              />
            </div>
          </div>
        )}

        {/* Área principal derecha (75%) */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Encabezado móvil */}
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground"
            >
              <MenuIcon className="h-4 w-4" />
              Contenido
            </button>
            <span className="truncate text-sm font-semibold text-foreground">{playerCourse.title}</span>
          </div>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-3xl">
              <LessonViewer lesson={activeLesson} />
            </div>
          </main>

          {/* Barra de navegación inferior fija */}
          <footer className="shrink-0 border-t border-border bg-card px-4 py-3 sm:px-8">
            <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
              <button
                type="button"
                disabled={!prevLesson}
                onClick={() => prevLesson && setActiveLesson(prevLesson)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
                <span className="hidden sm:inline">Lección anterior</span>
                <span className="sm:hidden">Anterior</span>
              </button>

              <button
                type="button"
                disabled={!nextLesson}
                onClick={() => nextLesson && setActiveLesson(nextLesson)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Marcar como completada y continuar</span>
                <span className="sm:hidden">Completar</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
