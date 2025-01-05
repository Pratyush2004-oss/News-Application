import { create } from 'zustand';
import axios from 'axios';
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    error: null,

    register: async (input) => {
        const response = await axios.post('/api/auth/register', input);
        console.log(response.data)
        if (response.data.success) {
            set({ user: response.data.user });
        }
        else {
            set({ error: response.data.message });
        }
    },

    login: async (input) => {
        const response = await axios.post('/api/auth/login', input);
        console.log(response.data)
        if (response.data.success) {
            set({ user: response.data.user });
        }
        else {
            set({ error: response.data.message });
            alert(response.data.message || 'Something went wrong');
        }

    },

    check_user: async () => {

    },

    check_admin: async () => { },

    logout: async () => { }
}))