import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Features } from "@/components/Features"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] relative">
      {/* Diagonal Fade Grid Background - Top Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d1d5db 1px, transparent 1px),
            linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <div className="relative z-10">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto">
              Financial transparency shouldn&apos;t be a privilege — it should be a right.
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto mb-8">
              We&apos;re not here to sell you loans. We&apos;re here to empower you with information, connect you with trustworthy advisors, and ensure you never have to &ldquo;just sign here&rdquo; without understanding what&apos;s best for your financial future.
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
    </div>
  );
}
