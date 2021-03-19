// Module: logouttable
//
// Function:
//    Display the table in user management screen
//
// Version:
//    V2.03  Mon Feb 08 2021 10:15:00 muthup   Edit level 3
//
// Copyright notice:
//   This file copyright (C) 2020-2021 by
//
//       MCCI Corporation
//       3520 Krums Corners Road
//        Ithaca, NY  14850
//
//   An unpublished work.  All rights reserved.
//
//   This file is proprietary information, and may not be disclosed or
//   copied without the prior permission of MCCI Corporation
//
// Author:
//   Muthupandi Pandiyaraj, MCCI Corporation March 2021
//
// Revision History:
//   2.01  Tue Mar 03 2020 3:57:00 muthup
//   Module created.

import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, StyleSheet, View, CheckBox, Picker } from 'react-native'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as moment from 'moment'
function UserTable() {
  const [data, setData] = useState([])
  const [Api, setApi] = useState('')

  const getApitoken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token !== null) {
        setApi(token)
        fetchInventory(token)
        fetchClientlist(token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getApitoken()
  }, [])
  const [clientList, setclientList] = useState([])
  const clients = []

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
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }

          clients.push('Clients')

          for (var i = 0; i < responseJson.length; i++) {
            const json = responseJson[i].cname

            clients.push(json)
          }

          setclientList(clients)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchInventory = token => {
    fetch('https://staging-analytics.weradiate.com/apidbm/listadev', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token.replace(/['"]+/g, '') + '',
      },
    }).then(response => {
      const statusCode = response.status

      response.json().then(responseJson => {
        if (statusCode == 403) {
          alert('inavalid token/token expired')
        } else if (responseJson['message'] != null) {
          alert(JSON.stringify(responseJson['message']))
        }
        console.log(JSON.stringify(responseJson[0]))
        setData(responseJson)
      })
    })
  }
  const tableData = ({ itemValue }) => {
    setselectedValue(itemValue)
    var url =
      'https://staging-analytics.weradiate.com/apidbm/listadev/' +
      '' +
      itemValue +
      ''
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
    }).then(response => {
      const statusCode = response.status

      response.json().then(responseJson => {
        if (statusCode == 403) {
          alert('inavalid token/token expired')
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        }
        if (responseJson['message'] != null) {
          alert(JSON.stringify(responseJson['message']))
        }
        console.log(JSON.stringify(responseJson[0]))
        setData(responseJson)
      })
    })
  }

  const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null })
  const [client, setclient] = useState(null)
  const [hwid, sethwid] = useState(null)
  const [deviceid, setdeviceid] = useState(null)
  const [devID, setdevID] = useState(null)
  const [devEUI, setdevEUI] = useState(null)
  const [idate, setidate] = useState(null)
  const [currenthwid, setcurrenthwid] = useState(null)
  const [password, setpassword] = useState('')
  const [email, setemail] = useState(null)
  // const [currentcname, setcurrentcname] = useState(null)
  const [currentEmail, setcurrentEmail] = useState(null)
  const [selectedValue, setselectedValue] = useState('')
  const date = moment(idate).format('MM/DD/YYYY')
  const time = moment(idate).format('HH:mm:ss')
  const datestringvalue = date + ',' + time

  const onEdit = ({ index, client, hwid, deviceid, devID, devEUI, idate }) => {
    checkeditable(index, client, hwid)
    setclient(client)
    sethwid(hwid)
    setdeviceid(deviceid)
    setdevID(devID)
    setdevEUI(devEUI)
    setidate(idate)
    // setcurrenthwid(hwid);
  }

  const Deleteclient = ({ client, hwid, idate }) => {
    const date = moment(idate).format('MM/DD/YYYY')
    const time = moment(idate).format('HH:mm:ss')
    const datestringvalue = date + ',' + time
    var url =
      'https://staging-analytics.weradiate.com/apidbm/mdevice/' +
      '' +
      client +
      ''
    const DELETEMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({ hwid: hwid, datetime: datestringvalue }),
    }

    fetch(url, DELETEMethod).then(response => {
      const statusCode = response.status

      response
        .json()
        .then(responseJson => {
          if (statusCode == 403) {
            alert('inavalid token/token expired')
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          } else if (responseJson['message'] != null) {
            alert(JSON.stringify(responseJson['message']))
          }
          onCancel()
          getApitoken()
        })
        .catch(error => {
          console.error(error)
        })
    })
  }
  const checkeditable = (index, client, hwid) => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/listmdev/' +
      '' +
      client +
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
          let hwids = responseJson['hwids']
          let result1 = false
          for (let i = 0; i < hwids.length; i++) {
            const activehwid = hwids[i]

            if (activehwid['hwid'] == hwid) {
              result1 = true
            }
          }

          if (result1) {
            setInEditMode({
              status: true,
              rowKey: index,
            })
          } else {
            alert('This device is already assigned to a location by the Client')
            setInEditMode({ status: false, rowKey: index })
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
  const updateInventory = ({ client, currenthwid }) => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/mdevice/' +
      '' +
      client +
      ''
    const putMethod = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        hwid: currenthwid,
        nhwid: hwid,
        deviceid: deviceid,
        devID: devID,
        devEUI: devEUI,
        datetime: datestringvalue,
      }),
    }

    fetch(url, putMethod)
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
            alert(JSON.stringify(responseJson))
          }
          onCancel()
          getApitoken()
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onSave = ({ client, currenthwid }) => {
    updateInventory({ client, currenthwid })
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setclient(null)
  }

  return (
    <View>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>
              <Picker
                selectedValue={selectedValue}
                style={{
                  width: '100%',

                  marginVertical: 12,
                }}
                onValueChange={itemValue => tableData({ itemValue })}
              >
                {clientList.map((value, key) => (
                  <Picker.Item label={value} value={value} key={key} />
                ))}
              </Picker>
            </th>
            <th style={styles.header}>Hardware ID</th>

            <th style={styles.header}>Device ID</th>
            <th style={styles.header}>Dev ID</th>
            <th style={styles.header}>Dev EUI</th>
            <th style={styles.header}>Install Date</th>
            <th style={styles.header}>Remove Date</th>
            <th style={styles.header}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={client}
                    onChange={event => setclient(event.target.value)}
                  />
                ) : (
                  item.client
                )}
              </td>

              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={hwid}
                    onChange={event => sethwid(event.target.value)}
                  />
                ) : (
                  item.hwid
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={deviceid}
                    onChange={event => setdeviceid(event.target.value)}
                  />
                ) : (
                  item.deviceid
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={devID}
                    onChange={event => setdevID(event.target.value)}
                  />
                ) : (
                  item.devID
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={devEUI}
                    onChange={event => setdevEUI(event.target.value)}
                  />
                ) : (
                  item.devEUI
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={idate}
                    onChange={event => setidate(event.target.value)}
                  />
                ) : (
                  item.idate
                )}
              </td>

              <td style={styles.td}>{item.rdate}</td>

              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <React.Fragment>
                    <button
                      className={'btn-success'}
                      onClick={() =>
                        onSave({
                          index,
                          client: item.client,
                          currenthwid: item.hwid,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={'btn-secondary'}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>

                    <button
                      className={'btn-secondary'}
                      style={{ marginLeft: 8 }}
                      onClick={() =>
                        Deleteclient({
                          client: item.client,
                          hwid: item.hwid,
                          idate: item.idate,
                        })
                      }
                    >
                      Delete
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={'btn-primary'}
                    onClick={() =>
                      onEdit({
                        index,
                        client: item.client,
                        hwid: item.hwid,
                        deviceid: item.deviceid,
                        devID: item.devID,
                        devEUI: item.devEUI,
                        idate: item.idate,
                      })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </View>
  )
}
const styles = {
  table: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderCollapse: 'collapse',
    width: '50%',
    height: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  td: {
    border: '3px solid #ddd',
    padding: '2px',
    textAlign: 'center',
    fontSize: '16px',
  },
  th: {
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '1px solid #ddd',
    padding: '8px',
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '1px solid #ddd',
    padding: '8px',
  },
}

export default UserTable
