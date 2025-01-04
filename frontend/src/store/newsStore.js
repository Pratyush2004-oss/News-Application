import { create } from 'zustand'
import axiosInstance from '../lib/axios';
export const useNewsStore = create((set, get) => ({
    news: [],
    currentNews: null,
    error: null,

    fetchNews: async () => {
        try {
            set({ error: null })
            const response = await axiosInstance.get("/news");
            console.log(response.data)
            if (response.data.success) {
                set({ news: response.data.news })
            }
            else {
                set({ error: response.data.message })
            }
        } catch (error) {
            set({ error: error.message })
        }
    },

    fetchNewsFromAPI: async () => {
        try {
            await axiosInstance.get('/news/from-api');
        } catch (error) {
            set({ error: error.message })
        }
    },

    fetchSingleNews: async (id) => {
        try {
            set({ error: null })
            const response = await axiosInstance.get(`/news/${id}`);
        } catch (error) {

        }
    }

}))