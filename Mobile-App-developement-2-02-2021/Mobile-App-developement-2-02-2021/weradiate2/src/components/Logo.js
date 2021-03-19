import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => (
  <Image source={require('../assets/logo.jpg')} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 30,
    marginBottom: 8,
  },
})

export default Logo
