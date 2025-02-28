import { create } from "zustand";

// this is to set the type of content to show dynamically via the contentType - whether movie/series; not reqd for us since we just show movies
export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));
