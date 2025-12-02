import { createContext, useContext, useState } from "react";

import { User } from "../types/users";
import { UserProviderProps } from "../types/users/userContext";
import apiInstance from "../api";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserProviderProps | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const handleLogout = () => {
        document.cookie = "auth_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        if (typeof apiInstance.clearToken === "function") {
            apiInstance.clearToken()
        }
        setUser(null)
        router.push("/")
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            handleLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const ctx = useContext(UserContext)
    if (!ctx) {
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return ctx
}