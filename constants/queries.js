import gql from "graphql-tag";

export const completeItemQuery = gql`
  mutation($id: String!, $description: String!, $good_until: String!) {
    update_items(where: {
      id: {
        _eq: $id
      }
    }, _set: {
      description: $description,
      good_until: $good_until
    }) {
      affected_rows
    }
  }
`

export const removeItemQuery = gql`
  mutation($id: String!) {
    delete_items(where: {
      id: {
        _eq: $id
      }
    }) {
      affected_rows
    }
  }
`

export const subscribeItemsQuery = gql`
  subscription($shelf_id: bigint!) {
    items(where: {shelf_id: {_eq: $shelf_id}}) {
      id
      description
      missing_since
      good_until
      image_url
    }
  }
`