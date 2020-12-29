import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

const RegisterScreen = ({ navigation }) => {
  console.log('register');
  const [Username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [Orgname, setOrgname] = useState({ value: '', error: '' })
  const onSignUpPressed = () => {
    const UsernameError = nameValidator(Username.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const OrgnameError = nameValidator(Orgname.value)
    if (emailError || passwordError || UsernameError||OrgnameError) {
      setUsername({ ...Username, error: UsernameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setOrgname({ ...Orgname, error: OrgnameError })
      return
    }
    console.log(Username.value);
    console.log(password.value);
    console.log(email.value);
    console.log(Orgname.value);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://staging-iseechange.mcci.mobi/dncbe/asignup";
    fetch(proxyurl + url, {  
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    oname: Orgname.value,
    uname: Username.value,
    pwd : password.value,
    email : email.value,
  })
}).then(function(response){ 
  return response.json();   
 })
 .then(function(data){ 
 console.log(data)
 });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    
    <Background>
      
      <Logo />
      <Header>Create Admin Account</Header>
	  <TextInput
        label="Organization Name"
        returnKeyType="next"
        value={Orgname.value}
        onChangeText={(text) => setOrgname({ value: text, error: '' })}
        
      />
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={Username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!Username.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
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
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
	
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default RegisterScreen
