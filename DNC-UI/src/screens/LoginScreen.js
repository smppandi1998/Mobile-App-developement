import React, { useState} from 'react'
import { TouchableOpacity, StyleSheet, View} from 'react-native'
import { Picker} from '@react-native-picker/picker'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'

import Button from '../components/Button'
import TextInput from '../components/TextInput'
import HeaderFooter from '../components/HeaderFooter'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const LoginScreen = ({ navigation }) => {
  const country=[];
  const selectedValue='';
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [state,setState] = useState({country, error: '' })
 

//  const [selectedValue, setSelectedValue] = useState("java");
	  

    fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
    "api-token": "s9_CZlzJOJFkYK135BwB5XRCqFvcSEuRjThc02VXAWOuzJUEmbZnHkGQq88QnzI4fJo",
    "user-email": "muthupandip.mcci@gmail.com"
      }
   })
   .then((response) => response.json())
   .then((responseJson) => {
      
      const auth_token=responseJson.auth_token;
      const example= "Bearer "+auth_token+"";
      console.log(example);
      console.log(auth_token);
      fetch("https://www.universal-tutorial.com/api/countries/", {
        method: 'GET',
        headers: {
          "Authorization":  "Bearer "+auth_token+"",
          "Accept": "application/json"
        }
     })
     .then((response) => response.json())
     .then((responseJson) => {
       
      for (let i=0;i<responseJson.length;i++)
       {
        const data=responseJson[i].country_name;
        country.push(data);
      
       }
      
     
       setState(country ); 
       console.log(country);
     })
     .catch((error) => {
        console.error(error);
     });
     
   })
   .catch((error) => {
      console.error(error);
   });


   
  
   
  
  const onLoginPressed = () => {
    const emailError = nameValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    console.log(email.value);
    console.log(password.value);
{/*	  const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://staging-iseechange.mcci.mobi/dncbe/version";
    fetch(proxyurl + url, {
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log(responseJson);
      this.setState({
         data: responseJson
      })
   })
   .catch((error) => {
      console.error(error);
   });*/}
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }
  const onSignupPressed = () => {
   
	//  const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://staging-iseechange.mcci.mobi/dncbe/signup";
    fetch(url, {
      method: 'POST'
   })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log(responseJson);
      console.log(responseJson.message);
      
      const result="Welcome Admin"
      
      
      if (responseJson.message==result)
       {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterScreen' }],
       })
      }
  else 
   {
    navigation.reset({
      index: 0,
      routes: [{ name: 'UserScreen' }],
    })
  }
   })
   .catch((error) => {
      console.error(error);
   });
   
  }
  return (
  
    <Background>
      
    


    
      <Logo />
      <Header>DNC</Header>
      <TextInput
        label="User name"
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
        <Text style={{color:'white'}}>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSignupPressed}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setState({selectedValue: itemValue})} >
                { state.country.map((item, key)=>
                  <Picker.Item label={item.name} value={item.name} key={key} />
                )}
         
      </Picker>
     
    </Background>
	
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width:'100%',
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
