import { useState } from "react";
import { useQuery } from "urql";
import { graphql } from "@gql/gql";
import { Table } from "antd";
import type { GetProp, TableProps } from "antd";
import type { SorterResult } from "antd/es/table/interface";
import {
  charactersTableColumns,
  pageSizeOptions,
  INITIAL_PAGE_SIZE,
  TOTAL_NUMBER_OF_ITEMS,
} from "./tableConfig";
import { mapCharactersToTableData } from "./helpers";
import type { CharactersTableEntry } from "./types";

const CharactersQuery = graphql(`
  query allCharacters($page: Int!, $pageSize: Int!) {
    characters(page: $page, pageSize: $pageSize) {
      items {
        _id
        name
        tvShows
        videoGames
        allies
        enemies
      }
      paginationInfo {
        hasPreviousPage
        hasNextPage
        pageItemCount
        totalPages
      }
    }
  }
`);

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

export default function CharactersTable() {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: INITIAL_PAGE_SIZE,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      total: TOTAL_NUMBER_OF_ITEMS,
    },
  });

  const [result] = useQuery({
    query: CharactersQuery,
    variables: {
      page: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
    },
  });
  const { data, fetching } = result;
  const { pageItemCount = 0, totalPages = 0 } =
    data?.characters?.paginationInfo ?? {};

  const onPaginationChange = (page: number, pageSize: number) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize,
      },
    });
  };

  return (
    <Table<CharactersTableEntry>
      columns={charactersTableColumns}
      dataSource={mapCharactersToTableData(data?.characters?.items)}
      loading={fetching}
      pagination={{
        ...tableParams.pagination,
        onChange: onPaginationChange,
      }}
    />
  );
}
