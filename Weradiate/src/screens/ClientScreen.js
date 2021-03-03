import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Alert, Picker } from 'react-native'
import TextInput from '../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ClientTable from '../components/ClientTable'
import Button from '../components/Button'
import { Dialog, Portal } from 'react-native-paper'

const ClientScreen = ({ navigation }) => {
  let [email, setEmail] = useState({ value: '', error: '' })
  let [password, setPassword] = useState({ value: '', error: '' })
  let [username, setUsername] = useState({ value: '', error: '' })
  // const [inputVal, setInputVal] = useState('test');
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [ClientVisible, setIsclientVisible] = React.useState(false)
  const [data, setData] = useState([])
  const [selectedValue, setselectedValue] = useState('')

  const clients = []
  const Api = localStorage.getItem('token')
  const NavigatClientScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ClientScreen' }],
    })
  }
  const NavigatUserScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'User_management' }],
    })
  }
  const NavigatDeviceScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Device' }],
    })
  }
  console.log(Api)

  const Logutmodule = ({ selectedValue }) => {
    if (selectedValue == 'Logout') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    }
    if (selectedValue == 'User') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ClientScreen' }],
      })
    }
  }

  const Addclient = () => {
    setIsDialogVisible(false)

    var url = 'https://staging-analytics.weradiate.com/apidbm/client'
    const putMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        name: username.value,
      }),
    }

    fetch(url, putMethod)
      .then(response => response.json())
      .then(responseJson => {
        alert(JSON.stringify(responseJson))
        navigation.reset({
          index: 0,
          routes: [{ name: 'ClientScreen' }],
        })
      })
  }

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text
            onPress={() => setIsclientVisible(true)}
            onPress={NavigatUserScreen}
            style={styles.touchopacity}
          >
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onDismiss={() => setIsclientVisible(false)}
            visible={ClientVisible}
            onPress={NavigatClientScreen}
            style={styles.touchopacity}
          >
            Client
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.touchopacity}>Configuration</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={NavigatDeviceScreen} style={styles.touchopacity}>
            Device
          </Text>
        </TouchableOpacity>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={selectedValue => Logutmodule({ selectedValue })}
        >
          <Picker.Item label="Logout" value="Logout" />
          <Picker.Item label="User Mangement" value="User" />
        </Picker>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => setIsDialogVisible(true)}
      >
        Add Client
      </Button>
      <ClientTable />
      <Portal>
        <Dialog
          style={{
            width: '40%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Add Client
          </Dialog.Title>
          <Dialog.Content
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <TextInput
              label="Enter the name"
              returnKeyType="next"
              value={username.value}
              onChangeText={text => setUsername({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              style={{
                width: '20%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              onPress={Addclient}
            >
              Submit
            </Button>
            <Button
              mode="contained"
              style={{
                width: '20%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              onPress={() => setIsDialogVisible(false)}
            >
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
    flexDirection: 'row',
  },
  button: {
    width: '10%',
    marginVertical: 10,
    paddingVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {
    flexDirection: 'row',
  },
  dilog: {
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dilog_content: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  touchopacity: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  picker: {
    width: 100,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
})

export default ClientScreen
