import React, { useState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import {Alert} from 'react-native'
const Dashboard = ({ navigation }) => {
  let wether='hi';
  //const [wether, setwether] = useState('');
 // state = {msg: ""};
   const getWeaher = () => {
   
   const proxyurl = "https://cors-anywhere.herokuapp.com/";
   const url = "https://staging-iseechange.mcci.mobi/dncbe/version";
   fetch(proxyurl + url, {
     method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
     
     console.log(responseJson);
      wether=JSON.stringify(responseJson);
      <Paragraph>{wether}</Paragraph>
     alert(wether);
     //setwether=wether1;
     //return wether;
         
  })
  
  .catch((error) => {
     console.error(error);
  });
  
 }
 return(
  
 
   <Background>
   <Header >Temperature</Header>
   
   
   <Button
   onPress={getWeaher}
   >
    REFRESH
   </Button>
   </Background>

)
}

export default Dashboard
