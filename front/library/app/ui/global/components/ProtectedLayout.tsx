"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const hasToken = document.cookie.split(";").some(c => c.trim().startsWith("auth_token="))
    if (!hasToken) {
      router.replace("/")
    }
  }, [router])

  return <>
    {children}
  </>
}