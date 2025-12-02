"use client"
import { UserProvider } from "./UserContext"

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}