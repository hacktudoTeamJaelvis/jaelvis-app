import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LoadingView = () => (
  <View style={styles.container}>
    <Text style={styles.loadingText}>Carregani...</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 25,
  },
  loadingText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
})

export default LoadingView;