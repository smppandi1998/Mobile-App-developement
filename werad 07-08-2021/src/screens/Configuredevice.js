import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Alert, Picker } from 'react-native'
import TextInput from '../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler'
import UserTable from '../components/UserTable'
import Button from '../components/Button'
import { Dialog, Portal } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as moment from 'moment'
import Datetime from 'react-datetime'
//import "react-datetime/css/react-datetime.css";
const Configuredevice = ({ navigation }) => {
  let [site, setsite] = useState([])
  let [pile, setpile] = useState([])
  let [hwid, sethwid] = useState([])
  const [selecteddatevalue, onChange] = useState()
  let [servername, setServername] = useState({ value: '' })
  let [databasename, setdatabasename] = useState('')
  let [pilename, setpilename] = useState('')
  let [measurementname, setmeasurementname] = useState('')
  let [removedevicepicker, setremovedevicepicker] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [isreplaceDialogVisible, setIsreplaceDialogVisible] = useState(false)
  const [isremoveDialogVisible, setIsremoveDialogVisible] = useState(false)
  const [removesubmit, setremovesubmit] = useState(false)
  const [replacesubmit, setreplacesubmit] = useState(false)
  const [deletesubmit, setdeletesumbit] = useState(false)
  const [ClientVisible, setIsclientVisible] = React.useState(false)
  const [newdeviceValue, setnewdeviceValue] = useState('')
  const [datetextVisible, setdatetextVisible] = useState(false)
  const [piletextVisible, setpiletextVisible] = useState(false)
  const [pilebuttonVisible, setpilebuttonVisible] = useState(true)
  const [locationbuttonVisible, setlocationbuttonVisible] = useState(true)
  const [data, setData] = useState([])
  const [replacedata, setreplaceData] = useState([])
  const [selectedValue, setselectedValue] = useState('')
  const [siteValue, setsiteValue] = useState('')
  const [pileValue, setpileValue] = useState('')
  const [locationValue, setlocationValue] = useState('')
  const [deviceValue, setdeviceValue] = useState('')
  const [Api, setApi] = useState('')
  const [uname, setuname] = useState('')
  const [location, setlocation] = useState([])
  let [device, setdevice] = useState([])
  const [siteservername, setsiteservername] = useState({})
  const [dateValue, setdateValue] = useState('')
  const [piledbname, setpiledbname] = useState({})
  const [pilemeasname, setpilemeasname] = useState({})
  const clients = []
  const sites = []
  const piles = []
  const locations = []
  const devices = []
  const removedevices = []
  const removedevicesdate = {}
  const hwids = []
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
  let inputProps = {
    placeholder: 'Date and time',
    className: 'datetime',
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

            sites.push(json)
          }

          setsite(sites)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  const AddDevice = () => {
    if (removesubmit) {
      setIsremoveDialogVisible(false)
      const date = moment(selecteddatevalue).format('MM/DD/YYYY')
      const time = moment(selecteddatevalue).format('HH:mm:ss')
      const datestringvalue = date + ',' + time
      var url =
        'https://staging-analytics.weradiate.com/apidbm/rmdevice/' +
        '' +
        deviceValue +
        ''
      const postMethod = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
          pile: pileValue,
          id: deviceValue,
          location: locationValue,
          datetime: datestringvalue,
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
          })
        })
        .catch(error => {
          console.error(error)
        })
      setremovesubmit(false)
    } else if (replacesubmit) {
      setIsreplaceDialogVisible(false)

      var url =
        'https://staging-analytics.weradiate.com/apidbm/rpdevice/' +
        '' +
        deviceValue +
        ''
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
          newdev: newdeviceValue,
          location: locationValue,
          datetime: dateValue,
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
          })
        })
        .catch(error => {
          console.error(error)
        })
      setreplacesubmit(false)
    } else if (deletesubmit) {
      setIsDialogVisible(false)

      var url =
        'https://staging-analytics.weradiate.com/apidbm/device/' +
        '' +
        deviceValue +
        ''
      const postMethod = {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
        },
        body: JSON.stringify({
          client: selectedValue,
          site: siteValue,
          pile: pileValue,

          location: locationValue,
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
          })
        })
        .catch(error => {
          console.error(error)
        })

      setdeletesumbit(false)
    } else {
      setIsDialogVisible(false)
      var url = 'https://staging-analytics.weradiate.com/apidbm/device'
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
          id: deviceValue,
          location: locationValue,
          datetime: dateValue,
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
          })
        })
        .catch(error => {
          console.error(error)
        })
    }
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

  const fetchDevicelist = selectedValue => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/listmdev/' +
      '' +
      selectedValue +
      ''
    const Getmethod = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
    }

    fetch(url, Getmethod)
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
          let hwids1 = responseJson['hwids']

          devices.push('Select the devices')
          for (let i = 0; i < hwids1.length; i++) {
            const activehwid = hwids1[i]
            hwids.push(activehwid)

            devices.push(activehwid['hwid'])
          }

          setdevice(devices)
          sethwid(hwids)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const fetchremoveDevicelist = itemValue => {
    var url = 'https://staging-analytics.weradiate.com/apidbm/listrmdev'

    const postmethod = {
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
        location: itemValue,
      }),
    }

    fetch(url, postmethod)
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

          removedevices.push('Select the device')
          for (let i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].devid

            removedevices.push(json)
          }

          setreplaceData(removedevices)
          sethwid(hwids)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const cliendropdownEnabled = itemValue => {
    setselectedValue(itemValue)

    fetchSitelist(itemValue)
  }
  const sitedropdownEnabled = itemValue => {
    setsiteValue(itemValue)

    fetchPilelist(itemValue)
  }
  const piledropdownEnabled = itemValue => {
    setpileValue(itemValue)

    fetchLocationlist(itemValue)
  }
  const locationdropdownEnabled = itemValue => {
    setlocationValue(itemValue)

    if (removedevicepicker || deletesubmit) {
      fetchremoveDevicelist(itemValue)
      setremovedevicepicker(false)
    } else {
      fetchDevicelist(selectedValue)
    }
  }
  const decicedropdownEnabled = itemValue => {
    setdeviceValue(itemValue)
    fetchDevicelist(selectedValue)
    if (!removesubmit && !replacesubmit) {
      for (let i = 0; i < hwid.length; i++) {
        const date1 = hwid[i]
        if (date1['hwid'] == itemValue) {
          const datetime = date1['date']
          const date = moment(datetime).format('MM/DD/YYYY')
          const time = moment(datetime).format('HH:mm:ss')

          const datestringvalue = date + ',' + time

          setdateValue(datestringvalue)
        }
      }
    }

    setdatetextVisible(true)
  }
  const removeDevice = () => {
    setremovedevicepicker(true)
    setIsremoveDialogVisible(true)
    setremovesubmit(true)
  }
  const addDevice = () => {
    setremovesubmit(false)
    setIsDialogVisible(true)
  }
  const replaceDevice = () => {
    setreplacesubmit(true)
    setremovedevicepicker(true)
    setremovesubmit(false)
    setIsreplaceDialogVisible(true)
  }
  const deleteDevice = () => {
    setdeletesumbit(true)
    setreplacesubmit(false)
    setremovedevicepicker(false)
    setremovesubmit(false)
    setIsDialogVisible(true)
  }
  const newDevice = itemValue => {
    // fetchDevicelist(selectedValue);

    setnewdeviceValue(itemValue)
    for (let i = 0; i < hwid.length; i++) {
      const date1 = hwid[i]
      if (date1['hwid'] == itemValue) {
        const datetime = date1['date']
        const date = moment(datetime).format('MM/DD/YYYY')
        const time = moment(datetime).format('HH:mm:ss')

        const datestringvalue = date + ',' + time

        setdateValue(datestringvalue)
      }
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
            <Picker.Item label="User Mangement" value="User" />
          </Picker>
        </View>
      </View>
      <View>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => addDevice()}
        >
          New Device
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => removeDevice()}
        >
          Remove Device
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => replaceDevice()}
        >
          Replace Device
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => deleteDevice()}
        >
          Delete Device
        </Button>

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
              Add Device Information
            </Dialog.Title>
            <Dialog.Content
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
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
              <Picker
                pileValue={pileValue}
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
              <Picker
                locationValue={locationValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => locationdropdownEnabled(itemValue)}
              >
                {location.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
              <Picker
                //  enabled={false}
                deviceValue={deviceValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => decicedropdownEnabled(itemValue)}
              >
                {device.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="contained"
                style={styles.button}
                onPress={AddDevice}
              >
                Submit
              </Button>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => setIsDialogVisible(false)}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog
            style={{ width: '40%', marginLeft: '30%' }}
            visible={isremoveDialogVisible}
            onDismiss={() => setIsremoveDialogVisible(false)}
          >
            <Dialog.Title
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Remove Device Information
            </Dialog.Title>
            <Dialog.Content
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <Datetime
                dateFormat="MM-DD-YYYY"
                timeFormat={true}
                onChange={onChange}
                inputProps={inputProps}
                value={selecteddatevalue}
                disabled={true}
              />
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
              <Picker
                pileValue={pileValue}
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
              <Picker
                locationValue={locationValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => locationdropdownEnabled(itemValue)}
              >
                {location.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
              <Picker
                //  enabled={false}
                deviceValue={deviceValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => decicedropdownEnabled(itemValue)}
              >
                {replacedata.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="contained"
                style={styles.button}
                onPress={AddDevice}
              >
                Submit
              </Button>

              <Button
                mode="contained"
                style={styles.button}
                onPress={() => setIsremoveDialogVisible(false)}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog
            style={{ width: '40%', marginLeft: '30%' }}
            visible={isreplaceDialogVisible}
            onDismiss={() => setIsreplaceDialogVisible(false)}
          >
            <Dialog.Title
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Replace Device Information
            </Dialog.Title>
            <Dialog.Content
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
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
              <Picker
                pileValue={pileValue}
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
              <Picker
                locationValue={locationValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => locationdropdownEnabled(itemValue)}
              >
                {location.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
              <Picker
                deviceValue={deviceValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => decicedropdownEnabled(itemValue)}
              >
                {replacedata.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
              <Picker
                //  enabled={false}
                deviceValue={deviceValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => newDevice(itemValue)}
              >
                {device.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                mode="contained"
                style={styles.button}
                onPress={AddDevice}
              >
                Submit
              </Button>

              <Button
                mode="contained"
                style={styles.button}
                onPress={() => setIsreplaceDialogVisible(false)}
              >
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
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
export default Configuredevice
