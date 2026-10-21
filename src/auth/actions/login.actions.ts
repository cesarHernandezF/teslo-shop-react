import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";


export const loginActions = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('auth/login', {
            email: email,
            password: password,
        });
        return data;
    } catch (error) {
        throw error;
    }
}