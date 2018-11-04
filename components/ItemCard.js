import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Moment from 'moment';
import Badge from './Badge';

export default ItemCard = ({ item, missing }) => {
  if (missing) {
    return (
      <View style={styles.normalContainer}>
        <Text style={{}}>Retirado {Moment(item.missing_since).format('DD MMM')}</Text>
        {/* <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} /> */}
        {/* <Badge
          title={item.missing_since ? 'retirado' : 'guardado'}
          color={item.missing_since ? '#59AEFD' : '#FF6B62'} /> */}
        <Text style={{ fontSize: 30 }}>{item.id}</Text>
        <View style={{ marginLeft: 20, width: 170 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
          <Text style={{}}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
        </View>
      </View>
    )
  }
  const isNewItem = !item.description
  if (isNewItem) {
    return (
      <View style={styles.newItemContainer}>
          <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />
          {/* <Badge title="Novo" bgColor='#57dbbc' /> */}
          <Text style={{ fontSize: 30 }}>{item.id}</Text>
          <TouchableWithoutFeedback
            onPress={() => console.log('click bitch')}
            style={{
              height: 30,
              width: 170,
            }}
          >
            <Text style={{
              height: 30,
              width: 170,
              fontSize: 10,
              color: '#57dbbc',
              padding: 5,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: '#57dbbc',
              textAlign: 'center',
            }}>
              CADASTRAR
            </Text>
          </TouchableWithoutFeedback>
      </View>
    )
  }
  return (
    <View style={styles.normalContainer}>
      <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />
      {/* <Badge
        title={item.missing_since ? 'retirado' : 'guardado'}
        color={item.missing_since ? '#59AEFD' : '#FF6B62'} /> */}
      <Text style={{ fontSize: 30 }}>{item.id}</Text>
      <View style={{ marginLeft: 20, width: 170 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
        <Text style={{}}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
      </View>
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
  normalContainer: {
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