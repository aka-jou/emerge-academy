import { Link } from "react-router-dom"
import { courses, type Course } from "../../data/courses"
import { useCart, estimateCoursePrice } from "../../lib/cart"
import { ArrowRightIcon, CheckIcon, ClockIcon, PlusIcon, ShoppingCartIcon } from "../icons"

const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 })

// Sección del dashboard para seguir comprando: cursos del catálogo que el alumno todavía no
// tiene, con botón para añadirlos al carrito sin salir del dashboard.
export function ExploreCourses({ enrolledCourses }: { enrolledCourses: Course[] }) {
  const { addItem, isInCart, count } = useCart()
  const enrolledIds = new Set(enrolledCourses.map((c) => c.id))
  const available = courses.filter((c) => !enrolledIds.has(c.id)).slice(0, 10)

  if (available.length === 0) return null

  return (
    <section className="mt-10" aria-labelledby="explorar-titulo">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="explorar-titulo" className="text-xl font-bold tracking-tight text-foreground">
            Explora más cursos
          </h2>
          <p className="mt-1 text-sm text-muted">Amplía tus certificaciones: añade cursos a tu carrito desde aquí.</p>
        </div>
        <div className="flex items-center gap-2">
          {count > 0 && (
            <Link
              to="/carrito"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10 animate-fade-in"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Ir al carrito ({count})
            </Link>
          )}
          <Link
            to="/cursos"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Ver catálogo completo
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {available.map((course, index) => {
          const inCart = isInCart(course.id)
          return (
            <article
              key={course.id}
              className="group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md animate-fade-up"
              style={{ "--i": Math.min(index, 6) } as React.CSSProperties}
            >
              <Link to={`/cursos/${course.id}`} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
                <img
                  src={course.image}
                  alt=""
                  loading="lazy"
                  className="h-28 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <span className="w-fit rounded-md bg-muted-surface px-2 py-0.5 text-[11px] font-medium text-muted">
                  {course.type}
                </span>
                <Link
                  to={`/cursos/${course.id}`}
                  className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:text-primary"
                >
                  {course.title}
                </Link>
                <div className="mt-auto flex items-center justify-between pt-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {currency.format(estimateCoursePrice(course.duration))}
                  </span>
                </div>
                {inCart ? (
                  <Link
                    to="/carrito"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/[0.06] px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                  >
                    <CheckIcon className="h-4 w-4" />
                    En tu carrito
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => addItem(course.id)}
                    className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Añadir al carrito
                  </button>
                )}
              </div>
            </article>
          )
        })}

        <Link
          to="/cursos"
          className="flex w-48 shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 bg-primary/[0.03] p-6 text-center text-sm font-semibold text-primary transition hover:bg-primary/[0.07]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowRightIcon className="h-5 w-5" />
          </span>
          Ver los {courses.length} cursos del catálogo
        </Link>
      </div>
    </section>
  )
}
