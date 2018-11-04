import React from 'react';
import {
  Text,
  View,
} from 'react-native';

export default Badge = ({ title = 'Retirado', bgColor = '#ff4c4c' }) => (
  <View style={{
    flex: 1,
    flexDirection: 'column',
  }}>
    <Text style={{
      color: '#BAC3C0',
      marginBottom: 0,
      paddingBottom: 0,
    }}>STATUS</Text>
    <Text style={{
      color: bgColor,
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 0,
      paddingTop: 0,
    }}>
      {title.toUpperCase()}
    </Text>
  </View>
)