import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Picker,
  TouchableOpacity,
} from 'react-native'
import TextInput from '../components/TextInput'
//import { TouchableOpacity } from 'react-native-gesture-handler'
import UserTable from '../components/DeviceTable'
import Button from '../components/Button'
import { Dialog, Portal } from 'react-native-paper'
//import Datetime from 'react-datetime';
//import "react-datetime/css/react-datetime.css";

const RegisterDevice = ({ navigation }) => {
  let [email, setEmail] = useState({ value: '', error: '' })
  let [password, setPassword] = useState({ value: '', error: '' })
  let [username, setUsername] = useState({ value: '', error: '' })
  // const [inputVal, setInputVal] = useState('test');
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [ClientVisible, setIsclientVisible] = React.useState(false)
  const [data, setData] = useState([])
  const [selectedValue, setselectedValue] = useState('')
  //const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const uname = localStorage.getItem('uname')
  const [value, onChange] = useState(new Date())
  alert(value)

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };

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
        routes: [{ name: 'User_management' }],
      })
    }
  }

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
      routes: [{ name: 'Dashboard' }],
    })
  }
  const NavigatDeviceScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Device' }],
    })
  }
  console.log(Api)
  const fetchData = () => {
    fetch('https://staging-analytics.weradiate.com/apidbm/client', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        clients.push('Select the Clients')

        for (var i = 0; i < responseJson.length; i++) {
          const json = responseJson[i].cname

          clients.push(json)
        }

        setData(clients)
        localStorage.setItem('clients', clients)
      })
      .catch(error => {
        console.error(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const Adduser = () => {
    setIsDialogVisible(false)

    var url = 'https://staging-analytics.weradiate.com/apidbm/cuser'
    const putMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        cname: selectedValue,
        uname: username.value,
        pwd: password.value,
        email: email.value,
      }),
    }

    fetch(url, putMethod)
      .then(response => response.json())
      .then(responseJson => {
        alert(JSON.stringify(responseJson))
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
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
          <Text style={styles.touchopacity}>Configure Field</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={NavigatDeviceScreen} style={styles.touchopacity}>
            Register Device
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={NavigatDeviceScreen} style={styles.touchopacity}>
            Configure Device
          </Text>
        </TouchableOpacity>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={selectedValue => Logutmodule({ selectedValue })}
        >
          <Picker.Item label={uname} value={uname} />
          <Picker.Item label="Logout" value="Logout" />
          <Picker.Item label="User Mangement" value="User" />
        </Picker>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => setIsDialogVisible(true)}
      >
        Add Device
      </Button>
      <UserTable />
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
            Add User
          </Dialog.Title>
          <Dialog.Content
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Picker
              selectedValue={selectedValue}
              style={{
                width: '100%',

                marginVertical: 12,
              }}
              onValueChange={itemValue => setselectedValue(itemValue)}
            >
              {data.map((value, key) => (
                <Picker.Item label={value} value={value} key={key} />
              ))}
            </Picker>
            <TextInput
              label="Enter Hardware ID"
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
            <Picker
              selectedValue={selectedValue}
              style={{
                width: '100%',

                marginVertical: 12,
              }}
              onValueChange={itemValue => setselectedValue(itemValue)}
            >
              {data.map((value, key) => (
                <Picker.Item label={value} value={value} key={key} />
              ))}
            </Picker>
            <TextInput
              label="Enter Device ID"
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
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
              onPress={Adduser}
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

export default RegisterDevice
