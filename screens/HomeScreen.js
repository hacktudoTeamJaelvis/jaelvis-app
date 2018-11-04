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
import withItems from '../providers/withItems';
import MOCK from '../constants/Mock';

const HomeScreen = ({data: { items, loading, error }}) => {
  // items = MOCK
  if (loading || error) return <LoadingView loading={loading} error={error} />

  const itemsMissing = items.filter(({missing_since}) => !!missing_since)
  const hasMissingItems = itemsMissing.length !== 0

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.contentContainer}>
        <View style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#f2f2f2',
          }}>
          {
            hasMissingItems
            ? itemsMissing.map((item, index) => <ItemCard key={`card-item--${index}`} item={item} missing />)
            : <Text style={{ fontSize: 14, textAlign: 'center', fontWeight:'bold' }}>Você não possui
            nenhuma pendência!</Text>
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