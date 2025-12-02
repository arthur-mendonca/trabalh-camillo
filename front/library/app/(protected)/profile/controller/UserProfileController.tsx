"use client"
import { UpdateUserBody, updateUser } from "@/app/api/users/update";
import { useUserContext } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { User } from "@/app/types/users";

export default function UserProfileController() {
    const { user, setUser } = useUserContext()
    const [formData, setFormData] = useState<UpdateUserBody>({
        email: user?.email || "",
        name: user?.name || "",
        password: ""
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user) return
        const payload: UpdateUserBody = {}
        if (formData.name && formData.name !== (user as User).name) {
            payload.name = formData.name
        }
        if (formData.email && formData.email !== (user as User).email) {
            payload.email = formData.email
        }
        if (formData.password && formData.password.trim().length > 0) {
            payload.password = formData.password
        }
        if (Object.keys(payload).length === 0) {
            return
        }
        console.log("formData", formData);

        const updated = await updateUser({ userId: (user as User).id as string, payload })
        if (updated) {
            setUser(updated)
        }
    }

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || "",
            }))
        }
    }, [user])

    return {
        name: formData.name || "",
        email: formData.email || "",
        password: formData.password || "",
        setName: (name: string) => setFormData((prev) => ({ ...prev, name })),
        setEmail: (email: string) => setFormData((prev) => ({ ...prev, email })),
        setPassword: (password: string) => setFormData((prev) => ({ ...prev, password })),
        handleSubmit,
    }
}
