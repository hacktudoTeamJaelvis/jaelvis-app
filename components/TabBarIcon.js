import React from 'react';
// import { Icon } from 'expo';
import { Text, View } from 'react-native';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
      }}>
        <Text style={{
          color: this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
          fontWeight: 'bold',
        }}>{this.props.title.toUpperCase()}</Text>
      </View>
    );
    // return (
    //   <Icon.Ionicons
    //     name={this.props.name}
    //     size={26}
    //     style={{ marginBottom: -3 }}
    //     color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    //   />
    // );
  }
}