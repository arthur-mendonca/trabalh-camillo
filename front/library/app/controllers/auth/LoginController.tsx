"use client"
import { useState } from "react"
import { LoginForm } from "../../ui/auth/components/LoginForm"
import { login } from "@/app/api/auth/login"

export const LoginController = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login(email, password)
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
