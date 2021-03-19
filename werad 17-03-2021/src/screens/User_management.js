// Module: User_management
//
// Function:
//    Excel VBA subroutine that is called when button is clicked in the addin.
//
// Version:
//    V2.03  Mon Feb 08 2021 10:15:00 muthup   Edit level 3
//
// Copyright notice:
//   This file copyright (C) 2020-2021 by
//
//       MCCI Corporation
//       3520 Krums Corners Road
//        Ithaca, NY  14850
//
//   An unpublished work.  All rights reserved.
//
//   This file is proprietary information, and may not be disclosed or
//   copied without the prior permission of MCCI Corporation
//
// Author:
//   Muthupandi Pandiyaraj, MCCI Corporation March 2021
//
// Revision History:
//   2.01  Tue Mar 03 2020 11:57:00 muthup
//   Module created.

import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Picker, Alert } from 'react-native'
import UserTable from '../components/logouttable'
import { TouchableOpacity } from 'react-native-gesture-handler'
import '../components/logout_navigation.js'

const User_management = ({ navigation }) => {
  const [ClientVisible, setIsclientVisible] = React.useState(false)
  const [selectedValue, setselectedValue] = useState('')
  const [uname, setuname] = useState('')
  const getApitoken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const uname = await AsyncStorage.getItem('uname')
      if (token !== null && uname !== null) {
        setApi(token)
        setuname(uname.replace(/['"]+/g, ''))
        fetchData()
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getApitoken()
  }, [])
  const fetchData = () => {
    console.log('token')
  }
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
      <br />
      <br />

      <UserTable />
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

export default User_management
