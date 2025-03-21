"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Only show the navbar on pages other than the home page
  const showNavbar = pathname !== "/"

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  )
}

