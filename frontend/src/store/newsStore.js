import axios from 'axios';
import { create } from 'zustand'
axios.defaults.withCredentials = true

export const useNewsStore = create((set, get) => ({
    news: [],
    currentNews: null,
    error: null,
    loading: false,
    count: 0,
    featured: [],

    fetchNews: async () => {
        try {
            set({ error: null, loading: true })
            const response = await axios.get(`/api/news`);
            if (response.data.success) {
                set({ news: response.data.news, count: response.data.count })
            }
        } catch (error) {
            set({ error: error.message })
        }
        finally {
            set({ loading: false })
        }
    },

    fetchNewsFromAPI: async () => {
        try {
            set({ error: null })
            await axios.get(`/api/from-api`);
        } catch (error) {
            set({ error: error.message })
        }
    },

    fetchSingleNews: async (id) => {
        try {
            set({ error: null, loading: true })
            const response = await axios.get(`/api/news/${id}`);
            if (response.data.success) {
                set({ currentNews: response.data.news })
            }
            else {
                set({ error: response.data.message })
            }
        } catch (error) {
            set({ error: error.message })
        }
        finally {
            set({ loading: false })
        }
    },

    fetchFeatured: async () => {
        try {
            set({ error: null, loading: true })
            const response = await axios.get(`/api/news/featured`);
            console.log(response.data)
            if (response.data.success) {
                set({ featured: response.data.news })
            }
        } catch (error) {
            console.log(error)
            set({ error: error.message })
        }
        finally {
            set({ loading: false })
        }
    },

}))