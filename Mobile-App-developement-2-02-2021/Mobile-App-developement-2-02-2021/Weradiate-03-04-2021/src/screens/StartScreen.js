import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>DNC</Header>
    <Paragraph />
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('UserScreen')}>
      Sign Up
    </Button>
  </Background>
)

export default StartScreen
