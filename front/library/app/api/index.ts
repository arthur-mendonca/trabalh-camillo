import axios, { AxiosInstance, AxiosHeaders } from "axios";

class Api {
    api: AxiosInstance;

    constructor(api?: string) {
        this.api = axios.create({
            baseURL: api
                || (process.env.NEXT_PUBLIC_API_URL || "https://library.72-60-1-117.nip.io/"),
        })

        this.api.interceptors.request.use((config) => {
            if (typeof document !== "undefined") {
                const tokenCookie = document.cookie.split(";").find(c => c.trim().startsWith("auth_token="))
                const token = tokenCookie ? tokenCookie.split("=")[1] : undefined
                if (token) {
                    if (config.headers instanceof AxiosHeaders) {
                        config.headers.set("Authorization", `Bearer ${token}`)
                    } else {
                        config.headers = Object.assign({}, config.headers || {}, { Authorization: `Bearer ${token}` })
                    }
                }
            }
            return config
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
                document.cookie = `auth_token=${token}; path=/; max-age=3600`
            }
            return response
        })
    }

    clearToken() {
        if (typeof document !== "undefined") {
            document.cookie = "auth_token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
    }
}

const apiInstance = new Api();
export default apiInstance;
