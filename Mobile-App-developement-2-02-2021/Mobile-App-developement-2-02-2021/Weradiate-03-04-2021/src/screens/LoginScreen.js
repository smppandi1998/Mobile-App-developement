import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { AsyncStorage } from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const LoginScreen = ({ navigation }) => {
  const country = []
  const Api_Token = ''

  let [email, setEmail] = useState({ value: '', error: '' })
  let [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const emailError = nameValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    console.log(email.value)
    console.log(password.value)
    var data = {
      uname: email.value,
      pwd: password.value,
    }

    const postmethod = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://staging-analytics.weradiate.com/apidbm/dlogin'
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)

        const result = 'User ID and Password is not valid'
        if (responseJson.message == result) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
          alert(result)
        } else {
          const token = JSON.stringify(responseJson['token'])
          console.log(token)

          localStorage.setItem('token', token)

          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  const onSignupPressed = () => {
    //  const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://staging-iseechange.mcci.mobi/dncbe/signup'
    fetch(url, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        console.log(responseJson.message)

        const result = 'Welcome Admin'

        if (responseJson.message == result) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'RegisterScreen' }],
          })
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'UserScreen' }],
          })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <Background>
      <TextInput
        label="User name"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={{ color: 'white' }}>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSignupPressed}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.third,
  },

  link: {
    fontWeight: 'bold',
    color: theme.colors.third,
  },
})

export default LoginScreen
