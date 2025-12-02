import { User } from "@/app/types/users"
import apiInstance from ".."

type PartialUserProps = Partial<Pick<User, "email" | "name">>

export type UpdateUserBody = PartialUserProps & {
    password?: string
}

type UpdateUserProps = {
    userId: string
    payload: UpdateUserBody
}

export const updateUser = async ({ userId, payload }: UpdateUserProps): Promise<User | undefined> => {
    try {
        const res = await apiInstance.api.patch(`/users/${userId}`, payload)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
