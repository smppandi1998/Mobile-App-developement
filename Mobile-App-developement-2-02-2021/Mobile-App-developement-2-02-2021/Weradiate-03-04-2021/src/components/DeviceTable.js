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

function UserTable() {
  const [data, setData] = useState([])
  const Api = localStorage.getItem('token')
  const [clientList, setclientList] = useState([])
  const clients = []

  const fetchClientlist = () => {
    fetch('https://staging-analytics.weradiate.com/apidbm/client', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        alert('muthu')
        clients.push('Clients')

        for (var i = 0; i < responseJson.length; i++) {
          const json = responseJson[i].cname

          clients.push(json)
        }
        alert(JSON.stringify(clients))
        setclientList(clients)
        localStorage.setItem('clients', clients)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchInventory = () => {
    fetch('https://staging-analytics.weradiate.com/apidbm/listadev', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson[0]))
        setData(responseJson)
      })
  }
  const tableData = ({ itemValue }) => {
    //alert(JSON.stringify(itemValue));
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
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson[0]))
        setData(responseJson)
      })
  }

  useEffect(() => {
    fetchInventory()
  }, [])
  useEffect(() => {
    fetchClientlist()
  }, [])

  const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null })
  const [cname, setcname] = useState(null)
  const [password, setpassword] = useState('')
  const [email, setemail] = useState(null)
  const [currentcname, setcurrentcname] = useState(null)
  const [currentEmail, setcurrentEmail] = useState(null)
  const [selectedValue, setselectedValue] = useState('')

  const onEdit = ({ index, id, currentCname, currentEmail, currentUser }) => {
    setpassword('')
    setInEditMode({
      status: true,
      rowKey: index,
    })
    setcurrentcname(currentCname)
    setemail(currentEmail)
  }

  const Deleteclient = ({ userEmail, userName }) => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/user/' +
      '' +
      userName +
      ''
    const DELETEMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({ email: userEmail }),
    }

    fetch(url, DELETEMethod)
      .then(response => response.json())
      .then(responseJson => {
        alert(JSON.stringify(responseJson))
        onCancel()
        fetchInventory()
      })
      .catch(error => {
        console.error(error)
      })
  }

  const updateInventory = ({ newemail, userName, userEmail, userpassword }) => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/user/' +
      '' +
      userName +
      ''
    const putMethod = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        email: userEmail,
        email_new: newemail,
        pwd: userpassword,
      }),
    }

    fetch(url, putMethod)
      .then(response => response.json())
      .then(responseJson => {
        alert(JSON.stringify(responseJson))
        onCancel()
        fetchInventory()
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onSave = ({ newemail, userName, userEmail, userpassword }) => {
    updateInventory({ newemail, userName, userEmail, userpassword })
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setcname(null)
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{item.client}</td>

              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={email}
                    onChange={event => setemail(event.target.value)}
                  />
                ) : (
                  item.hwid
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={password}
                    onChange={event => setpassword(event.target.value)}
                  />
                ) : (
                  item.deviceid
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={password}
                    onChange={event => setpassword(event.target.value)}
                  />
                ) : (
                  item.devID
                )}
              </td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={password}
                    onChange={event => setpassword(event.target.value)}
                  />
                ) : (
                  item.devEUI
                )}
              </td>
              <td style={styles.td}>{item.idate}</td>
              <td style={styles.td}>{item.rdate}</td>

              {/* <td style={styles.td}>{
            inEditMode.status && inEditMode.rowKey ===index ? (
            <React.Fragment>

              <button className={"btn-success"}
              onClick={() => onSave({ newemail:email,userName:item.user,
              userEmail:item.email,userpassword:password})}>
              Save</button>

              <button className={"btn-secondary"} style={{marginLeft: 8}}
              onClick={() => onCancel()}>Cancel</button>

              <button className={"btn-secondary"} style={{marginLeft: 8}}
              onClick={()=>Deleteclient({userEmail:item.email,userName:item.user})}>
              Delete</button>

            </React.Fragment>
            ) : (
              <button className={"btn-primary"}
              onClick={() => onEdit({index, id: item.cid,currentCname: item.cname,currentEmail:item.email,currentUser:item.user})}
              >Edit</button>

            )
          }</td> */}
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
