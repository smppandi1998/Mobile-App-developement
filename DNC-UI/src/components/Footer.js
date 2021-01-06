import React from 'react';
import { Text } from 'react-native-paper'
import {  View } from 'react-native'
class Footer extends React.Component
{
  render()
  {
    return (
      
      <View   style={{overflow: 'hidden',
        backgroundColor: '#f1f1f1',
        paddingHorizontal:'2%',
        paddingVertical:'2%'}}>
      
     
        <Text style={{fontSize:20,color:'#800080'}}>Copyright © MCCI interconnect sollutions. All rights reserved.</Text>
        
       
    </View >
    )
  }
}
export default Footer;
