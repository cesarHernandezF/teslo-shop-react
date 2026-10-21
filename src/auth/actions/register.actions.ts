import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";


export const registerActions = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('auth/register', {
            email: email,
            password: password,
            fullName: fullName,
        });
        return data;
    } catch (error) {
        throw error;
    }
}