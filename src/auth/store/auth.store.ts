import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginActions } from '../actions/login.actions';
import { checkAuthActions } from '../actions/check-auth.actions';
import { registerActions } from '../actions/register.actions';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    //Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,

    //Getters
    isAdmin: () => boolean;


    //Actions
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    //Implementación del Store
    user: null,
    token: null,
    authStatus: 'checking',

    //Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },

    //Actions
    login: async (email: string, password: string) => {
        try {
            const data = await loginActions(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (e) {
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            localStorage.removeItem('token');
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthActions();
            set({ user: user, token: token, authStatus: 'authenticated' });
            return true;
        } catch (e) {
            set({ user: undefined, token: undefined, authStatus: 'not-authenticated' })
            return false;
        }
    },

    register: async (email: string, password: string, fullName: string) => {
        try {
            const data = await registerActions(email, password, fullName);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (e) {
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            localStorage.removeItem('token');
            return false;
        }
    },
}))