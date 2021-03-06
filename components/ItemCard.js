import React, { Component } from 'react';
import {
  Alert,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from 'react-native';

import Moment from 'moment';
import { Mutation } from 'react-apollo';

import { updateItemQuery, removeItemQuery } from '../constants/queries';

import ArrowBackIcon from './ArrowBackIcon';

class ItemCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      inputName: '',
      inputDate: null,
    }
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  handleDonation = () => {
    const shelfId = 1
    const id = this.props.item.id
    const set = {
      for_donation: true
    }
    const variables = { shelfId, id, set }

    this.props.updateItem({ variables })
  }

  handleSubmit = () => {
    const { inputName, inputDate } = this.state
    const shelfId = 1
    const id = this.props.item.id
    const set = {
      good_until: inputDate,
      description: inputName
    }
    const variables = { shelfId, id, set }

    this.setState({
      isModalOpen: false,
      inputName: '',
      inputDate: null,
    })
    this.props.updateItem({ variables })
    //Alert.alert(`PRODUTO NOME: ${inputName} and date: ${inputDate} CADASTRADO!`);
  }

  pickDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = Moment().year(year).month(month).date(day).format('YYYY-MM-DD')
        this.setState({ inputDate: date })
      }
    } catch ({ code, message }) {
      Alert.alert(`Cannot open date picker: ${message}`);
    }
  }

  removeItem = () => {
    const shelfId = 1
    const variables = {id: this.props.item.id, shelfId}
    this.props.removeItem({variables})
  }

  render() {
    const { item, missing, expiring } = this.props
    const { isModalOpen, inputDate } = this.state
    if (isModalOpen) {
      return (
        <View style={{ marginTop: 112 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isModalOpen}
            onRequestClose={() => Alert.alert('Cancelar cadastro?')}>
            <ScrollView style={{
              flex: 1,
              flexDirection: 'column'
            }}>
              <TouchableHighlight
                style={{ height: 30, width: 30, position: 'absolute', left: 20, top: 20 }}
                onPress={this.toggleModal}>
                <ArrowBackIcon />
              </TouchableHighlight>
              <View>
                <Text style={styles.modalTitleText}>Cadastro do produto</Text>
                <Text style={styles.modalText}>Insira todas as informações referentes ao item.</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    alignItems: 'center',
                  }}
                  source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />

                <View style={{ width: 250, marginTop: 30, marginBottom: 25 }}>
                  <Text style={{ fontWeight: 'bold' }}>NOME DO PRODUTO</Text>
                  <TextInput
                    style={{
                      height: 40,
                      width: 250,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ inputName: text })}
                    value={this.state.inputName}
                  />
                </View>
                {inputDate
                  ? <View style={{ flexDirection: 'row' }}>
                    <Text style={{}}>Valido até {Moment(inputDate).format('DD MMM')}</Text>
                    <TouchableWithoutFeedback
                      onPress={this.pickDate}
                      style={{
                        height: 30,
                        width: 100,
                        justifyContent: 'center',
                        marginBottom: 25,
                      }}
                    >
                      <Text style={{
                        height: 30,
                        width: 100,
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#57dbbc',
                        padding: 5,
                        borderRadius: 30,
                        borderWidth: 2,
                        borderColor: '#57dbbc',
                        textAlign: 'center',
                        justifyContent: 'center',
                        paddingTop: 10,
                      }}>
                        Editar
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                  : <TouchableWithoutFeedback
                    onPress={this.pickDate}
                    style={{
                      height: 100,
                      width: 250,
                      justifyContent: 'center',
                      marginBottom: 25,
                    }}
                  >
                    <Text style={{
                      height: 50,
                      width: 250,
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: '#57dbbc',
                      padding: 5,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: '#57dbbc',
                      textAlign: 'center',
                      justifyContent: 'center',
                      paddingTop: 10,
                    }}>
                      Preencher de Validade
                      </Text>
                  </TouchableWithoutFeedback>
                }
                <TouchableWithoutFeedback
                  onPress={this.handleSubmit}
                  style={{
                    marginTop: 25,
                    height: 100,
                    width: 250,
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{
                    height: 50,
                    width: 250,
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: '#57dbbc',
                    padding: 5,
                    borderRadius: 30,
                    borderWidth: 2,
                    borderColor: '#57dbbc',
                    textAlign: 'center',
                    justifyContent: 'center',
                    paddingTop: 10,
                  }}>
                    Salvar
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </ScrollView>
          </Modal>
        </View>
      )
    }
    if (missing) {
      return (
        <View style={styles.normalContainer}>
          <View style={{ marginLeft: 0, width: 80 }}>
            <Text style={{ fontWeight: 'bold' }}>Retirado</Text>
            <Text style={{}}>{`${Moment(item.missing_since).format('mm')} min atrás`}</Text>
          </View>
          {/* <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} /> */}
          {/* <Badge
            title={item.missing_since ? 'retirado' : 'guardado'}
            color={item.missing_since ? '#59AEFD' : '#FF6B62'} /> */}
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.id}</Text>
          <View style={{ marginLeft: 10, width: 80 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
            <Text style={{}}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
          </View>
          <TouchableWithoutFeedback
            style={{ height: 20, width: 20, zIndex: 999 }}
            onPress={this.removeItem}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -20, marginTop: 15 }}>X</Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }
    if (expiring) {
      return (
        <View style={styles.normalContainer}>
          <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Estragando</Text>
          {/* <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} /> */}
          {/* <Badge
            title={item.missing_since ? 'retirado' : 'guardado'}
            color={item.missing_since ? '#59AEFD' : '#FF6B62'} /> */}
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.id}</Text>
          <View style={{ marginLeft: 10, width: 80 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
            <Text style={{}}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
          </View>
          {
            item.for_donation
            ? <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Doado</Text>
            : <TouchableWithoutFeedback
              style={{ height: 20, width: 20, zIndex: 999 }}
              onPress={this.handleDonation}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: -20, marginTop: 15 }}>Doar</Text>
            </TouchableWithoutFeedback>
          }
        </View>
      )
    }
    const isNewItem = !item.description
    if (isNewItem) {
      return (
        <View style={styles.newItemContainer}>
          <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />
          {/* <Badge title="Novo" bgColor='#57dbbc' /> */}
          <Text style={{ fontSize: 30 }}>{item.id}</Text>
          <TouchableWithoutFeedback
            onPress={this.toggleModal}
            style={{
              height: 40,
              width: 170,
              justifyContent: 'center'
            }}
          >
            <Text style={{
              height: 40,
              width: 170,
              fontSize: 15,
              paddingTop: 10,
              color: '#57dbbc',
              padding: 5,
              borderRadius: 30,
              borderWidth: 2,
              borderColor: '#57dbbc',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
              CADASTRAR
              </Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }
    return (
      <View style={styles.normalContainer}>
        <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} />
        {/* <Badge
          title={item.missing_since ? 'retirado' : 'guardado'}
          color={item.missing_since ? '#59AEFD' : '#FF6B62'} /> */}
        <Text style={{ fontSize: 30 }}>{item.id}</Text>
        <View style={{ marginLeft: 20, width: 170 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
          <Text style={{}}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
        </View>
      </View>
    )
  }
}

export default ({ item, missing, expiring }) => <Mutation mutation={updateItemQuery}>
  {(updateItem) => <Mutation mutation={removeItemQuery}>
    {(removeItem) => <ItemCard expiring={expiring} item={item} missing={missing} updateItem={updateItem} removeItem={removeItem} />}
  </Mutation>}
</Mutation>

const styles = StyleSheet.create({
  newItemContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  normalContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  images: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
  },
  modalTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 45,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 13,
    margin: 20,
    textAlign: 'center',
    color: '#797979',
  },
});