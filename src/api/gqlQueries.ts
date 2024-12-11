import { graphql } from "@gql/gql";

export const charactersQueryDocument = graphql(`
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
