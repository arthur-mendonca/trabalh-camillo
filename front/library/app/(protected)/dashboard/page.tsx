"use client"
import { useUserContext } from "@/app/context/UserContext"

export default function Dashboard() {
    const { user } = useUserContext()
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Dashboard protegido</h2>
            <p className="mt-2 text-zinc-600">Bem-vindo, {user?.name}! Você está autenticado.</p>
        </div>
    )
}
