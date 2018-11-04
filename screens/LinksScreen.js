import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LoadingView from '../components/LoadingView';
import withItems from "../providers/withItems";
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
import MOCK from '../constants/Mock';

const LinksScreen = ({ data: { items, loading, error } }) => {
  //items = MOCK
  if (loading || error) return <LoadingView loading={loading} error={error} />

  const itemsMissing = items.filter(({missing_since}) => !!missing_since)

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollViewContainer}>
        {items.map((item, index) => <ItemCard key={`card-item--${index}`} item={item} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  images: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
  },
});

LinksScreen.navigationOptions = {
  header: null,
};

export default withItems(LinksScreen);
