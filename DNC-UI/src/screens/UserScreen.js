import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity ,SafeAreaView} from 'react-native'
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
import * as MailComposer from "expo-mail-composer"
const UserScreen = ({ navigation }) => {
  console.log('user');
  const [Username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [Clientname, setClientname] = useState({ value: '', error: '' })
  const onSignUpPressed = () => {
    const UsernameError = nameValidator(Username.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const ClientnameError = nameValidator(Clientname.value)
    if (emailError || passwordError || UsernameError||ClientnameError) {
      setUsername({ ...Username, error: UsernameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setClientname({ ...Clientname, error: ClientnameError })
      return
    }
    MailComposer.composeAsync({
      recipients: ['muthupandip1998@gmail.com'], // array of email addresses
      subject: "MCCI OPT",
      body: "1213333123"
    })
    console.log(Username.value);
    console.log(password.value);
    console.log(email.value);
    console.log(Clientname.value);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Otp' }],
    })
  }

  return (
    
    <Background>
      
      <Logo />
      <Header>Create User Account</Header>
	  <TextInput
        label="Client Name"
        returnKeyType="next"
        value={Clientname.value}
        onChangeText={(text) => setClientname({ value: text, error: '' })}
        
      />
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={Username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!Username.error}
        errorText={Username.error}
      />
     <SafeAreaView style={styles.row}>
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
      
      <Button
        mode="contained"
        
        style={{ width: '30%',height: '50%',
        marginLeft: 35,
        paddingVertical: 1,fontWeight: 'bold',
        color: theme.colors.primary, }}
      >
        Verify
      </Button>
      </SafeAreaView>
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
        Style={styles.button1}
        onPress={onSignUpPressed}
        
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

export default UserScreen
