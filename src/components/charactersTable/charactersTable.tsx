import { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "urql";
import { charactersQueryDocument } from "@api/gqlQueries";
import { Table } from "antd";
import {
  charactersTableColumns,
  pageSizeOptions,
  INITIAL_PAGE_SIZE,
  TOTAL_NUMBER_OF_ITEMS,
  MAX_SEARCH_RESULTS,
} from "./tableConfig";
import useChartsStore from "@stores/chartStore";
import useSearchStore from "@stores/searchStore";
import { mapCharactersToTableData } from "./helpers";
import type { CharactersTableEntry, TableParams } from "./types";
import "./charactersTable.css";

export default function CharactersTable({
  onCharacterSelect,
}: {
  onCharacterSelect: ({ id, name }: { id: number; name: string }) => void;
}) {
  const {
    filmsPieChart: { update: updateFilmsPieChartData },
  } = useChartsStore();
  const { searchFilter, searchMode, setIsLoading } = useSearchStore(
    useShallow((state) => ({
      searchFilter: state.searchFilter,
      searchMode: state.searchMode,
      setIsLoading: state.setIsLoading,
    })),
  );
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [result] = useQuery({
    query: charactersQueryDocument,
    variables: {
      page: searchMode ? 1 : tableParams.pagination.current!,
      pageSize: searchMode
        ? MAX_SEARCH_RESULTS
        : tableParams.pagination.pageSize!,
      filter: searchMode
        ? { name: searchFilter.name, tvShows: searchFilter.tvShow }
        : {},
    },
  });
  const { data, fetching } = result;
  const characterItems = data?.characters?.items;

  useEffect(() => {
    if (characterItems) {
      updateFilmsPieChartData(characterItems.filter((item) => item !== null));
    }
  }, [characterItems, updateFilmsPieChartData]);

  useEffect(() => {
    setIsLoading(fetching);
  }, [fetching, setIsLoading]);

  const onPaginationChange = (page: number, pageSize: number) => {
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        current: page,
        pageSize,
      },
    });
  };

  const onRowClick = (record: CharactersTableEntry) => {
    const selectedKey = record.key;
    const newSelectedRowKeys =
      selectedKey === selectedRowKeys?.[0] ? [] : [selectedKey];
    setSelectedRowKeys(newSelectedRowKeys);
    onCharacterSelect({ id: selectedKey, name: record.name });
  };

  const rowClassName = (record: CharactersTableEntry) => {
    return selectedRowKeys.includes(record.key) ? "ant-table-row-selected" : "";
  };

  return (
    <Table<CharactersTableEntry>
      className="characters-table"
      scroll={{ y: 700 }}
      columns={charactersTableColumns}
      dataSource={mapCharactersToTableData(characterItems)}
      loading={fetching}
      pagination={
        searchMode
          ? false
          : {
              ...tableParams.pagination,
              onChange: onPaginationChange,
            }
      }
      rowClassName={rowClassName}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}
