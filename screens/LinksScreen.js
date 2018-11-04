import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LinksScreen = ({ data: { items, loading, error } }) => {

  return (
    <ScrollView style={styles.container}>
      <Text>{items ? JSON.stringify(items) : 'loading...'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

LinksScreen.navigationOptions = {
  title: 'Items',
};

export default graphql(gql`
  {
    items {
      item_id
      occurrence
      description
      missing_since
      good_until
    }
  }
`)(LinksScreen);
