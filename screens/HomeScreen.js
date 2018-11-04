import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import ItemCard from '../components/ItemCard';
import Header from '../components/Header';
import LoadingView from '../components/LoadingView';
import withItems from "../providers/withItems";

const HomeScreen = ({data: { items, loading, error }}) => {
  if (loading || error) return <LoadingView loading={loading} error={error} />

  const itemsNotRegistered = items.filter(({description}) => !description)
  const hasUnregisteredItems = itemsNotRegistered.length !== 0

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.titleText}>Items detectados</Text>
          {
            hasUnregisteredItems
            ? itemsNotRegistered.map((item, index) => <ItemCard key={`card-item--${index}`} item={item} />)
            : <Text>has no unregistered items</Text>
          }
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'left',
  },
  images: {
    width: 50,
    height: 50,
  },
});

export default withItems(HomeScreen);