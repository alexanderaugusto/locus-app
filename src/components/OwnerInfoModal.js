import React from 'react'
import {
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Linking
} from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5'
import Icon2 from '@expo/vector-icons/FontAwesome'
import { STORAGE_URL } from '../services/api'

import colors from '../utils/constants/colors.json'

export default function OwnerInfoModal({ isVisible, toggle, dataInfos }) {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        // onRequestClose={toggle()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggle()}
            >
              <Icon2 name={'close'} size={22} color={colors.h1} />
            </TouchableOpacity>

            <Text numberOfLiner={2} style={styles.title}>
              Informações do proprietário
            </Text>

            <Image
              style={styles.ownerAvatar}
              source={{
                uri: dataInfos.owner.is_oauth_user
                  ? dataInfos.owner.avatar
                  : `${STORAGE_URL}/user/${dataInfos.owner.avatar}`
              }}
            />

            <View style={styles.ownerInfo}>
              <Icon name="phone" size={25} color={colors.h1} />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://api.whatsapp.com/send?phone=+5535984529203&&text=Olá, ${dataInfos.owner.name}! \n\n Estou interessado no seu imóvel de título: ${dataInfos.title} \n\n Poderia me passar mais informações?`
                  )
                }
              >
                <Text style={styles.contactText}>{dataInfos.owner.phone}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ownerInfo}>
              <Icon name="envelope" size={25} color={colors.h1} />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `mailto:${dataInfos.owner.email}?subject=Locus - Aluguel de imóvel&body=Olá, ${dataInfos.owner.name}! \n\n Estou interessado no seu imóvel de título: ${dataInfos.title} \n\n Poderia me passar mais informações?`
                  )
                }
              >
                <Text style={styles.contactText}>{dataInfos.owner.email}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ownerInfo}>
              <Icon name="map-marker-alt" size={25} color={colors.h1} />
              <View>
                <Text style={styles.contactText}>
                  {dataInfos.address.street +
                    ', ' +
                    dataInfos.address.neighborhood}
                </Text>
                <Text style={styles.contactText}>
                  {dataInfos.address.city + ' - ' + dataInfos.address.state}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%'
  },

  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 5
  },

  title: {
    width: 280,
    fontSize: 20,
    fontWeight: '600',
    color: colors.h1,
    textAlign: 'center',
    paddingTop: 15
  },

  ownerAvatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: 'center',
    marginVertical: 15
  },

  ownerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10
  },

  contactText: {
    fontSize: 17,
    color: colors.h2,
    marginLeft: 15
  }
})
