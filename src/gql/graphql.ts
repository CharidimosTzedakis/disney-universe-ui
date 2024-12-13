/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  _id?: Maybe<Scalars['Int']['output']>;
  alignment?: Maybe<Scalars['String']['output']>;
  allies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  enemies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  films?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parkAttractions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  shortFilms?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  tvShows?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  url?: Maybe<Scalars['String']['output']>;
  videoGames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CharacterFilterInput = {
  alignment?: InputMaybe<Scalars['String']['input']>;
  allies?: InputMaybe<Scalars['String']['input']>;
  enemies?: InputMaybe<Scalars['String']['input']>;
  films?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parkAttractions?: InputMaybe<Scalars['String']['input']>;
  shortFilms?: InputMaybe<Scalars['String']['input']>;
  tvShows?: InputMaybe<Scalars['String']['input']>;
  videoGames?: InputMaybe<Scalars['String']['input']>;
};

export type CharacterPage = {
  __typename?: 'CharacterPage';
  items?: Maybe<Array<Maybe<Character>>>;
  paginationInfo?: Maybe<PaginationInfo>;
};

export type Query = {
  __typename?: 'Query';
  characters?: Maybe<CharacterPage>;
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<CharacterFilterInput>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationInfo = {
  __typename?: 'paginationInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  pageItemCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AllCharactersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type AllCharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'CharacterPage', items?: Array<{ __typename?: 'Character', _id?: number | null, name?: string | null, tvShows?: Array<string | null> | null, videoGames?: Array<string | null> | null, films?: Array<string | null> | null, allies?: Array<string | null> | null, enemies?: Array<string | null> | null } | null> | null, paginationInfo?: { __typename?: 'paginationInfo', hasPreviousPage: boolean, hasNextPage: boolean, pageItemCount: number, totalPages: number } | null } | null };

export type CharacterQueryVariables = Exact<{
  filter: CharacterFilterInput;
}>;


export type CharacterQuery = { __typename?: 'Query', characters?: { __typename?: 'CharacterPage', items?: Array<{ __typename?: 'Character', _id?: number | null, tvShows?: Array<string | null> | null, videoGames?: Array<string | null> | null, imageUrl?: string | null } | null> | null } | null };


export const AllCharactersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allCharacters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tvShows"}},{"kind":"Field","name":{"kind":"Name","value":"videoGames"}},{"kind":"Field","name":{"kind":"Name","value":"films"}},{"kind":"Field","name":{"kind":"Name","value":"allies"}},{"kind":"Field","name":{"kind":"Name","value":"enemies"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"pageItemCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}}]} as unknown as DocumentNode<AllCharactersQuery, AllCharactersQueryVariables>;
export const CharacterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"character"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CharacterFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"characters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"tvShows"}},{"kind":"Field","name":{"kind":"Name","value":"videoGames"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CharacterQuery, CharacterQueryVariables>;