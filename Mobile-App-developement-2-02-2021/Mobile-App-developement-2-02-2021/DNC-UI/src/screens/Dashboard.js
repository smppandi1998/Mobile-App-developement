import React, { useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { View } from 'react-native'
import { Alert } from 'react-native'
const Dashboard = ({ navigation }) => {
  let result

  let [wether, setwether] = useState('')

  const getWeather = () => {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/'
    const url = 'https://staging-iseechange.mcci.mobi/dncapp/rtemp'
    fetch(proxyurl + url, {
      method: 'POST',
    })
      //.then((response) => response.json())
      .then(response => response.json())
      .then(responseJson => {
        const abc = responseJson.results[0]
        const bcd = abc['series']
        const cde = bcd[0]['values']
        let len = cde.length

        for (var i = len - 1; i > 0; i--) {
          var dlist = cde[i]
          console.log(dlist)
          //  if(dlist[1] !== null)
          // {
          var result = Math.round(dlist[1] * 100) / 100
          setwether('12.45')
          console.log()
          break
          // };
        }

        /*  if( dlist[1]!= null)
        {
         result=JSON.stringify(cde[i]);
         console.log(result);
        if (wether == '') { 
         setwether(result)
         }
         break;
        }
     }*/
        //console.log(len);
      })

      .catch(error => {
        console.error(error)
      })
  }

  return (
    <Background>
      <Header>Temperature</Header>
      <View
        style={{
          width: '30%',
          height: '15%',
          alignItems: 'center',
          border: '20%',
          borderColor: 'green',
          backgroundColor: 'white',
          padding: '30%',
          margin: '2%',
        }}
      >
        <Paragraph
          style={{
            fontSize: 40,

            textAlign: 'center',

            marginBottom: 12,
          }}
        >
          {' '}
          {wether}
        </Paragraph>
      </View>

      <Button mode="contained" onPress={() => getWeather()}>
        REFRESH
      </Button>
    </Background>
  )
}

export default Dashboard
