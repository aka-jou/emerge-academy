import { useEffect, useState } from "react"
import { PencilIcon, CheckIcon } from "../icons"
import { useAuth } from "../../lib/auth"

type FormValues = {
  name: string
  email: string
  phone: string
  company: string
  jobTitle: string
  industry: string
  rfc: string
  birthDate: string
  educationLevel: string
  yearsExperience: string
  referralSource: string
  cityCountry: string
}

type Field = {
  id: keyof FormValues
  label: string
  type: string
  optional?: boolean
  readOnly?: boolean
  autoComplete?: string
}

const fields: Field[] = [
  { id: "name", label: "Nombre completo", type: "text", autoComplete: "name" },
  { id: "email", label: "Correo electrónico de contacto", type: "email", autoComplete: "email", readOnly: true },
  { id: "phone", label: "Teléfono", type: "tel", optional: true, autoComplete: "tel" },
  { id: "jobTitle", label: "Puesto en la empresa", type: "text", optional: true, autoComplete: "organization-title" },
  { id: "company", label: "Empresa / Razón social", type: "text", optional: true, autoComplete: "organization" },
  { id: "industry", label: "Sector", type: "text", optional: true },
  { id: "rfc", label: "RFC de la empresa", type: "text", optional: true },
  { id: "birthDate", label: "Fecha de nacimiento", type: "date", optional: true, autoComplete: "bday" },
  { id: "educationLevel", label: "Escolaridad", type: "text", optional: true },
  { id: "yearsExperience", label: "Años de experiencia en la industria", type: "number", optional: true },
  { id: "referralSource", label: "¿Cómo nos conociste?", type: "text", optional: true },
  { id: "cityCountry", label: "Ciudad / País", type: "text", optional: true, autoComplete: "address-level2" },
]

export function ProfileTab() {
  const { user, updateProfile } = useAuth()
  const [values, setValues] = useState<FormValues>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    company: user?.company ?? "",
    jobTitle: user?.jobTitle ?? "",
    industry: user?.industry ?? "",
    rfc: user?.rfc ?? "",
    birthDate: user?.birthDate ?? "",
    educationLevel: user?.educationLevel ?? "",
    yearsExperience: user?.yearsExperience !== undefined ? String(user.yearsExperience) : "",
    referralSource: user?.referralSource ?? "",
    cityCountry: user?.cityCountry ?? "",
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!user) return
    setValues({
      name: user.name,
      email: user.email,
      phone: user.phone ?? "",
      company: user.company ?? "",
      jobTitle: user.jobTitle ?? "",
      industry: user.industry ?? "",
      rfc: user.rfc ?? "",
      birthDate: user.birthDate ?? "",
      educationLevel: user.educationLevel ?? "",
      yearsExperience: user.yearsExperience !== undefined ? String(user.yearsExperience) : "",
      referralSource: user.referralSource ?? "",
      cityCountry: user.cityCountry ?? "",
    })
  }, [user])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await updateProfile({
      name: values.name,
      phone: values.phone,
      company: values.company,
      jobTitle: values.jobTitle,
      industry: values.industry,
      rfc: values.rfc,
      birthDate: values.birthDate || undefined,
      educationLevel: values.educationLevel,
      yearsExperience: values.yearsExperience ? Number(values.yearsExperience) : undefined,
      referralSource: values.referralSource,
      cityCountry: values.cityCountry,
    })
    setSubmitting(false)
    if (result.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } else {
      setError(result.error ?? "No se pudo guardar el perfil.")
    }
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
          <div
            aria-hidden="true"
            className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-border bg-muted-surface text-2xl font-bold text-muted"
          >
            {values.name.trim().charAt(0).toUpperCase() || "?"}
          </div>
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

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm font-medium text-destructive"
        >
          {error}
        </p>
      )}

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
              readOnly={field.readOnly}
              value={values[field.id]}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.id]: e.target.value }))}
              className={
                field.readOnly
                  ? "mt-2 w-full cursor-not-allowed rounded-lg border border-border bg-muted-surface px-3.5 py-2.5 text-sm text-muted outline-none"
                  : "mt-2 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-ring/30"
              }
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-6">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CheckIcon className="h-4 w-4" />
          {submitting ? "Guardando…" : "Guardar cambios del perfil"}
        </button>
        {saved && <span className="text-sm font-medium text-primary">Cambios guardados correctamente.</span>}
      </div>
    </form>
  )
}
