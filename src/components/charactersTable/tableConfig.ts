import { GridColDef } from "@mui/x-data-grid";
import { Character } from "@gql/graphql";

export const charactersTableColumns: GridColDef<Character>[] = [
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
    valueGetter: (_, row) => `${row?.tvShows?.length ?? 0}`,
  },
  {
    field: "numberOfVideoGames",
    headerName: "# Video games",
    type: "number",
    width: 160,
    valueGetter: (_, row) => `${row?.videoGames?.length ?? 0}`,
  },
  {
    field: "alliesNames",
    headerName: "Allies names",
    description: "The names of the allies of the character",
    sortable: false,
    width: 260,
    valueGetter: (_, row) => `${row?.allies?.join(", ") ?? ""}`,
  },
  {
    field: "enemiesNames",
    headerName: "Enemies names",
    description: "The names of the enemies of the character",
    width: 200,
    valueGetter: (_, row) => `${row?.enemies?.join(", ") ?? ""}`,
  },
];

// For DataGrid MIT version pagination up to 100 is supported
// need to upgrade to  DataGridPro or DataGridPremium component to unlock 200 and 500
export const pageSizeOptions = [10, 20, 50, 100] as const;

// export const pageSizeOptions = [10, 20, 50, 100, 200, 500] as const;

export const INITIAL_PAGE_SIZE = 50;
