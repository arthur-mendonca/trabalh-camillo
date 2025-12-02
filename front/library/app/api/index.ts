import axios, { AxiosInstance, AxiosHeaders } from "axios";

class Api {
    api: AxiosInstance;

    constructor(api?: string) {
        this.api = axios.create({
            baseURL: api || ((import.meta as { env?: { NEXT_PUBLIC_API_URL?: string } }).env?.NEXT_PUBLIC_API_URL || "http://localhost:3000"),
        })

        this.api.interceptors.response.use((response) => {
            let bearer: string | undefined
            const h = response.headers
            if (h instanceof AxiosHeaders) {
                const auth = h.get("authorization")
                bearer = auth && typeof auth === "string" && auth.startsWith("Bearer ") ? auth.slice(7) : undefined
            } else {
                const auth = (h as Record<string, string | undefined>)?.authorization
                bearer = auth && auth.startsWith("Bearer ") ? auth.slice(7) : undefined
            }
            const bodyToken = (response.data && response.data.access_token as string | undefined)
            const token = bodyToken || bearer
            if (typeof window !== "undefined" && token) {
                localStorage.setItem("token", token)
            }
            return response
        })
    }
}

const apiInstance = new Api();
export default apiInstance;
