import React from 'react'
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
// import api from '../services/api'

import colors from '../utils/constants/colors.json'

export default function ScheduleVisit() {
  const navigation = useNavigation()
  // const route = useRoute()

  // const [buttonLoading, setButtonLoading] = useState(false)

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name={'arrow-left'} size={20} color={colors.h1} />
        </TouchableOpacity>

        <Text numberOfLiner={2} style={styles.title}>
          Agendar visita ao imóvel
        </Text>

        {/* <TouchableOpacity
          disabled={buttonLoading}
          style={styles.contactButton}
          onPress={handleContact}
        >
          {buttonLoading && (
            <ActivityIndicator
              style={styles.buttonLoader}
              size="small"
              color={colors['light-secondary']}
            />
          )}
          <Text style={styles.contactButtonText}>Enviar</Text>
        </TouchableOpacity> */}
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['light-primary'],
    padding: 30
  },

  title: {
    width: 300,
    fontSize: 23,
    fontWeight: '600',
    color: colors.h1,
    textAlign: 'center',
    paddingTop: 15
  },

  contactButton: {
    height: 35,
    width: 100,
    backgroundColor: colors.blue,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: 20
  },

  contactButtonText: {
    color: colors['light-secondary'],
    fontWeight: 'bold',
    fontSize: 16
  },

  buttonLoader: {
    marginRight: 10,
    marginLeft: -10
  }
})
