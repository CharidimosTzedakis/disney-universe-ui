import type { Character } from "@gql/graphql";
import type { CharactersTableEntry } from "./types";

type Nullable<T> = T | null | undefined;

export function mapCharactersToTableData(
  items: Nullable<Nullable<Character>[]>,
) {
  if (!items) {
    return [];
  }

  return items
    ?.filter((item) => !!item)
    .map<CharactersTableEntry>((item) => ({
      key: item._id!,
      name: item?.name ?? "",
      numOfTVShows: `${item?.tvShows?.length ?? ""}`,
      numOfVideoGames: `${item?.videoGames?.length ?? ""}`,
      alliesNames: item?.allies?.join(", ") ?? "",
      enemiesNames: item?.enemies?.join(", ") ?? "",
    }));
}
