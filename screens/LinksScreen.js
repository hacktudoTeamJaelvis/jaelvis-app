import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';
import LoadingView from '../components/LoadingView';
import withItems from "../providers/withItems";
import Badge from '../components/Badge';

const LinksScreen = ({ data: { items, loading, error } }) => {
  if (loading || error) return <LoadingView/>

  return (
    <ScrollView style={styles.container}>
          {
            items.map((items, index) => {
              if (!items.description) return null
              const formatedValidationDate = Moment(items.good_until).format('DD MMM')
              return <View
                key={`list-item--${index}`}
                style={{
                  flex: 1,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
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
                <Badge />
              </View>
            })
          }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  images: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
});

LinksScreen.navigationOptions = {
  header: null,
};

export default withItems(LinksScreen);
