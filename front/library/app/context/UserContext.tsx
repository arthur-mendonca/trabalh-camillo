import { createContext, useContext, useState } from "react";
import { User } from "../types/users";
import { UserProviderProps } from "../types/users/userContext";

const UserContext = createContext<UserProviderProps | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={
            {
                user,
                setUser
            }
        }>
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