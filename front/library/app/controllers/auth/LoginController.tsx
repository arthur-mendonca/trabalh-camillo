"use client"
import { useState } from "react"
import { LoginForm } from "../../ui/auth/components/LoginForm"
import { login } from "@/app/api/auth/login"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/app/context/UserContext"

export const LoginController = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { setUser } = useUserContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await login(email, password)
    if (res) {
      setUser(res.user);
      router.push("/dashboard")
    }
  }

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  )
}
