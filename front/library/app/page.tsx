import { LoginController } from "./controllers/auth/LoginController";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full gap-5 max-w-3xl flex-col items-center justify-center dark:bg-black">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
          Biblioteca
        </h1>

        <LoginController />
      </main>
    </div>
  );
}
