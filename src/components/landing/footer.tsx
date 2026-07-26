import { Logo } from "./logo"
import { MailIcon, WhatsAppIcon } from "../icons"

const courseLinks = ["Trabajo Seguro en Alturas", "Primeros Auxilios", "Espacios Confinados", "Riesgo Eléctrico"]
const serviceLinks = ["Universidad Corporativa", "Capacitación en sitio", "Diagnóstico de necesidades", "Consultoría en seguridad"]

export function Footer() {
  return (
    <footer id="contacto" className="scroll-mt-16 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Capacitación especializada en seguridad industrial, protección civil, atención
              prehospitalaria y gestión de emergencias. Respaldados por Grupo Emerge RM.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Cursos</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {courseLinks.map((link) => (
                <li key={link}>
                  <a href="#cursos" className="text-sm transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Servicios</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm transition hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contacto</h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a href="mailto:contacto@emerge.academy" className="flex items-center gap-2.5 text-sm transition hover:text-white">
                  <MailIcon className="h-4 w-4" />
                  contacto@emerge.academy
                </a>
              </li>
              <li>
                <a href="https://wa.me/520000000000" className="flex items-center gap-2.5 text-sm transition hover:text-white">
                  <WhatsAppIcon className="h-4 w-4" />
                  +52 000 000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-7 sm:flex-row">
          <p className="text-xs">© {new Date().getFullYear()} Universidad Emerge. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs transition hover:text-white">Aviso de privacidad</a>
            <a href="#" className="text-xs transition hover:text-white">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
