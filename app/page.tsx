import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin, Shield, Wallet, Users } from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const features = [
    {
      icon: MapPin,
      title: "GPS Tracking",
      description: "Track your cycle live with real-time location updates",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Campus-verified users i.e. College ID verification ensures secure and trusted rentals",
    },
    {
      icon: Wallet,
      title: "Easy Payments",
      description: "Secure prepaid wallet system for all transactions with instant refunds",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with fellow students on your campus and connect with students thru our in app chat facility.",
    },
  ]

  const stats = [
    { number: "500+", label: "Active Users" },
    { number: "150+", label: "Cycles Listed" },
    { number: "2000+", label: "Rides Completed" },
    { number: "4.8", label: "Average Rating" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#39FF14]/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-3">
              Share <span className="text-[#39FF14]">Cycles</span>,<br />
              Share <span className="text-[#39FF14]">Freedom</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-extralight md:text-lg leading-6 tracking-tight">
              {
                "Connect with your campus through peer-to-peer cycle sharing.       \nRent, lend, and explore sustainably."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_30px_rgba(57,255,20,0.4)] text-lg px-8 py-6"
                >
                  Start Sharing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black text-lg px-8 py-6 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#39FF14] rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#39FF14] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-[#39FF14] rounded-full animate-pulse delay-500"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={500} suffix="+" duration={2500} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={150} suffix="+" duration={2000} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Cycles Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={2000} suffix="+" duration={3000} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Rides Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#39FF14] mb-2">
                <AnimatedCounter end={4.8} decimals={1} duration={2200} />
              </div>
              <div className="text-gray-400 text-sm md:text-base">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your <span className="text-[#39FF14]">trusted</span> partner for
              <br />
              campus mobility.
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              LOOP unites and secures a growing ecosystem of campus cycle sharing with verified users and seamless
              experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-[#39FF14]/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <feature.icon className="h-8 w-8 text-[#39FF14] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How <span className="text-[#39FF14]">LOOP</span> Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#39FF14]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#39FF14]">01</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[rgba(127,206,0,1)]">List Your Cycle</h3>
                <p className="text-gray-400">
                  Upload photos, set your price, and make your cycle available for fellow students.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#39FF14]/10 border-[#39FF14]/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-black">02</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 bg-transparent text-[rgba(127,206,0,1)]">Book & Ride</h3>
                <p className="text-gray-400">Find nearby cycles, book instantly, and start your sustainable journey.</p>
                <Link href="/explore" className="inline-flex items-center text-[#39FF14] mt-4 hover:underline">
                  Explore Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#39FF14]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-[#39FF14]">03</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[rgba(127,206,0,1)]">Earn & Track</h3>
                <p className="text-gray-400">
                  Monitor your earnings, track cycle usage, and build your reputation in the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#39FF14]/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to join the <span className="text-[#39FF14]">revolution</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start sharing cycles today and become part of the sustainable campus mobility movement.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_30px_rgba(57,255,20,0.4)] text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">LOOP</span>
                <span className="text-[#39FF14]">.</span>
              </div>
              <p className="text-gray-400">Connecting campus communities through sustainable cycle sharing.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/explore" className="hover:text-[#39FF14]">
                    Explore Cycles
                  </Link>
                </li>
                <li>
                  <Link href="/list" className="hover:text-[#39FF14]">
                    List Your Cycle
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-[#39FF14]">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-[#39FF14]">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-[#39FF14]">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#39FF14]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/terms" className="hover:text-[#39FF14]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#39FF14]">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LOOP. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
