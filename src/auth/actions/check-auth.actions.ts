import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthActions = async (): Promise<AuthResponse> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token Found');

    try {
        const { data } = await tesloApi.get<AuthResponse>('auth/check-status');
        localStorage.setItem('token', data.token);
        return data;

    } catch (e) {
        console.log(e);
        localStorage.removeItem('token');
        throw new Error('Token expired or not valid');
    }
}
