import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { gql, useQuery } from "urql";

const CharactersQuery = gql`
  query {
    characters(page: 10, pageSize: 500) {
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
`;

type Character = {
  _id: string;
  name: string;
  tvShows: string[];
  videoGames: string[];
  allies: string[];
  enemies: string[];
};

const columns: GridColDef<Character>[] = [
  {
    field: "name",
    headerName: "Character name",
    width: 200,
    sortable: true,
  },
  {
    field: "numberOfTVShows",
    headerName: "# TV shows",
    type: "number",
    width: 100,
    valueGetter: (_, row) => `${row?.tvShows.length}`,
  },
  {
    field: "numberOfVideoGames",
    headerName: "# Video games",
    type: "number",
    width: 160,
    valueGetter: (_, row) => `${row?.videoGames.length}`,
  },
  {
    field: "alliesNames",
    headerName: "Allies names",
    description: "The names of the allies of the character",
    sortable: false,
    width: 260,
    valueGetter: (_, row) => `${row?.allies.join(", ") ?? ""}`,
  },
  {
    field: "enemiesNames",
    headerName: "Enemies names",
    description: "The names of the enemies of the character",
    width: 200,
    valueGetter: (_, row) => `${row?.enemies.join(", ") ?? ""}`,
  },
];

export default function CharactersTable() {
  const [result] = useQuery({
    query: CharactersQuery,
  });
  const { data, fetching } = result;
  console.log(data);

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        isRowSelectable={() => true}
        disableColumnMenu
        showCellVerticalBorder
        loading={fetching}
        rows={data?.characters.items}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 50 } } }}
        pageSizeOptions={[10, 20, 50, 100, 200, 500]}
        sx={{
          border: 0,
          // ".MuiDataGrid-cell:focus": {
          //   outline: "none", // Remove the border around the focused cell
          // },
          // ".MuiDataGrid-cell:focus-within": {
          //   outline: "none", // Remove the border when editing or interacting with the cell
          // },
        }}
      />
    </Paper>
  );
}
