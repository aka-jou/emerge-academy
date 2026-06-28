import { Navbar } from "../components/landing/navbar"
import { Hero } from "../components/landing/hero"
import { Benefits } from "../components/landing/benefits"
import { WhatIsGWO } from "../components/landing/what-is-gwo"
import { UpcomingDates } from "../components/landing/upcoming-dates"
import { Testimonials } from "../components/landing/testimonials"
import { TrustLogos } from "../components/landing/trust-logos"
import { Footer } from "../components/landing/footer"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <WhatIsGWO />
        <UpcomingDates />
        <Testimonials />
        <TrustLogos />
      </main>
      <Footer />
    </div>
  )
}
