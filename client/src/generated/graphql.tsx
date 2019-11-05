import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CatInput = {
  name?: Maybe<Scalars['String']>,
  age?: Maybe<Scalars['Int']>,
  breed?: Maybe<Scalars['String']>,
};

export type CatType = {
   __typename?: 'CatType',
  id: Scalars['ID'],
  name: Scalars['String'],
  age: Scalars['Int'],
  breed: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createCat: CatType,
  updateCat: CatType,
  deleteCat: CatType,
};


export type MutationCreateCatArgs = {
  input: CatInput
};


export type MutationUpdateCatArgs = {
  cat: CatInput,
  id: Scalars['String']
};


export type MutationDeleteCatArgs = {
  id: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  cat: CatType,
  cats: Array<CatType>,
};


export type QueryCatArgs = {
  id: Scalars['String']
};

export type CreateCatMutationVariables = {
  name: Scalars['String'],
  age: Scalars['Int'],
  breed: Scalars['String']
};


export type CreateCatMutation = (
  { __typename?: 'Mutation' }
  & { createCat: (
    { __typename?: 'CatType' }
    & Pick<CatType, 'name' | 'id' | 'breed' | 'age'>
  ) }
);

export type DeleteCatMutationVariables = {
  id: Scalars['String']
};


export type DeleteCatMutation = (
  { __typename?: 'Mutation' }
  & { deleteCat: (
    { __typename?: 'CatType' }
    & Pick<CatType, 'id' | 'name' | 'age' | 'breed'>
  ) }
);

export type GetCatsQueryVariables = {};


export type GetCatsQuery = (
  { __typename?: 'Query' }
  & { cats: Array<(
    { __typename?: 'CatType' }
    & Pick<CatType, 'id' | 'name' | 'breed' | 'age'>
  )> }
);

export type UpdateCatMutationVariables = {
  id: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  age?: Maybe<Scalars['Int']>,
  breed?: Maybe<Scalars['String']>
};


export type UpdateCatMutation = (
  { __typename?: 'Mutation' }
  & { updateCat: (
    { __typename?: 'CatType' }
    & Pick<CatType, 'name' | 'id' | 'breed' | 'age'>
  ) }
);


export const CreateCatDocument = gql`
    mutation createCat($name: String!, $age: Int!, $breed: String!) {
  createCat(input: {name: $name, age: $age, breed: $breed}) {
    name
    id
    breed
    age
  }
}
    `;
export type CreateCatMutationFn = ApolloReactCommon.MutationFunction<CreateCatMutation, CreateCatMutationVariables>;

/**
 * __useCreateCatMutation__
 *
 * To run a mutation, you first call `useCreateCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCatMutation, { data, loading, error }] = useCreateCatMutation({
 *   variables: {
 *      name: // value for 'name'
 *      age: // value for 'age'
 *      breed: // value for 'breed'
 *   },
 * });
 */
export function useCreateCatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCatMutation, CreateCatMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCatMutation, CreateCatMutationVariables>(CreateCatDocument, baseOptions);
      }
export type CreateCatMutationHookResult = ReturnType<typeof useCreateCatMutation>;
export type CreateCatMutationResult = ApolloReactCommon.MutationResult<CreateCatMutation>;
export type CreateCatMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCatMutation, CreateCatMutationVariables>;
export const DeleteCatDocument = gql`
    mutation deleteCat($id: String!) {
  deleteCat(id: $id) {
    id
    name
    age
    breed
  }
}
    `;
export type DeleteCatMutationFn = ApolloReactCommon.MutationFunction<DeleteCatMutation, DeleteCatMutationVariables>;

/**
 * __useDeleteCatMutation__
 *
 * To run a mutation, you first call `useDeleteCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCatMutation, { data, loading, error }] = useDeleteCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteCatMutation, DeleteCatMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteCatMutation, DeleteCatMutationVariables>(DeleteCatDocument, baseOptions);
      }
export type DeleteCatMutationHookResult = ReturnType<typeof useDeleteCatMutation>;
export type DeleteCatMutationResult = ApolloReactCommon.MutationResult<DeleteCatMutation>;
export type DeleteCatMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteCatMutation, DeleteCatMutationVariables>;
export const GetCatsDocument = gql`
    query getCats {
  cats {
    id
    name
    breed
    age
  }
}
    `;

/**
 * __useGetCatsQuery__
 *
 * To run a query within a React component, call `useGetCatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, baseOptions);
      }
export function useGetCatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCatsQuery, GetCatsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCatsQuery, GetCatsQueryVariables>(GetCatsDocument, baseOptions);
        }
export type GetCatsQueryHookResult = ReturnType<typeof useGetCatsQuery>;
export type GetCatsLazyQueryHookResult = ReturnType<typeof useGetCatsLazyQuery>;
export type GetCatsQueryResult = ApolloReactCommon.QueryResult<GetCatsQuery, GetCatsQueryVariables>;
export const UpdateCatDocument = gql`
    mutation updateCat($id: String!, $name: String, $age: Int, $breed: String) {
  updateCat(id: $id, cat: {name: $name, age: $age, breed: $breed}) {
    name
    id
    breed
    age
  }
}
    `;
export type UpdateCatMutationFn = ApolloReactCommon.MutationFunction<UpdateCatMutation, UpdateCatMutationVariables>;

/**
 * __useUpdateCatMutation__
 *
 * To run a mutation, you first call `useUpdateCatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCatMutation, { data, loading, error }] = useUpdateCatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      age: // value for 'age'
 *      breed: // value for 'breed'
 *   },
 * });
 */
export function useUpdateCatMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCatMutation, UpdateCatMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateCatMutation, UpdateCatMutationVariables>(UpdateCatDocument, baseOptions);
      }
export type UpdateCatMutationHookResult = ReturnType<typeof useUpdateCatMutation>;
export type UpdateCatMutationResult = ApolloReactCommon.MutationResult<UpdateCatMutation>;
export type UpdateCatMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCatMutation, UpdateCatMutationVariables>;