import { SettingsIcon } from "../icons"

export function CourseEquipment({ equipment }: { equipment?: string[] }) {
  if (!equipment || equipment.length === 0) return null

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
        <SettingsIcon className="h-4 w-4 text-primary" />
        Equipo y materiales del curso
      </h3>
      <ul className="mt-3 flex flex-col gap-2.5">
        {equipment.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
