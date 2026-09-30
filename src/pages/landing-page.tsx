import { Navbar } from "../components/landing/navbar"
import { Hero } from "../components/landing/hero"
import { Benefits } from "../components/landing/benefits"
import { AboutUs } from "../components/landing/about-us"
import { Convenio } from "../components/landing/convenio"
import { UpcomingDates } from "../components/landing/upcoming-dates"
import { Testimonials } from "../components/landing/testimonials"
import { TrustLogos } from "../components/landing/trust-logos"
import { Footer } from "../components/landing/footer"
import { SmoothScroll } from "../lib/smooth-scroll"

export function LandingPage() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Benefits />
          <AboutUs />
          <Convenio />
          <UpcomingDates />
          <Testimonials />
          <TrustLogos />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  )
}
