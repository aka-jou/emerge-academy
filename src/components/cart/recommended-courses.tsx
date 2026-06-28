import { PlusIcon, ClockIcon } from "../icons"

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
})

type Recommended = {
  id: string
  title: string
  duration: string
  price: number
  gradient: string
}

const recommended: Recommended[] = [
  {
    id: "bst-incendios",
    title: "BST – Extinción de Incendios",
    duration: "16 horas",
    price: 1200,
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: "bst-primeros-auxilios",
    title: "BST – Primeros Auxilios",
    duration: "40 horas",
    price: 1800,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: "bst-cargas",
    title: "BST – Manipulación de Cargas",
    duration: "32 horas",
    price: 1500,
    gradient: "from-teal-500 to-emerald-500",
  },
]

type RecommendedCoursesProps = {
  onAdd: (id: string) => void
}

export function RecommendedCourses({ onAdd }: RecommendedCoursesProps) {
  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-bold text-foreground">Cursos recomendados</h2>
      <p className="mt-1 text-sm text-muted">Complementa tu certificación añadiéndolos al carrito.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-background p-3"
          >
            <div className={`h-16 w-16 shrink-0 rounded-lg bg-gradient-to-br ${course.gradient}`} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground">{course.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <ClockIcon className="h-3.5 w-3.5" />
                {course.duration}
              </p>
              <p className="mt-1 text-sm font-bold text-foreground">{currency.format(course.price)}</p>
            </div>
            <button
              type="button"
              aria-label={`Añadir ${course.title} al carrito`}
              onClick={() => onAdd(course.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary-hover"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
