import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  fetchingUser: false,
  signup: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });

      set({ user: response.data.user });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error from signup function in authStore");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const { user, message } = response.data;
      set({ user });
      toast.success(message);
    } catch (error) {
      console.log("Error from login function in authStore");
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUser: async () => {
    set({ fetchingUser: true });
    try {
      const response = await axios.get(`${API_URL}/auth/user`);
      set({ user: response.data.user });
    } catch (error) {
     console.log("Error from getUser function in auth store",error.response.data);
    } finally {
      set({ fetchingUser: false });
    }
  },

  logout: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));