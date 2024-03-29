import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { theme } from '../core/theme'
import HeaderFooter from '../components/HeaderFooter'
import Footer from '../components/Footer'
const Background = ({ children }) => (
  <ImageBackground
    source={require('../assets/background.jpg')}
    //resizeMode="repeat"
    style={styles.background}
  >
    <KeyboardAvoidingView
      keyboardVerticalOffset={0}
      style={styles.container}
      behavior="padding"
    >
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Background
