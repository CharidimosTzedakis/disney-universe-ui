import { Client, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "https://api.disneyapi.dev/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default client;
