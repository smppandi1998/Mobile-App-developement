// Module: UserTable
//
// Function:
//    Display the table in user screen
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
//   2.01  Tue Mar 01 2020 3:57:00 muthup
//   Module created.

import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, StyleSheet, View, CheckBox } from 'react-native'
import Button from '../components/Button'
import Pagination from './Pagination'
import AsyncStorage from '@react-native-async-storage/async-storage'
function UserTable() {
  const [data, setData] = useState([])

  const [Api, setApi] = useState()
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

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(2)

  const fetchInventory = token => {
    var url = 'https://staging-analytics.weradiate.com/apidbm/listuser'
    const getMethod = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token.replace(/['"]+/g, '') + '',
      },
    }

    fetch(url, getMethod).then(response => {
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

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber)

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  })

  const [cname, setcname] = useState(null)
  const [user, setuser] = useState(null)
  const [email, setemail] = useState(null)
  const [currentcname, setcurrentcname] = useState(null)
  const [currentEmail, setcurrentEmail] = useState(null)
  //const [Delete, setDelete] = useState(true);

  const onEdit = ({ index, id, currentCname, currentEmail, currentUser }) => {
    setInEditMode({
      status: true,
      rowKey: index,
    })
    setcurrentcname(currentCname)
    setcname(currentCname)
    setuser(currentUser)
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
      body: JSON.stringify({
        email: userEmail,
      }),
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

  const updateInventory = ({ newemail, userName, userEmail }) => {
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

  const onSave = ({ newemail, userName, userEmail }) => {
    updateInventory({ newemail, userName, userEmail })
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
            <th style={styles.header}>Client Name</th>
            <th style={styles.header}>User</th>
            <th style={styles.header}>Email</th>
            <th style={styles.header}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={styles.td}>{item.cname}</td>
              <td style={styles.td}>{item.user}</td>
              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <input
                    value={email}
                    onChange={event => setemail(event.target.value)}
                  />
                ) : (
                  item.email
                )}
              </td>

              <td style={styles.td}>
                {inEditMode.status && inEditMode.rowKey === index ? (
                  <React.Fragment>
                    <button
                      className={'btn-success'}
                      onClick={() =>
                        onSave({
                          newemail: email,
                          userName: item.user,
                          userEmail: item.email,
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
                          userEmail: item.email,
                          userName: item.user,
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
                        id: item.cid,
                        currentCname: item.cname,
                        currentEmail: item.email,
                        currentUser: item.user,
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
    width: '50%',
    height: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  td: {
    border: '3px solid #ddd',
    padding: '2px',
    textAlign: 'center',
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
