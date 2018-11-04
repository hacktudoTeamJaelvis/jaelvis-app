import React, { Component } from 'react';
import {
  Alert,
  DatePickerAndroid,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';

import Moment from 'moment';
import {Mutation} from 'react-apollo';

import {updateItemQuery} from '../constants/queries';

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

  handleSubmit = () => {
    const { inputName, inputDate } = this.state
    const shelfId = 1
    const id = this.props.item.id
    const set = {
      good_until: inputDate,
      description: inputName
    }
    const variables = {shelfId, id, set}

    this.toggleModal()
    this.props.updateItem({variables})
    //Alert.alert(`PRODUTO NOME: ${inputName} and date: ${inputDate} CADASTRADO!`);
  }

  pickDate = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = Moment().year(year).month(month).date(day).format('YYYY-MM-DD')
        this.setState({ inputDate: date })
      }
    } catch ({code, message}) {
      Alert.alert(`Cannot open date picker: ${message}`);
    }
  }

  render() {
    const { item, missing } = this.props
    const { isModalOpen, inputDate } = this.state
    if (isModalOpen) {
      return (
        <View style={{ marginTop: 112 }}>
          <Modal
            animationType="slide"
            transparent={false}
            visible
            onRequestClose={() => {
              return true
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <View style={{ position: 'absolute', left: 20, top: 20 }}>
                <TouchableWithoutFeedback
                  style={{ height: 17, width: 17 }}
                  onPress={this.toggleModal}>
                    <ArrowBackIcon />
                  </TouchableWithoutFeedback>
                </View>
                <View>
                  <Text style={styles.modalTitleText}>Cadastro do produto</Text>
                  <Text style={styles.modalText}>Insira todas as informações referentes ao item.</Text>
                </View>
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
                  ? <View>
                      <Text style={{}}>Valido até {Moment(inputDate).format('DD MMM')}</Text>
                      <TouchableWithoutFeedback
                      onPress={this.pickDate}
                      style={{
                        height: 70,
                        width: 100,
                        justifyContent: 'center',
                        marginBottom: 25,
                      }}
                    >
                      <Text style={{
                        height: 70,
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
          </Modal>
        </View>
      )
    }
    if (missing) {
      return (
        <View style={styles.normalContainer}>
          <View style={{ marginLeft: 20, width: 100 }}>
            <Text style={{ fontWeight: 'bold' }}>Retirado</Text>
            <Text style={{}}>{`${Moment(item.missing_since).format('mm')} min atrás`}</Text>
          </View>
          {/* <Image style={styles.images} source={{ uri: item.image_url || 'https://via.placeholder.com/50' }} /> */}
          {/* <Badge
            title={item.missing_since ? 'retirado' : 'guardado'}
            color={item.missing_since ? '#59AEFD' : '#FF6B62'} /> */}
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{item.id}</Text>
          <View style={{ marginLeft: 20, width: 170 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.description}</Text>
            <Text style={{}}>Valido até {Moment(item.good_until).format('DD MMM')}</Text>
          </View>
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

export default ({item, missing}) => <Mutation mutation={updateItemQuery}>
{(updateItem, {data}) => <ItemCard item={item} missing={missing} updateItem={updateItem}/>}
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