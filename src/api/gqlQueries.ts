import { graphql } from "@gql/gql";

export const charactersQueryDocument = graphql(`
  query allCharacters(
    $page: Int!
    $pageSize: Int!
    $filter: CharacterFilterInput!
  ) {
    characters(page: $page, pageSize: $pageSize, filter: $filter) {
      items {
        _id
        name
        tvShows
        videoGames
        films
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

export const characterDetailsQueryDocument = graphql(`
  query character($filter: CharacterFilterInput!) {
    characters(filter: $filter) {
      items {
        _id
        tvShows
        videoGames
        imageUrl
      }
    }
  }
`);
