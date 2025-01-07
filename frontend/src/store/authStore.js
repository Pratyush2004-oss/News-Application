import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_API } from '../assets/API';
axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    error: null,
    isAdmin: false,
    isAuthenticated: false,
    isCheckingAuth: true,
    isCheckingAdmin: true,

    register: async (input) => {
        try {
            set({ error: null })
            const response = await axios.post(`${BASE_API}/api/users/register`, input, { headers: { 'Content-Type': 'application/json' } });
            console.log(response.data)
            if (response.data.success) {
                toast.success(response.data.message);
            }
            else {
                set({ error: response.data.message });
                toast.error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            set({ error: error.message })
            toast.error(error.message || 'Something went wrong');
        }
    },

    login: async (input) => {
        try {
            if (!input.email || !input.password) {
                toast.error('Please fill all the fields');
            }
            const response = await axios.post(`${BASE_API}/api/users/login`, input);
            if (response.data.success) {
                set({ user: response.data.user });
                toast.success(response.data.message);
                return true;
            }
            else {
                set({ error: response.data.message });
                toast.error(response.data.message || 'Something went wrong');
                return false
            }
        } catch (error) {
            set({ error: error.message })
            toast.error(error.message || 'Something went wrong');

        }
    },

    check_user: async () => {
        try {
            set({ error: null, isAuthenticated: false, isCheckingAuth: true })
            const response = await axios.get(`${BASE_API}/api/users/check-auth`);
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({ error: error.message, isCheckingAuth: false })
        }
    },

    check_admin: async () => {
        try {
            set({ error: null, isAdmin: false, isCheckingAdmin: true })
            const response = await axios.get(`${BASE_API}/api/users/check-admin`);
            if (response.data.success) {
                set({ user: response.data.user, isAdmin: true, isCheckingAdmin: false });
            }
        }
        catch (error) {
            set({ error: error.message, isCheckingAdmin: false })
        }
    },

    logout: async () => {
        try {
            set({ error: null })
            const response = await axios.get(`${BASE_API}/api/users/logout`);
            if (response.data.success) {
                set({ user: null, isAdmin: false, isAuthenticated: false });
                toast.success(response.data.message);
            }
            else {
                set({ error: response.data.message });
            }
        } catch (error) {
            set({ error: error.message })
        }
    }
}))