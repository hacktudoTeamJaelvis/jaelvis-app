import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Moment from 'moment';
import Badge from './Badge';

export default ItemCard = ({ item }) => {
  const isNewItem = !item.description
  if (isNewItem) {
    return (
      <View style={styles.newItemContainer}>
          <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />
          <Badge title="Novo" bgColor='#8bc34a' />
      </View>
    )
  }
  return (
    <View style={isNewItem ? styles.newItemContainer : styles.newItemContainer}>
        <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />
        <View>
          <Text style={styles.getStartedText}>{item.description}</Text>
          <Text style={styles.getStartedText}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
        </View>
        <Badge title={item.missing_since ? 'retirado' : 'guardado'} />
    </View>
  )
}

const styles = StyleSheet.create({
  newItemContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  images: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
  },
});