import axios from 'axios';
import { create } from 'zustand'
import { BASE_API } from '../assets/API';
import toast from 'react-hot-toast';
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
            const response = await axios.get(`${BASE_API}/api/news`);
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
            const response = await axios.get(`${BASE_API}/api/news/from-api`);
            if (response.data.success) {
            }
            else {
            }
        } catch (error) {
            set({ error: error.message })
        }
    },

    fetchSingleNews: async (id) => {
        try {
            set({ error: null, loading: true })
            const response = await axios.get(`${BASE_API}/api/news/${id}`);
            if (response.data.success) {
                set({ currentNews: response.data.news })
            }
            else {
                set({ error: response.data.message })
            }
        } catch (error) {
            console.log(error)
            set({ error: error.message })
        }
        finally {
            set({ loading: false })
        }
    },

    fetchFeatured: async () => {
        try {
            set({ error: null, loading: true })
            const response = await axios.get(`${BASE_API}/api/news/featured`);
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

    likeNews: async (id) => {
        try {
            set({ error: null })
            const response = await axios.get(`${BASE_API}/api/news/like/${id}`);
            if (response.data.success) {
                set({ currentNews: response.data.news })
            }
            else {
                console.log(response.data.message)
                set({ error: response.data.message })
            }
        } catch (error) {
            set({ error: error.message })
        }
    },

    commentNews: async (id, input) => {
        try {
            if (!input.commentbody) {
                return
            }
            set({ error: null })
            const response = await axios.post(`${BASE_API}/api/news/comment/${id}`, input);
            if (response.data.success) {
                set({ currentNews: response.data.news })
                toast.success("Comment added successfully");
                return true;
            }
            else {
                set({ error: response.data.message })
            }

        } catch (error) {
            set({ error: error.message })
            console.log(error)
        }
    }

}))