import { User } from ".";

export interface UserProviderProps {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    handleLogout: () => void
}