import React from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native'

import colors from '../constants/colors.json'
import avatarWoman from '../../assets/img/avatar_woman.png'

export default function ModalContact({ modalVisible, setModalVisible}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Image
              style={styles.modalAvatar}
              resizeMode="contain"
              source={avatarWoman}
            />

            <View style={styles.modalInfo}>
              <View style={styles.modalInfoFields}>
                <Text style={styles.modalLabel}>Proprietário:</Text>
                <Text style={styles.modalText}>Bianca Souza</Text>
              </View>

              <View style={styles.modalInfoFields}>
                <Text style={styles.modalLabel}>Telefone:</Text>
                <Text style={styles.modalText}>(35) 98877-6655</Text>
              </View>

              <View style={styles.modalInfoFields}>
                <Text style={styles.modalLabel}>E-mail:</Text>
                <Text style={styles.modalText}>biancasouza@gmail.com</Text>
              </View>
            </View>
          </View>

          <TouchableHighlight
            testID={'modal-button'}
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  modalView: {
    backgroundColor: '#e6e6e6',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: colors.blue,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  modalHeader: {
    flexDirection: 'row',
    marginBottom: 5
  },

  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.blue,
    backgroundColor: colors.blue
  },

  modalInfo: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 8
  },

  modalInfoFields: {
    flexDirection: 'row'
  },

  modalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.blue,
    paddingBottom: 5,
    paddingRight: 5
  },

  modalText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6e6e6e',
    paddingBottom: 5
  },

  button: {
    height: 30,
    width: 80,
    backgroundColor: colors.h1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },

  buttonText: {
    color: colors.blue,
    fontWeight: 'bold',
    fontSize: 14
  }
})
