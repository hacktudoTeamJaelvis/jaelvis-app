import React from "react";
import gql from "graphql-tag";
import { Subscription } from 'react-apollo';

const query = gql`
subscription {
  items {
    id
    description
    missing_since
    good_until
    image_url
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