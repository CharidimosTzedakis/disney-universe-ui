import { Client, cacheExchange, fetchExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";

const isDev = import.meta.env.DEV;
const exchanges = [cacheExchange, fetchExchange];

const client = new Client({
  url: import.meta.env.VITE_DISNEY_GRAPHQL_API,
  exchanges: isDev ? [devtoolsExchange, ...exchanges] : [...exchanges],
});

export default client;
