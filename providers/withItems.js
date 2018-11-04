import React from "react";
import gql from "graphql-tag";
import { Subscription } from 'react-apollo';

const query = gql`
subscription {
  items {
    item_id
    occurrence
    description
    missing_since
    good_until
  }
}
`

export default (InsideComponent) => {
  const component = () => (
    <Subscription subscription={query}>
      {
        ({ data, loading, error, ...props }) => {
          const {items} = data || {}
          return <InsideComponent {...props} data={{items, loading, error}}/>;
        }
      }
    </Subscription>
  )

  component.navigationOptions = InsideComponent.navigationOptions

  return component
}