import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const LoadingView = ({ loading, error }) => {
  if (loading && !error){
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregani...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.erroTextTitle}>Erro!</Text>
      <Text style={styles.erroText}>{JSON.stringify(error)}</Text>
    </View>
  )
}
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
  erroTextTitle: {
    fontSize: 25,
    color: '#ff4c4c',
    lineHeight: 24,
    textAlign: 'center',
  },
  erroText: {
    fontSize: 15,
    color: '#eee',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 15,
  },
})

export default LoadingView;