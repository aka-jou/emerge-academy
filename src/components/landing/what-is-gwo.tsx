const tags = ["GWO", "ISO 9001", "NOM-009-STPS", "BST", "BTT", "ART"]

export function WhatIsGWO() {
  return (
    <section id="sedes" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 overflow-hidden rounded-2xl border border-border shadow-sm lg:order-1">
          <img
            src="/images/wind-farm.png"
            alt="Parque eólico con aerogeneradores donde trabajan los técnicos certificados GWO"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            ¿Qué es GWO?
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            La <strong className="text-foreground">Global Wind Organisation (GWO)</strong> es el
            estándar internacional de seguridad y formación para la industria eólica. Sus
            certificaciones son reconocidas mundialmente y exigidas por fabricantes y operadores para
            trabajar en aerogeneradores.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            En EMERGE Academy impartimos estos estándares con infraestructura real, equipos
            homologados y prácticas que replican las condiciones de campo, garantizando una formación
            válida en cualquier proyecto eólico del mundo.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
