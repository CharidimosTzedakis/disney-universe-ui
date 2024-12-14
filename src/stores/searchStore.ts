import { create } from "zustand";

type SearchFilter = {
  name: string | null;
  tvShow: string | null;
};

interface SearchState {
  searchMode: boolean;
  isLoading: boolean;
  searchFilter: SearchFilter;
  setSearchFilter: (filter: SearchFilter) => void;
  resetFilter: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchMode: false,
  isLoading: false,
  searchFilter: {
    name: null,
    tvShow: null,
  },
  setSearchFilter: (searchFilter: SearchFilter) =>
    set((state) => ({ ...state, searchFilter, searchMode: true })),
  resetFilter: () =>
    set((state) => ({
      ...state,
      searchFilter: { name: null, tvShow: null },
      searchMode: false,
    })),
  setIsLoading: (isLoading: boolean) =>
    set((state) => ({ ...state, isLoading })),
}));

export default useSearchStore;
