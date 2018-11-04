import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Moment from 'moment';

import Badge from '../components/Badge';
import Header from '../components/Header';
import LoadingView from '../components/LoadingView';
import withItems from "../providers/withItems";
// const MOCK = [
//   {
//     item_id: 1,
//     occurrence: 1,
//     description: 'Leite',
//     missing_since: null,
//     good_until: new Date(),
//     image: 'https://via.placeholder.com/50',
//   },
//   {
//     item_id: 2,
//     occurrence: 1,
//     description: 'Pão',
//     missing_since: null,
//     good_until: new Date(),
//     image: 'https://via.placeholder.com/50',
//   },
//   {
//     item_id: 3,
//     occurrence: 1,
//     description: 'Ovo',
//     missing_since: null,
//     good_until: new Date(),
//     image: 'https://via.placeholder.com/50',
//   },
//   {
//     item_id: 4,
//     occurrence: 1,
//     description: null,
//     missing_since: null,
//     good_until: null,
//     image: 'https://via.placeholder.com/50',
//   },
// ]

const HomeScreen = ({data: { items, loading, error }}) => {
  if (loading || error) return <LoadingView/>

  // const placeHolderImage = 'https://via.placeholder.com/50'
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
            ? itemsNotRegistered.map((item, index) => {
                return <View
                  key={`list-item--${index}`}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 7,
                    padding: 20,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}>
                  <Image style={styles.images} source={{ uri: item.image_url }} />
                  <Badge title="Novo" bgColor='#8bc34a' />
                </View>
              })
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