import { create } from "zustand";
import type { Character } from "../gql/graphql";

export type FilmsPieChartDataPoint = {
  name: string;
  y: number;
  films: string[];
};

interface ChartsState {
  filmsPieChart: {
    data: FilmsPieChartDataPoint[];
    update: (data: Character[]) => void;
  };
}

const mapCharactersToDataPoints = (
  characters: Character[],
): FilmsPieChartDataPoint[] =>
  characters.map((character) => ({
    name: character.name ?? "",
    y: character.films?.length ?? 0,
    films: character.films?.filter((i) => i !== null) ?? [],
  }));

const useChartsStore = create<ChartsState>((set) => ({
  filmsPieChart: {
    data: [],
    update: (data: Character[]) =>
      set((state) => ({
        filmsPieChart: {
          ...state.filmsPieChart,
          data: mapCharactersToDataPoints(data),
        },
      })),
  },
}));

export default useChartsStore;
