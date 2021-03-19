import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Alert, Picker, Button } from 'react-native'
import TextInput from '../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ClientTable from '../components/ClientTable'
import modalbutton from '../components/Button'
import { Dialog, Portal } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Configurefield = ({ navigation }) => {
  let [email, setEmail] = useState({ value: '', error: '' })
  let [password, setPassword] = useState({ value: '', error: '' })
  let [sitename, setSitename] = useState({ value: '', error: '' })
  let [site, setsite] = useState([])
  let [pile, setpile] = useState([])
  let [servername, setServername] = useState({ value: '' })
  let [databasename, setdatabasename] = useState('')
  //let [pilename, setpilename] = useState('')
  let [measurementname, setmeasurementname] = useState('')
  let [locationname, setlocationname] = useState('')
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [pileDialogVisible, setpileDialogVisible] = useState(false)
  const [locationDialogVisible, setlocationDialogVisible] = useState(false)
  const [ClientVisible, setIsclientVisible] = React.useState(false)
  const [sitebuttonVisible, setsitebuttonVisible] = useState(true)
  const [sitetextVisible, setsitetextVisible] = useState(false)
  const [piletextVisible, setpiletextVisible] = useState(false)
  const [pilebuttonVisible, setpilebuttonVisible] = useState(true)
  const [locationbuttonVisible, setlocationbuttonVisible] = useState(true)
  const [data, setData] = useState([])
  const [selectedValue, setselectedValue] = useState('')
  const [siteValue, setsiteValue] = useState('')
  const [pileValue, setpileValue] = useState('')
  const [locationValue, setlocationValue] = useState('')
  const [Api, setApi] = useState('')
  const [uname, setuname] = useState('')
  const [location, setlocation] = useState([])
  const [siteservername, setsiteservername] = useState({})
  const [piledbname, setpiledbname] = useState({})
  const [pilemeasname, setpilemeasname] = useState({})
  const clients = []
  const sites = []
  const piles = []
  const locations = []
  const [touchopacity, settouchopacity] = useState(true)
  const getApitoken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const uname = await AsyncStorage.getItem('uname')
      const usertype = await AsyncStorage.getItem('usertype')
      if (usertype == 'Client') {
        settouchopacity(false)
      }
      if (token !== null && uname !== null) {
        setApi(token)
        setuname(uname.replace(/['"]+/g, ''))
        fetchClientlist(token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getApitoken()
  }, [])

  const NavigatClientScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ClientScreen' }],
    })
  }
  const NavigateConfigurefield = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Configurefield' }],
    })
  }

  const NavigateConfiguredevice = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Configuredevice' }],
    })
  }

  const NavigatUserScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  const NavigatDeviceScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'RegisterDevice' }],
    })
  }
  const Logutmodule = ({ selectedValue }) => {
    if (selectedValue == 'Logout') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
    }
    if (selectedValue == 'User') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'User_management' }],
      })
    }
  }
  const Addsite = () => {
    setsitetextVisible(false)
    setIsDialogVisible(false)
    if (sitetextVisible) {
      var url =
        'https://staging-analytics.weradiate.com/apidbm/site/' +
        '' +
        siteValue +
        ''

      const putMethod = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          server: servername.value,
        }),
      }

      fetch(url, putMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
    } else {
      var url = 'https://staging-analytics.weradiate.com/apidbm/site'
      const postMethod = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
          server: servername.value,
        }),
      }

      fetch(url, postMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
      //}
    }
  }

  const Addpile = () => {
    setpileDialogVisible(false)

    if (piletextVisible) {
      var url =
        'https://staging-analytics.weradiate.com/apidbm/pile/' +
        '' +
        pileValue +
        ''

      const putMethod = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
          dbname: databasename,
          measname: measurementname,
        }),
      }

      fetch(url, putMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
    } else {
      var url = 'https://staging-analytics.weradiate.com/apidbm/pile'
      const postMethod = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
          pile: pileValue,
          dbname: databasename,
          measname: measurementname,
        }),
      }

      fetch(url, postMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
      //}
    }
  }

  const Addlocation = () => {
    var url = 'https://staging-analytics.weradiate.com/apidbm/location'
    const postMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        client: selectedValue,
        site: siteValue,
        pile: pileValue,
        location: locationname,
      }),
    }

    fetch(url, postMethod).then(response => {
      const statusCode = response.status
      response.json().then(responseJson => {
        if (statusCode == 403) {
          alert('inavalid token/token expired')
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        } else if (responseJson['message'] != null) {
          alert(JSON.stringify(responseJson['message']))
        }
        navigation.reset({
          index: 0,
          routes: [{ name: 'Configurefield' }],
        })
      })
    })
    //}
  }
  const Deletesite = () => {
    if (siteValue == null || siteValue == 'Select the sites') {
      alert('Please select the site')
    } else {
      var url =
        'https://staging-analytics.weradiate.com/apidbm/site/' +
        '' +
        siteValue +
        ''
      const putMethod = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
        }),
      }

      fetch(url, putMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
    }
  }
  const Deletepile = () => {
    if (pileValue == null || pileValue == 'Select the Piles') {
      alert('Please select the pile')
    } else {
      var url =
        'https://staging-analytics.weradiate.com/apidbm/pile/' +
        '' +
        pileValue +
        ''
      const putMethod = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
        }),
      }

      fetch(url, putMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
    }
  }

  const Deletelocation = () => {
    if (locationValue == null || locationValue == 'Select the location') {
      alert('Please select the location')
    } else {
      var url =
        'https://staging-analytics.weradiate.com/apidbm/pile/' +
        '' +
        pileValue +
        ''
      const putMethod = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
          location: locationValue,
        }),
      }

      fetch(url, putMethod).then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          navigation.reset({
            index: 0,
            routes: [{ name: 'Configurefield' }],
          })
        })
      })
    }
  }

  const fetchClientlist = token => {
    fetch('https://staging-analytics.weradiate.com/apidbm/client', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token.replace(/['"]+/g, '') + '',
      },
    })
      .then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          clients.push('Select the Clients')

          for (var i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].cname

            clients.push(json)
          }

          setData(clients)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const fetchSitelist = itemValue => {
    var url = 'https://staging-analytics.weradiate.com/apidbm/listsite'

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        client: itemValue,
      }),
    })
      .then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          sites.push('Select the sites')

          for (var i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].site
            siteservername['' + responseJson[i].site + ''] =
              responseJson[i].server

            sites.push(json)
          }

          setsite(sites)
          setsiteservername(siteservername)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const fetchPilelist = itemValue => {
    const url = 'https://staging-analytics.weradiate.com/apidbm/listpile'
    const postMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        client: selectedValue,
        site: itemValue,
      }),
    }

    fetch(url, postMethod)
      .then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          piles.push('Select the Piles')

          for (var i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].pile
            piledbname['' + responseJson[i].pile + ''] = responseJson[i].dbname
            pilemeasname['' + responseJson[i].pile + ''] =
              responseJson[i].measname
            piles.push(json)
          }

          setpile(piles)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchLocationlist = itemValue => {
    const url = 'https://staging-analytics.weradiate.com/apidbm/listlocation'
    const postMethod = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        client: selectedValue,
        site: siteValue,
        pile: itemValue,
      }),
    }

    fetch(url, postMethod)
      .then(response => {
        const statusCode = response.status
        response.json().then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }

          locations.push('Select the location')

          for (var i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].lname

            locations.push(json)
          }

          setlocation(locations)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const cliendropdownEnabled = itemValue => {
    setselectedValue(itemValue)
    setsitebuttonVisible(false)
    fetchSitelist(itemValue)
  }
  const sitedropdownEnabled = itemValue => {
    setsiteValue(itemValue)

    setpilebuttonVisible(false)
    fetchPilelist(itemValue)
  }
  const piledropdownEnabled = itemValue => {
    setpileValue(itemValue)
    setpilebuttonVisible(false)
    setlocationbuttonVisible(false)
    fetchLocationlist(itemValue)
  }
  const editsite = () => {
    if (siteValue == null || siteValue == 'Select the sites') {
      alert('Please select the site')
    } else {
      setsitetextVisible(true)
      setIsDialogVisible(true)

      setServername({ value: siteservername['' + siteValue + ''], error: '' })
    }
  }
  const editpile = () => {
    if (pileValue == null || pileValue == 'Select the Piles') {
      alert('Please select the pile')
    }
    setsitetextVisible(true)
    setpiletextVisible(true)
    setpileDialogVisible(true)

    setdatabasename(piledbname['' + pileValue + ''])
    setmeasurementname(pilemeasname['' + pileValue + ''])
  }
  const Addsitebutton = () => {
    if (selectedValue == null || selectedValue == 'Select the Clients') {
      alert('Please select the client')
    } else {
      setsitetextVisible(false)
      setIsDialogVisible(true)
    }
  }
  const Addpilebutton = () => {
    if (siteValue == null || siteValue == 'Select the sites') {
      alert('Please select the site')
    } else {
      setsitetextVisible(true)
      setpiletextVisible(false)

      setpileDialogVisible(true)
    }
  }
  const Addlocationbutton = () => {
    if (pileValue == null || pileValue == 'Select the Piles') {
      alert('Please select the pile')
    } else {
      setsitetextVisible(true)
      setpiletextVisible(true)
      setlocationDialogVisible(true)
    }
  }

  return (
    <View>
      <View style={styles.container}>
        {touchopacity ? (
          <TouchableOpacity>
            <Text onPress={NavigatUserScreen} style={styles.touchopacity}>
              User
            </Text>
          </TouchableOpacity>
        ) : null}
        {touchopacity ? (
          <TouchableOpacity>
            <Text
              onDismiss={() => setIsclientVisible(false)}
              isVisible={ClientVisible}
              onPress={NavigatClientScreen}
              style={styles.touchopacity}
            >
              Client
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity>
          <Text style={styles.touchopacity} onPress={NavigateConfigurefield}>
            Configure Field
          </Text>
        </TouchableOpacity>
        {touchopacity ? (
          <TouchableOpacity>
            <Text onPress={NavigatDeviceScreen} style={styles.touchopacity}>
              Register Device
            </Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity>
          <Text onPress={NavigateConfiguredevice} style={styles.touchopacity}>
            Configure Device
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: '0px',
          }}
        >
          <Picker
            style={styles.picker}
            selectedValue={selectedValue}
            onValueChange={selectedValue => Logutmodule({ selectedValue })}
          >
            <Picker.Item label={uname} value={uname} />
            <Picker.Item label="Logout" value="Logout" />
            {touchopacity ? (
              <Picker.Item label="User Mangement" value="User" />
            ) : null}
          </Picker>
        </View>
      </View>

      <View style={styles.form}>
        <Picker
          selectedValue={selectedValue}
          style={{
            width: '100%',

            marginVertical: 12,
          }}
          onValueChange={itemValue => cliendropdownEnabled(itemValue)}
        >
          {data.map((value, key) => (
            <Picker.Item label={value} value={value} key={key} />
          ))}
        </Picker>

        <Button
          title="Add site"
          disabled={sitebuttonVisible}
          onPress={() => Addsitebutton()}
        />
        <Picker
          siteValue={siteValue}
          style={{
            width: '100%',

            marginVertical: 12,
          }}
          onValueChange={itemValue => sitedropdownEnabled(itemValue)}
        >
          {site.map((value, key) => (
            <Picker.Item label={value} value={value} key={key} />
          ))}
        </Picker>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Add pile"
            disabled={pilebuttonVisible}
            onPress={() => Addpilebutton()}
          />
          <Button
            title="Edit site"
            color="green"
            disabled={pilebuttonVisible}
            onPress={() => editsite()}
          />
          <Button
            title="Delete site"
            color="red"
            disabled={pilebuttonVisible}
            onPress={() => Deletesite()}
          />
        </View>

        <Picker
          siteValue={siteValue}
          style={{
            width: '100%',

            marginVertical: 12,
          }}
          onValueChange={itemValue => piledropdownEnabled(itemValue)}
        >
          {pile.map((value, key) => (
            <Picker.Item label={value} value={value} key={key} />
          ))}
        </Picker>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Add Location"
            disabled={locationbuttonVisible}
            onPress={() => Addlocationbutton()}
          />
          <Button
            title="Edit pile"
            color="green"
            disabled={locationbuttonVisible}
            onPress={() => editpile()}
          />
          <Button
            title="Delete pile"
            color="red"
            disabled={locationbuttonVisible}
            onPress={() => Deletepile()}
          />
        </View>

        <Picker
          siteValue={siteValue}
          style={{
            width: '100%',

            marginVertical: 12,
          }}
          onValueChange={itemValue => setlocationValue(itemValue)}
        >
          {location.map((value, key) => (
            <Picker.Item label={value} value={value} key={key} />
          ))}
        </Picker>
        <Button
          title="Delete Location"
          disabled={locationbuttonVisible}
          onPress={() => Deletelocation()}
        />
      </View>

      <Portal>
        <Dialog
          style={{ width: '40%', marginLeft: '30%' }}
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Add Site Information
          </Dialog.Title>
          <Dialog.Content
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <TextInput
              label="Enter the name"
              returnKeyType="next"
              defaultValue={selectedValue}
              disabled={true}
              // error={!!email.error}
              // errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter Site name"
              returnKeyType="next"
              value={siteValue}
              //defaultValue={siteValue}
              disabled={sitetextVisible}
              onChangeText={text => setsiteValue(text)}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter Server name"
              returnKeyType="next"
              value={servername.value}
              onChangeText={text => setServername({ value: text, error: '' })}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View
              style={{
                width: '10%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: '10%',
                flexDirection: 'row',
                marginRight: 'auto',
              }}
            >
              <Button title="Submit" onPress={Addsite} />
            </View>
            <View
              style={{
                width: '10%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: 'auto',
                flexDirection: 'row',
                marginRight: '10%',
              }}
            >
              <Button
                title="Cancel"
                onPress={() => setIsDialogVisible(false)}
              />
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* pile dilog */}
      <Portal>
        <Dialog
          style={{ width: '40%', marginLeft: '30%' }}
          visible={pileDialogVisible}
          onDismiss={() => setpileDialogVisible(false)}
        >
          <Dialog.Title
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Add Pile Information
          </Dialog.Title>
          <Dialog.Content
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <TextInput
              label="Enter the name"
              returnKeyType="next"
              defaultValue={selectedValue}
              disabled={true}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter Site name"
              returnKeyType="next"
              defaultValue={siteValue}
              disabled={sitetextVisible}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter pile name"
              returnKeyType="next"
              value={pileValue}
              onChangeText={text => setpileValue(text)}
              disabled={piletextVisible}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter database name"
              returnKeyType="next"
              value={databasename}
              onChangeText={text => setdatabasename(text)}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter measurement name"
              returnKeyType="next"
              value={measurementname}
              onChangeText={text => setmeasurementname(text)}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View
              style={{
                width: '10%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: '10%',
                flexDirection: 'row',
                marginRight: 'auto',
              }}
            >
              <Button title="Submit" onPress={Addpile} />
            </View>
            <View
              style={{
                width: '10%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: 'auto',
                flexDirection: 'row',
                marginRight: '10%',
              }}
            >
              <Button
                title="Cancel"
                onPress={() => setpileDialogVisible(false)}
              />
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{ width: '40%', marginLeft: '30%' }}
          visible={locationDialogVisible}
          onDismiss={() => setlocationDialogVisible(false)}
        >
          <Dialog.Title
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Add Location Information
          </Dialog.Title>
          <Dialog.Content
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <TextInput
              label="Enter the name"
              returnKeyType="next"
              defaultValue={selectedValue}
              disabled={true}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter Site name"
              returnKeyType="next"
              defaultValue={siteValue}
              disabled={sitetextVisible}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter pile name"
              returnKeyType="next"
              value={pileValue}
              disabled={piletextVisible}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
            <TextInput
              label="Enter location name"
              returnKeyType="next"
              value={locationname}
              onChangeText={text => setlocationname(text)}
              autoCapitalize="none"
              autoCompleteType="Text"
              textContentType="Text"
              keyboardType="Text"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View
              style={{
                width: '10%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: '10%',
                flexDirection: 'row',
                marginRight: 'auto',
              }}
            >
              <Button title="Submit" onPress={Addlocation} />
            </View>
            <View
              style={{
                width: '10%',
                marginVertical: 10,
                paddingVertical: 2,
                marginLeft: 'auto',
                flexDirection: 'row',
                marginRight: '10%',
              }}
            >
              <Button
                title="Cancel"
                onPress={() => setlocationDialogVisible(false)}
              />
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: '#606070',
    flexDirection: 'row',
    display: 'flex',
    // justifyContent: 'space-between'
  },
  button: {
    width: '10%',
    marginVertical: 10,
    paddingVertical: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  row: {
    flexDirection: 'row',
  },
  dilog: {
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dilog_content: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  touchopacity: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  picker: {
    width: 100,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  form: {
    width: '500px',
    padding: '10px',
    border: '5px solid gray',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export default Configurefield
