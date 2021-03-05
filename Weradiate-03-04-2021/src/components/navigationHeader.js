import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Picker, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class navigationHeader extends React.Component {
  render() {
    alert('muthu')
    return (
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
          <Picker.Item label="Werad" value="" />
          <Picker.Item label="Logout" value="Logout" />
          <Picker.Item label="User Mangement" value="User" />
        </Picker>{' '}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
    flexDirection: 'row',
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
