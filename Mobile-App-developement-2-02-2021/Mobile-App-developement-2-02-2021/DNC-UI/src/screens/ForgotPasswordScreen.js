import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { Picker, Alert } from 'react-native'
const ForgotPasswordScreen = ({ navigation }) => {
  global.country = []
  const [email, setEmail] = useState({ value: '', error: '' })

  const [selectedValue, setSelectedValue] = useState('')
  const [data, setData] = useState([])

  const fetchData = () => {
    fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'api-token':
          's9_CZlzJOJFkYK135BwB5XRCqFvcSEuRjThc02VXAWOuzJUEmbZnHkGQq88QnzI4fJo',
        'user-email': 'muthupandip.mcci@gmail.com',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        const auth_token = responseJson.auth_token
        const example = 'Bearer ' + auth_token + ''
        console.log(example)
        console.log(auth_token)
        fetch('https://www.universal-tutorial.com/api/countries/', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + auth_token + '',
            Accept: 'application/json',
          },
        })
          .then(response => response.json())
          .then(responseJson => {
            //  console.log(JSON.stringify(responseJson.country_name));
            for (var i = 0; i < responseJson.length; i++) {
              const json = responseJson[i].country_name
              // country[''+i]=data;
              // console.log(i);
              country.push(json)
              // console.log(data);
              // setData(json)
            }

            setData(country)
          })
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => {
        console.error(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send Instructions
      </Button>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={value => setSelectedValue({ selectedValue: value })}
      >
        {data.map((value, key) => {
          return <Picker.Item label={value} value={value} key={key} />
        })}
      </Picker>
    </Background>
  )
}

export default ForgotPasswordScreen
