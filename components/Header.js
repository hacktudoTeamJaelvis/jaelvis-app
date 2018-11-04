import React from 'react';
import {
  View,
} from 'react-native';
import HeaderIcon from './HeaderIcon'

export default Header = () => (
  <View style={{
    alignSelf: 'flex-start',
    width: '100%',
    height: 70,
    paddingTop: 30,
    paddingLeft: 15,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }}>
    <HeaderIcon />
  </View>
)