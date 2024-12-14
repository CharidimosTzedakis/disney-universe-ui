# Disney universe ui

## Description

## Instructions

- Start up the project using the command:
```bash
pnpm run dev
```
- navigate to [http://localhost:5173/]()

## Implementation

- static extraction for css to make emotion more performant in first render // PENDING

### GraphQL API

- The GraphQL API that is available is utilized to bring only the fields that are necessary for the table.
- `Urql` GraphQL client was chosen because it provides simple document caching that can be used with the pagination
  queries while maintaining a small bundle size 
- Graphql schema is leveraged for typing the data, using `graphql-codegen` tool to automatically generate the necessary types
  and provide type safety

To download any latest version of the graphQL schema, use the following command:
```bash
get-graphql-schema https://api.disneyapi.dev/graphql > schema.graphql
```
