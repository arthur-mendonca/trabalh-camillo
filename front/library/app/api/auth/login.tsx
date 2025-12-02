import apiInstance from ".."



export const login = async (email: string, password: string) => {
    try {
        const res = await apiInstance.api.post("/auth/login", { email, password })
        console.log("resposta login", res.data);

        return res.data
    } catch (error) {
        console.log(error)
    }
}
