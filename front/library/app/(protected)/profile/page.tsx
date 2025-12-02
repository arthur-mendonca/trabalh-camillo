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
        handleSubmit
    } = UserProfileController()

    return (
        <PageBox>
            <h2 className="text-2xl font-semibold">
                Meu perfil
            </h2>

            <UserProfileForm
                name={name}
                email={email}
                password={password}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
        </PageBox>
    )
}
