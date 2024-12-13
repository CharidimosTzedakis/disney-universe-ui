import { useState, useEffect } from "react";
import { useQuery } from "urql";
import { charactersQueryDocument } from "@api/gqlQueries";
import { Table } from "antd";
import {
  charactersTableColumns,
  pageSizeOptions,
  INITIAL_PAGE_SIZE,
  TOTAL_NUMBER_OF_ITEMS,
} from "./tableConfig";
import useChartsStore from "@stores/chartStore";
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
      page: tableParams.pagination.current!,
      pageSize: tableParams.pagination.pageSize!,
    },
  });
  const { data, fetching } = result;
  const characterItems = data?.characters?.items;

  useEffect(() => {
    if (characterItems) {
      updateFilmsPieChartData(characterItems.filter((item) => item !== null));
    }
  }, [characterItems, updateFilmsPieChartData]);

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
      pagination={{
        ...tableParams.pagination,
        onChange: onPaginationChange,
      }}
      rowClassName={rowClassName}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
}
