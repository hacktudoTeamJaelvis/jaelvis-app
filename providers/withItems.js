import React from "react";
import { Subscription } from 'react-apollo';
import { subscribeItemQuery } from '../constants/queries';

const shelfId = 1

export default (InsideComponent) => {
  const component = () => (
    <Subscription subscription={subscribeItemQuery} variables={{shelfId}}>
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