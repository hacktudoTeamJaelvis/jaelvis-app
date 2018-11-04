import React from 'react';
import {
  View,
} from 'react-native';
import HeaderIcon from './HeaderIcon'

export default Header = () => (
  <View style={{
    alignSelf: 'flex-start',
    width: '100%',
    height: 90,
    paddingTop: 35,
    paddingLeft: 15,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  }}>
    <HeaderIcon />
  </View>
)