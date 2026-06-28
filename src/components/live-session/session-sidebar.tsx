import {
  CheckIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  GlobeIcon,
  HeadsetIcon,
  HelpCircleIcon,
  SettingsIcon,
} from "../icons"
import type { LiveSession } from "../../data/dashboard"

const infoRows = (session: LiveSession) => [
  { Icon: CalendarIcon, label: "Fecha", value: session.date },
  { Icon: ClockIcon, label: "Hora", value: session.time },
  { Icon: UsersIcon, label: "Participantes", value: `${session.participants} estudiantes registrados` },
  { Icon: GlobeIcon, label: "Idioma", value: session.language },
]

const helpLinks = [
  { Icon: HeadsetIcon, label: "Soporte técnico", href: "#soporte" },
  { Icon: HelpCircleIcon, label: "Centro de ayuda", href: "#ayuda" },
  { Icon: SettingsIcon, label: "Configuración de audio/video", href: "#config" },
]

export function SessionSidebar({ session }: { session: LiveSession }) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Acceso habilitado */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
            <CheckIcon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-green-800">Acceso habilitado</h3>
            <p className="mt-1 text-sm leading-relaxed text-green-700">
              Tu inscripción cubre las sesiones en vivo de este curso. Ya puedes unirte cuando comience.
            </p>
          </div>
        </div>
      </div>

      {/* Información de la sesión */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-base font-bold text-foreground">Información de la sesión</h3>
        <ul className="mt-4 flex flex-col gap-4">
          {infoRows(session).map(({ Icon, label, value }) => (
            <li key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
              <div>
                <p className="text-xs font-medium text-muted">{label}</p>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ¿Necesitas ayuda? */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="text-base font-bold text-foreground">¿Necesitas ayuda?</h3>
        <div className="mt-4 flex flex-col gap-2">
          {helpLinks.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted-surface/40 px-3.5 py-3 text-sm font-medium text-foreground transition hover:bg-muted-surface"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted-surface text-primary">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
