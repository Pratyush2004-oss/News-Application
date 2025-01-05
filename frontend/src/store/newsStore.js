import axios from 'axios';
import { create } from 'zustand'
axios.defaults.withCredentials = true

export const useNewsStore = create((set, get) => ({
    news: [],
    currentNews: null,
    error: null,

    fetchNews: async () => {
        try {
            set({ error: null })
            const response = await axios.get(`/api/news`);
            if (response.data.success) {
                set({ news: response.data.news })
            }
        } catch (error) {
            set({ error: error.message })
        }
    },

    fetchNewsFromAPI: async () => {
        try {
            await axios.get(`${API_URL}/from-api`);
        } catch (error) {
            set({ error: error.message })
        }
    },

    fetchSingleNews: async (id) => {
        try {
            set({ error: null })
            const response = await axios.get(`${API_URL}/${id}`);
        } catch (error) {

        }
    }

}))