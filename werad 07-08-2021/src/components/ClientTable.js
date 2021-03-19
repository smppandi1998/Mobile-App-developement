// Module: ClientTable
//
// Function:
//    Display the table in client screen
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
//   2.01  Tue Mar 02 2020 3:57:00 muthup
//   Module created.

import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, StyleSheet, View, CheckBox } from 'react-native'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
function UserTable() {
  const [data, setData] = useState([])
  const [Api, setApi] = useState('')
  const getApitoken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token !== null) {
        setApi(token)
        fetchInventory(token)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getApitoken()
  }, [])
  const fetchInventory = token => {
    fetch('https://staging-analytics.weradiate.com/apidbm/client', {
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
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          })
        } else if (responseJson['message'] != null) {
          alert(JSON.stringify(responseJson['message']))
        }
        setData(responseJson)
      })
    })
  }

  const [inEditMode, setInEditMode] = useState({ status: false, rowKey: null })
  const [cname, setcname] = useState(null)
  const [currentcname, setcurrentcname] = useState(null)
  const [Delete, setDelete] = useState(true)
  const onEdit = ({ index, id, currentCname }) => {
    setInEditMode({ status: true, rowKey: index })
    setcurrentcname(currentCname)
    setcname(currentCname)
  }

  const Deleteclient = ({ cname }) => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/client/' + '' + cname + ''

    const DELETEMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
    }

    fetch(url, DELETEMethod)
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

          onCancel()

          getApitoken()
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const updateInventory = ({ id, newcname }) => {
    var url =
      'https://staging-analytics.weradiate.com/apidbm/client/' +
      '' +
      currentcname +
      ''
    const putMethod = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + Api.replace(/['"]+/g, '') + '',
      },
      body: JSON.stringify({
        name: cname,
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
            alert(JSON.stringify(responseJson['message']))
          }

          onCancel()

          getApitoken()
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onSave = ({ id, newcname }) => {
    updateInventory({ id, newcname })
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
            <th style={styles.header}>Id</th>
            <th style={styles.header}>Client Name</th>
            <th style={styles.header}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{item.cid}</td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={cname}
                    onChange={event => setcname(event.target.value)}
                  />
                ) : (
                  item.cname
                )}
              </td>

              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <React.Fragment>
                    <button
                      className={'btn-success'}
                      onClick={() => onSave({ id: item.cid, newcname: cname })}
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
                      onClick={() => Deleteclient({ cname: item.cname })}
                    >
                      Delete
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={'btn-primary'}
                    onClick={() =>
                      onEdit({ index, id: item.cid, currentCname: item.cname })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {/* <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
      />  */}
      </table>
    </View>
  )
}
const styles = {
  table: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    borderCollapse: 'collapse',
    width: '30%',
    height: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  td: {
    border: '1px solid #ddd',
    padding: '2px',
    textAlign: 'center',
  },
  th: {
    textAlign: 'center',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: '3px solid #ddd',
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
