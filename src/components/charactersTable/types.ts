import type { GetProp, TableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";

export interface CharactersTableEntry {
  key: React.Key;
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
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}
