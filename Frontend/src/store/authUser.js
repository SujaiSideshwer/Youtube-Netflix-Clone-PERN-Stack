import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand"; //using zustand to call stored variables across frontend and backend servers like global variables

// we are returning an object as a state from this useAuthStore hook: by enclosing the dict tag with normal braces - ({})
export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      //we can just use /api instead of http://localhost:5000/ because we have given the url as proxy in the vite config settings
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
    } catch (error) {
      set({ isSigningUp: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
    }
  },
}));
