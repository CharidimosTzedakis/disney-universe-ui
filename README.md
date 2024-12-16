# Disney universe ui

## Description
The Disney universe ui app utilizes the [Disney API](https://disneyapi.dev/) to provide a way to navigate through and 
explore various disney characters. <br/>
In more detail:
- it provides a table where the user can browse all the available disney characters and see some first info about them
- if the user clicks on a table row, more details are revealed for the character in a modal
- a pie chart is created from the current page of the table, showing information about the characters and the films they
appear
- the data of the current pie chart view can be exported to an excel file
- Search functionality is provided, using character name or tv show name
- the search results are shown in the table, with a clear results button to reset the table to the previous view

## Getting started 

### Prerequisites
Ensure you have installed the following:
- `Node.js` version 16 or above
- `pnpm` package manager

### Setup and run 
1. Install dependencies using `pnpm`:
   ```bash
   pnpm i
   ```
2. Start up the project using the command:
   ```bash
   pnpm run dev
   ```
3. Navigate to [http://localhost:5173/]()
4. Run unit tests using the command:
   ```bash
   pnpm test 
   ```
   
## Implementation

### Tech stack

- Core Libraries: React, Typescript, Vite, Zustand
- UI & Styling: Ant Design (antd), highcharts, scss modules
- GraphQL: urql, graphql-codegen
- Utilities: papaparse, exceljs, file-saver
- Testing: vitest, react testing library, wonka (for urql) 
- Code quality: ESLint, Prettier

### GraphQL API

- The GraphQL API that is available is used, so as to bring only the fields that are necessary.
- `Urql` GraphQL client was chosen because it provides simple document caching that can be used with the pagination
  queries, while maintaining a small bundle size
- if a GraphQL query needs to be repeated (e.g. return to a table page that was visited before), the data are cached
and are available immediately
- Graphql schema is leveraged for typing the data, using `graphql-codegen` tool to automatically generate the necessary types
  and provide type safety deeply integrated with the defined graphQL schema
- The following command was used to download the GraphQL schema (using the get-graphql-schema package):
   ```bash
   get-graphql-schema https://api.disneyapi.dev/graphql > schema.graphql
   ```

## Layout, Error handling and Accessibility
- a basic dashboard layout is provided with the antd layout components and some supplementary css
- Chart and character details modal have been wrapped with error boundaries to increase application resilience
- The antd library does provide good accessibility features out of the box, including keyboard interaction  support 
for its components

## Next steps
- add search result count
- Specific skeletons as placeholders for modal
- modal polishing/styling improvements
- cypress integration and e2e tests
- coverage reporting
- improvements on responsive layout for small mobile devices
- investigate bundle size, confirm tree-shaking