"use client"
import PageBox from "@/app/ui/protected/PageBox";
import UserProfileForm from "./components/UserProfileForm";
import UserProfileController from "./controller/UserProfileController";

export default function UserProfile() {
    const {
        name,
        email,
        password,
        setName,
        setEmail,
        setPassword,
        handleSubmit,
        role
    } = UserProfileController()
    return (
        <PageBox>
            <div className="p-6 bg-zinc-900 rounded-lg shadow-md max-w-[calc(100%-20px)] 
            mx-5 sm:max-w-[calc(100%-120px)] sm:mx-10 md:max-w-[calc(100%-160px)] md:mx-20 lg:max-w-[calc(100%-400px)] lg:mx-50 
            ">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold">
                        Meu perfil
                    </h2>
                    <div>
                        <p>Tipo de usuário</p>
                        <p className="font-sans">{role}</p>
                    </div>
                </div>

                <UserProfileForm
                    name={name}
                    email={email}
                    password={password}
                    setName={setName}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                />
            </div>
        </PageBox>
    )
}
