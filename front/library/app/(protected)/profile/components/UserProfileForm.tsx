"use client"
import Input from "@/app/ui/global/components/Input";

type UserProfileFormProps = {
    name: string
    email: string
    password: string
    setName: (name: string) => void
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}

export default function UserProfileForm({
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    handleSubmit,
}: UserProfileFormProps) {
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <Input
                id="name"
                label="Nome"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                id="password"
                label="Senha"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="mt-4 w-full rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-700">
                Atualizar
            </button>
        </form>
    )
}