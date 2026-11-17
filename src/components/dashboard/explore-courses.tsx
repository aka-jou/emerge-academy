import { Link } from "react-router-dom"
import { courses, type Course } from "../../data/courses"
import { useCart } from "../../lib/cart"
import { ArrowRightIcon, GraduationCapIcon, ShoppingCartIcon } from "../icons"

// Llamado para seguir comprando: en móvil es un botón a todo lo ancho; en escritorio, una
// franja con el texto a la izquierda y los botones a la derecha.
export function ExploreCourses({ enrolledCourses }: { enrolledCourses: Course[] }) {
  const { count } = useCart()
  const enrolledIds = new Set(enrolledCourses.map((c) => c.id))
  const remaining = courses.filter((c) => !enrolledIds.has(c.id)).length

  return (
    <section
      aria-label="Explorar más cursos"
      className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border sm:border-border sm:bg-card sm:p-6 sm:shadow-sm animate-fade-up"
    >
      <div className="hidden items-center gap-4 sm:flex">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GraduationCapIcon className="h-6 w-6" />
        </span>
        <div>
          <h2 id="explorar-titulo" className="text-lg font-bold text-foreground">
            Explora más cursos
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            {remaining > 0
              ? `Tienes ${remaining} cursos más disponibles para seguir certificándote.`
              : "Revisa el catálogo completo de Universidad Emerge."}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:shrink-0 sm:flex-row">
        {count > 0 && (
          <Link
            to="/carrito"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-card px-5 py-3.5 text-sm font-semibold text-primary transition hover:bg-primary/[0.06] sm:w-auto sm:py-3"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Ir al carrito ({count})
          </Link>
        )}
        <Link
          to="/cursos"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary-hover sm:w-auto sm:py-3"
        >
          <span className="sm:hidden">Explorar más cursos</span>
          <span className="hidden sm:inline">Ver catálogo completo</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
