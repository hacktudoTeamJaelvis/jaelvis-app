import React from 'react';
import {
  Text,
  View,
} from 'react-native';

export default Badge = ({ title = 'Retirado', bgColor = '#ff4c4c' }) => (
  <View style={{
    // height: 17,
    // backgroundColor: bgColor,
    // borderRadius: 999,
  }}>
    <Text style={{
      color: bgColor,
      fontSize: 20,
      fontWeight: 'bold',
    }}>
      {title.toUpperCase()}
    </Text>
  </View>
)