import { useState } from "react";
import {
  DataGrid,
  GridValidRowModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useQuery } from "urql";
import { graphql } from "@gql/gql";
import { Character } from "@gql/graphql";
import CharactersTablePagination from "./charactersTablePagination";

import {
  charactersTableColumns,
  pageSizeOptions,
  INITIAL_PAGE_SIZE,
} from "./tableConfig";

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

interface CharactersTableRow extends GridValidRowModel, Character {}

export default function CharactersTable() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: INITIAL_PAGE_SIZE,
  });

  const [result] = useQuery({
    query: CharactersQuery,
    variables: {
      page: paginationModel.page + 1, // first page is at 0 index for DataGrid component
      pageSize: paginationModel.pageSize,
    },
  });
  const { data, fetching } = result;
  const { pageItemCount = 0, totalPages = 0 } =
    data?.characters?.paginationInfo ?? {};

  return (
    <Paper sx={{ height: 600 }}>
      <DataGrid
        isRowSelectable={() => true}
        disableColumnMenu
        showCellVerticalBorder
        loading={fetching}
        slots={{
          pagination: CharactersTablePagination,
        }}
        rows={data?.characters?.items as CharactersTableRow[]}
        getRowId={(row) => row._id!}
        columns={charactersTableColumns}
        paginationMode="server"
        paginationModel={paginationModel}
        initialState={{
          pagination: {
            paginationModel: { pageSize: INITIAL_PAGE_SIZE },
            rowCount: pageItemCount * totalPages,
          },
        }}
        pageSizeOptions={pageSizeOptions}
        rowCount={pageItemCount * totalPages}
        onPaginationModelChange={(model) => {
          setPaginationModel(model);
        }}
        sx={{
          border: 0,
        }}
      />
    </Paper>
  );
}
