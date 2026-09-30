import { SearchIcon } from "../icons"
import { LEVELS, type Level } from "../../lib/course-areas"

type SegmentedProps<T extends string> = {
  label: string
  options: T[]
  value: T | null
  onChange: (value: T | null) => void
  format?: (value: T) => string
}

function Segmented<T extends string>({ label, options, value, onChange, format }: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-2">
      <span className="text-xs font-semibold text-muted">{label}</span>
      <div className="flex rounded-full bg-card p-1 ring-1 ring-border">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? null : option)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active ? "bg-ink text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {format ? format(option) : option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type CourseFiltersProps = {
  query: string
  onQueryChange: (value: string) => void
  level: Level | null
  onLevelChange: (value: Level | null) => void
  duration: string | null
  onDurationChange: (value: string | null) => void
  durations: string[]
  total: number
  shown: number
  onClear: () => void
  hasFilters: boolean
}

export function CourseFilters(props: CourseFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
      <div className="relative w-full lg:max-w-xs">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={props.query}
          onChange={(e) => props.onQueryChange(e.target.value)}
          placeholder="Buscar por nombre o tema"
          aria-label="Buscar por nombre o tema"
          className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <Segmented label="Nivel" options={LEVELS} value={props.level} onChange={props.onLevelChange} />
        <Segmented
          label="Duración"
          options={props.durations}
          value={props.duration}
          onChange={props.onDurationChange}
          format={(d) => d.replace(" horas", " h")}
        />
      </div>

      <div className="flex items-center gap-3 lg:ml-auto">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-foreground">{props.shown}</span> de {props.total} cursos
        </p>
        {props.hasFilters && (
          <button
            type="button"
            onClick={props.onClear}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Quitar filtros
          </button>
        )}
      </div>
    </div>
  )
}
