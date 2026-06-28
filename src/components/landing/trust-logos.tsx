const companies = ["Enel", "Vestas", "Acciona", "Iberdrola", "Siemens", "Nordex"]

export function TrustLogos() {
  return (
    <section id="empresas" className="scroll-mt-16 border-y border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Nuestros egresados trabajan en
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-16">
          {companies.map((company) => (
            <span
              key={company}
              className="text-xl font-bold tracking-tight text-muted/60 grayscale transition hover:text-foreground hover:grayscale-0 sm:text-2xl"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
