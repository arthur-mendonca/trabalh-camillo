"use client"

import Input from "../../global/components/Input"

type LoginFormProps = {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
}

export const LoginForm = ({
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
}: LoginFormProps) => {

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-1 "
        >
            <Input
                id="email"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
            />
            <Input
                id="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />
            <button
                type="submit"
                className="mt-4 w-full rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-700">
                Login
            </button>
        </form>
    )

}
