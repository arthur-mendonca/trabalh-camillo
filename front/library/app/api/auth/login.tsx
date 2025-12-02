import { User } from "@/app/types/users";
import apiInstance from ".."

type loginResponse = {
    access_token: string;
    user: User;
}

export const login = async (email: string, password: string): Promise<loginResponse | undefined> => {
    try {
        const res = await apiInstance.api.post("/auth/login", { email, password })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
