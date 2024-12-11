import type { GetProp, TableProps } from "antd";

export interface CharactersTableEntry {
  key: number;
  name: string;
  numOfTVShows: string;
  numOfVideoGames: string;
  alliesNames: string;
  enemiesNames: string;
}

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

export interface TableParams {
  pagination: TablePaginationConfig;
}
