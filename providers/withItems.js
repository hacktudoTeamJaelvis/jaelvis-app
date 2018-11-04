import React from "react";
import { Subscription } from 'react-apollo';
import { subscribeItemsQuery } from '../constants/queries';

const shelfId = 1

export default (InsideComponent) => {
  const component = () => (
    <Subscription subscription={subscribeItemsQuery} variables={{shelf_id: shelfId}}>
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