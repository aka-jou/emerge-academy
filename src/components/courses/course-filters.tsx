import { ChevronDownIcon, SearchIcon } from "../icons"
import { filterOptions } from "../../data/courses"

type SelectFieldProps = {
  label: string
  options: string[]
  placeholder: string
}

function SelectField({ label, options, placeholder }: SelectFieldProps) {
  return (
    <label className="flex min-w-[8.5rem] flex-1 flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-lg border border-border bg-card py-2.5 pl-3 pr-9 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
          defaultValue=""
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
    </label>
  )
}

export function CourseFilters() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex flex-1 flex-wrap gap-4">
          <SelectField label="Módulo" options={filterOptions.modulo} placeholder="Todos" />
          <SelectField label="Modalidad" options={filterOptions.modalidad} placeholder="Todas" />
          <SelectField label="Ciudad/Sede" options={filterOptions.ciudad} placeholder="Todas" />
          <SelectField label="Duración" options={filterOptions.duracion} placeholder="Todas" />
          <SelectField label="Nivel" options={filterOptions.nivel} placeholder="Todos" />
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Aplicar
          </button>
          <button
            type="button"
            className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder="Buscar por nombre del curso o módulo..."
          className="w-full rounded-lg border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
          aria-label="Buscar por nombre del curso o módulo"
        />
      </div>
    </div>
  )
}
