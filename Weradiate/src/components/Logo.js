import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => (
  <Image source={require('../assets/logo4.png')} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 50,
    marginTop: '10px',
    marginLeft: '10px',
  },
})

export default Logo
