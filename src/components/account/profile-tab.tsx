import { useState } from "react"
import { PencilIcon, CheckIcon } from "../icons"
import { profileInfo } from "../../data/account"

type Field = {
  id: keyof typeof profileInfo
  label: string
  type: string
  optional?: boolean
  autoComplete?: string
}

const fields: Field[] = [
  { id: "fullName", label: "Nombre completo", type: "text", autoComplete: "name" },
  { id: "email", label: "Correo electrónico de contacto", type: "email", autoComplete: "email" },
  { id: "phone", label: "Teléfono", type: "tel", autoComplete: "tel" },
  { id: "company", label: "Empresa actual", type: "text", optional: true, autoComplete: "organization" },
  { id: "cityCountry", label: "Ciudad / País", type: "text", autoComplete: "address-level2" },
]

export function ProfileTab() {
  const [values, setValues] = useState(profileInfo)
  const [saved, setSaved] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-foreground">Información personal</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Mantén tus datos actualizados para tus certificaciones y comunicaciones del programa.
        </p>
      </div>

      {/* Avatar con botón de editar foto superpuesto */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src="/images/maria-avatar.png"
            alt={`Foto de perfil de ${values.fullName}`}
            className="h-24 w-24 rounded-full border-2 border-border object-cover"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-1 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition hover:bg-primary-hover"
            aria-label="Editar foto de perfil"
          >
            <PencilIcon className="h-4 w-4" />
          </button>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Foto de perfil</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            JPG, PNG o GIF. Tamaño máximo recomendado: 2&nbsp;MB.
          </p>
        </div>
      </div>

      {/* Formulario en grid de dos columnas */}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className={field.id === "cityCountry" ? "sm:col-span-2" : undefined}>
            <label htmlFor={field.id} className="block text-sm font-medium text-foreground">
              {field.label}
              {field.optional && <span className="ml-1 text-xs font-normal text-muted">(opcional)</span>}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.id]}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
        >
          <CheckIcon className="h-4 w-4" />
          Guardar cambios del perfil
        </button>
        {saved && <span className="text-sm font-medium text-primary">Cambios guardados correctamente.</span>}
      </div>
    </form>
  )
}
