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
  reset: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchMode: false,
  isLoading: false,
  searchFilter: {
    name: null,
    tvShow: null,
  },
  setSearchFilter: (searchFilter: SearchFilter) =>
    set(() => ({ searchFilter, searchMode: true })),
  resetFilter: () =>
    set(() => ({
      searchFilter: { name: null, tvShow: null },
      searchMode: false,
    })),
  setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
  reset: () =>
    set(() => ({
      searchMode: false,
      isLoading: false,
      searchFilter: {
        name: null,
        tvShow: null,
      },
    })),
}));

export default useSearchStore;
