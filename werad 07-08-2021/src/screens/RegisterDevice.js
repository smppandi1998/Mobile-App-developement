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
import Datetime from 'react-datetime'
//import "react-datetime/css/react-datetime.css";
import * as moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
const RegisterDevice = ({ navigation }) => {
  let [email, setEmail] = useState({ value: '', error: '' })
  let [password, setPassword] = useState({ value: '', error: '' })
  let [Hardwareid, setHardwareid] = useState({ value: '', error: '' })
  let [deviceid, setdeviceid] = useState({ value: '', error: '' })
  let [devid, setdevid] = useState({ value: '', error: '' })
  let [deveui, setdeveui] = useState({ value: '', error: '' })
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [ClientVisible, setIsclientVisible] = React.useState(false)
  const [data, setData] = useState([])
  const [selectedValue, setselectedValue] = useState('')
  const [Api, setApi] = useState('')
  const [uname, setuname] = useState('')

  const getApitoken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const uname = await AsyncStorage.getItem('uname')
      if (token !== null && uname !== null) {
        setApi(token)
        setuname(uname.replace(/['"]+/g, ''))
        fetchData(token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getApitoken()
  }, [])

  const [datevalue, onChange] = useState()

  const date = moment(datevalue).format('MM/DD/YYYY')
  const time = moment(datevalue).format('HH:mm:ss')
  const datestringvalue = date + ',' + time

  let inputProps = {
    placeholder: 'Date and time',
    className: 'datetime',
  }

  const clients = []

  const NavigatClientScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ClientScreen' }],
    })
  }
  const NavigateConfigurefield = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Configurefield' }],
    })
  }

  const NavigateConfiguredevice = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Configuredevice' }],
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
      routes: [{ name: 'RegisterDevice' }],
    })
  }
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
  console.log(Api)
  const fetchData = token => {
    fetch('https://staging-analytics.weradiate.com/apidbm/client', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token.replace(/['"]+/g, '') + '',
      },
    })
      .then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          clients.push('Select the Clients')

          for (var i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].cname

            clients.push(json)
          }

          setData(clients)
          //alert(JSON.stringify(clients));
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const Adddevice = () => {
    setIsDialogVisible(false)

    var url = 'https://staging-analytics.weradiate.com/apidbm/mdevice'
    const putMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        client: selectedValue,
        hwid: Hardwareid.value,
        deviceid: deviceid.value,
        devID: devid.value,
        devEUI: deveui.value,
        datetime: datestringvalue,
      }),
    }

    fetch(url, putMethod).then(response => {
      const statusCode = response.status
      response.json().then(responseJson => {
        if (statusCode == 403) {
          alert('inavalid token/token expired')
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        } else if (responseJson['message'] != null) {
          alert(JSON.stringify(responseJson['message']))
        }
        navigation.reset({
          index: 0,
          routes: [{ name: 'RegisterDevice' }],
        })
      })
    })
  }

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text onPress={NavigatUserScreen} style={styles.touchopacity}>
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            onDismiss={() => setIsclientVisible(false)}
            isVisible={ClientVisible}
            onPress={NavigatClientScreen}
            style={styles.touchopacity}
          >
            Client
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.touchopacity} onPress={NavigateConfigurefield}>
            Configure Field
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={NavigatDeviceScreen} style={styles.touchopacity}>
            Register Device
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={NavigateConfiguredevice} style={styles.touchopacity}>
            Configure Device
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: '0px',
          }}
        >
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
          style={{ width: '40%', marginLeft: '30%' }}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Add Device
          </Dialog.Title>
          <Dialog.Content
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Datetime
              dateFormat="MM-DD-YYYY"
              timeFormat={true}
              onChange={onChange}
              inputProps={inputProps}
              value={datevalue}
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
              label="Enter Hardware ID"
              returnKeyType="next"
              value={Hardwareid.value}
              onChangeText={text => setHardwareid({ value: text, error: '' })}
              // error={!!email.error}
              // errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />

            <TextInput
              label="Enter Device ID"
              returnKeyType="next"
              value={deviceid.value}
              onChangeText={text => setdeviceid({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter dev ID"
              returnKeyType="next"
              value={devid.value}
              onChangeText={text => setdevid({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter dev EUI"
              returnKeyType="next"
              value={deveui.value}
              onChangeText={text => setdeveui({ value: text, error: '' })}
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
              onPress={Adddevice}
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
