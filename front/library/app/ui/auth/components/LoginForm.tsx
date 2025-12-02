"use client"

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
            className="flex flex-col gap-1 ">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
            </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300" />

            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
            </label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300" />

            <button
                type="submit"
                className="mt-4 w-full rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-700">
                Login
            </button>
        </form>
    )

}
