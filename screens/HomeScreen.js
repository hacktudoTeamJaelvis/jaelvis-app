import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Moment from 'moment';

import { MonoText } from '../components/StyledText';
import LoadingView from '../components/LoadingView';
import withItems from "../providers/withItems";

const HomeScreen = ({data: { items, loading, error }}) => {
  if (loading || error) return <LoadingView/>

  const itemsNotRegistered = items.filter(({description}) => !description).length

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>Items cadastrados</Text>
          {
            items.map((items, index) => {
              if (!items.description) return null
              const formatedValidationDate = Moment(new Date(items.good_until)).format('DD MMM')
              return <View
                key={`list-item--${index}`}
                style={{
                  flex: 1,
                  width: '100%',
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 7,
                  padding: 20,
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}>
                <Text style={styles.getStartedText}>{items.description}</Text>
                <Text style={styles.getStartedText}>Valido até {formatedValidationDate}</Text>
              </View>
            })
          }
        </View>
      </ScrollView>

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
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
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
});

export default withItems(HomeScreen);