import gql from "graphql-tag";

export const updateItemQuery = gql`
  mutation($id: String!, $shelfId: bigint!, $set: items_set_input!) {
    update_items(where: {
      id: {
        _eq: $id
      },
      shelf_id: {
        _eq: $shelfId
      }
    }, _set: $set) {
      affected_rows
    }
  }
`

export const removeItemQuery = gql`
  mutation($id: String!, $shelfId: bigint!) {
    delete_items(where: {
      id: {
        _eq: $id
      },
      shelf_id: {
        _eq: $shelfId
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
      for_donation
    }
  }
`