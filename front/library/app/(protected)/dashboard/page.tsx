import { User } from "@/app/types/users"

type DashboardProps = {
    user: User | null
}

export default function Dashboard({ user }: DashboardProps) {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Dashboard protegido</h2>
            <p className="mt-2 text-zinc-600">Bem-vindo, {user?.name}! Você está autenticado.</p>
        </div>
    )
}