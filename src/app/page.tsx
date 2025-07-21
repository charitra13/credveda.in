import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="about" className="py-16 lg:py-24 bg-blue-600 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-white mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
              Financial transparency shouldn't be a privilege — it should be a right.
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
              We're not here to sell you loans. We're here to empower you with information, connect you with trustworthy advisors, and ensure you never have to "just sign here" without understanding what's best for your financial future.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
              Analyze Your Credit Profile Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
