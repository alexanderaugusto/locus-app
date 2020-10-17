import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, Switch } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import colors from '../constants/colors.json'

import InputArea from '../components/InputArea'
import ButtonGroup from '../components/ButtonGroup'
import ImagePickerFunction from '../components/ImagePicker'

export default function SignUpImovel() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >

      <View style={styles.header} >
        <Text style={styles.message}>Olá Pedro Henrique,</Text>
        <Text style={styles.subMessage} numberOfLines={2}>cadastre o seu imóvel e aproveite as vantagens do IMovel!</Text>
      </View>

      <ProgressSteps
        activeStepIconBorderColor={colors['yellow']}
        completedProgressBarColor={colors['yellow']}
        activeLabelColor={colors['yellow']}
        completedLabelColor={colors['yellow']}
        completedStepIconColor={colors['yellow']}
        completedCheckColor={colors['platinum']}
      >
        <ProgressStep
          nextBtnText={'Próximo'}
          label="Básico"
          nextBtnStyle={styles.button}
          nextBtnTextStyle={styles.buttonText}
          scrollable={true}
        >
          <View style={styles.containerInput}>
            <Text style={styles.label}>Tipo de imóvel:</Text>
            <ButtonGroup />

            <Text style={styles.label}>Título do anúncio</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

            <Text style={styles.label}>Descrição</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

          </View>
        </ProgressStep>

        <ProgressStep
          label="Endereço"
          nextBtnText={'Próximo'}
          previousBtnText={'Anterior'}
          nextBtnStyle={styles.button}
          previousBtnStyle={styles.button}
          nextBtnTextStyle={styles.buttonText}
          previousBtnTextStyle={styles.buttonText}
          scrollable={true}
        >
          <View style={styles.containerInput}>
            <Text style={styles.label}>Rua</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

            <Text style={styles.label}>Bairro</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

            <Text style={styles.label}>Cidade</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

            <Text style={styles.label}>País</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

          </View>
        </ProgressStep>

        <ProgressStep
          label="Opções"
          nextBtnText={'Próximo'}
          previousBtnText={'Anterior'}
          nextBtnStyle={styles.button}
          previousBtnStyle={styles.button}
          nextBtnTextStyle={styles.buttonText}
          previousBtnTextStyle={styles.buttonText}
          scrollable={true}
        >
          <View style={styles.containerInput}>

            <Text style={styles.label}>Quartos</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

            <Text style={styles.label}>Banheiro</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

            <Text style={styles.label}>Área</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />


            <View style={styles.containerSwitch}>
              <Text> Permite Animal</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>

          </View>
        </ProgressStep>

        <ProgressStep
          label="Financeiro"
          nextBtnText={'Próximo'}
          previousBtnText={'Anterior'}
          nextBtnStyle={styles.button}
          previousBtnStyle={styles.button}
          nextBtnTextStyle={styles.buttonText}
          previousBtnTextStyle={styles.buttonText}
          scrollable={true}
        >
          <View style={styles.containerInput}>

            <Text style={styles.label}>Preço</Text>
            <InputArea placeholder={'Ex: pedrohs@gmail.com'} />

          </View>
        </ProgressStep>

        <ProgressStep
          label="Foto"
          previousBtnText={'Anterior'}
          finishBtnText={'Finalizar'}
          nextBtnStyle={styles.button}
          previousBtnStyle={styles.button}
          nextBtnTextStyle={styles.buttonText}
          previousBtnTextStyle={styles.buttonText}
          scrollable={false}
        >
          <View style={styles.containerInput}>
            <ImagePickerFunction />
          </View>
        </ProgressStep>

      </ProgressSteps>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["platinum"],
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  containerInput: {
    marginBottom: 20,
  },

  header: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    width: 300,
    fontSize: 24,
    fontWeight: "600",
    color: colors['blue'],
    textAlign: 'left',
  },

  subMessage: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "500",
    color: colors['blue'],
    textAlign: 'left',
  },

  label: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
    color: colors['blue'],
  },

  button: {
    height: 35,
    width: 90,
    backgroundColor: colors['yellow'],
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: colors['blue'],
    fontWeight: 'bold',
    fontSize: 16,
  },

  containerSwitch: {
    flexDirection: "row",
    alignItems: 'center',
  }

})