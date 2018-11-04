import React from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import { MonoText } from './StyledText';

const TabBarInfo = ({ items = [], itemsNotRegistered = 0 }) => (
  <View style={styles.tabBarInfoContainer}>
    <Text style={styles.tabBarInfoText}>
      {`Você possui ${items.length} item${items.length === 1 ? '' : 's'} detectados`}
    </Text>

    <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
      <MonoText style={styles.codeHighlightText}>
        {itemsNotRegistered === 0 ?
          null
          : `${itemsNotRegistered} item${itemsNotRegistered === 1 ? '' : 's'} não cadastrados`}
      </MonoText>
    </View>
  </View>
)

const styles = StyleSheet.create({
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
})

export default TabBarInfo;