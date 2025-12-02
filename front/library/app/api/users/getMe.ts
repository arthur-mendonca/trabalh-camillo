import apiInstance from "..";

export const getMe = async () => {
    try {
        const res = await apiInstance.api.get("/users/me")
        console.log("resposta get me", res.data);

        return res.data
    } catch (error) {
        console.log(error)
    }
}