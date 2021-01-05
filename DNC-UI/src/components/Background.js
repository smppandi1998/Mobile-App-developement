import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { theme } from '../core/theme'
import HeaderFooter from '../components/HeaderFooter'
const Background = ({ children }) => (
  
  <ImageBackground
    source={require('../assets/background.jpg')}
    //resizeMode="repeat"
    style={styles.background}
  ><HeaderFooter>kjj</HeaderFooter>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
    <HeaderFooter>kjj</HeaderFooter>
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