"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/list", label: "List Cycle" },
  ]

  return (
    <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-white">LOOP</span>
          <span className="text-[#39FF14]">.</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href ? "text-[#39FF14]" : "text-gray-300 hover:text-[#39FF14]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/auth">
            <Button
              variant="outline"
              className="border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-black bg-transparent"
            >
              Login
            </Button>
          </Link>
          <Link href="/auth">
            <Button className="bg-[#39FF14] text-black hover:bg-[#39FF14]/90 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
