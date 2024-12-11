import type { TableColumnsType } from "antd";
import type { CharactersTableEntry } from "./types";

export const charactersTableColumns: TableColumnsType<CharactersTableEntry> = [
  {
    title: "Character name",
    width: 140,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "# TV shows",
    width: 80,
    dataIndex: "numOfTVShows",
    key: "numberOfTVShows",
    fixed: "left",
  },
  {
    title: "# Video games",
    dataIndex: "numOfVideoGames",
    key: "numOfVideoGames",
    width: 80,
  },
  {
    title: "Allies names",
    dataIndex: "alliesNames",
    key: "alliesNames",
    width: 100,
  },
  {
    title: "Enemies names",
    dataIndex: "enemiesNames",
    key: "enemiesNames",
    width: 100,
  },
];

export const pageSizeOptions = [10, 20, 50, 100, 200, 500];

export const INITIAL_PAGE_SIZE = 50;

// the total number of items is given in the docs
// https://disneyapi.dev/docs/
export const TOTAL_NUMBER_OF_ITEMS = 7438;
