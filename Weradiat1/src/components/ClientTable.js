import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text,StyleSheet,View} from 'react-native'
import Button from '../components/Button'
function ClientTable() {
    const [data, setData] = useState([]);
    const Api=  localStorage.getItem('token');
   
   
    const fetchInventory = () => {
        fetch("https://staging-analytics.weradiate.com/apidbm/client", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization":  "Bearer "+Api.replace(/['"]+/g, '')+"",
   }})
   .then((response) => response.json())
   .then((responseJson) => {
      
       setData(responseJson);
    })
}
    
    useEffect(() => {
        fetchInventory();

    }, []);
    const edit =(index) =>
{
    alert(index);
}

    return (
        <View >
            
            <table style={styles.table}>
                <thead >
                <tr>
                    <th
                    style={styles.header}>Id</th>
                    <th style={styles.header}>Name</th>
                  
                    <th style={styles.header}>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr >
                                <td style={styles.td}>{item.cid}</td>
                                <td style={styles.td}>{item.cname}</td>
                               
                                <td style={styles.td}>
                                    <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity ><Text style={{color:'blue',fontSize:20,padding: 10}} onPress={() =>edit(item.cid)}>Edit</Text></TouchableOpacity>
<TouchableOpacity><Text style={{color:'blue',fontSize:20,padding: 10}}  onPress={() =>Delete(item.cid)}>Delete</Text></TouchableOpacity>
                                </View> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </View>
    );
}
const styles=
    {
       table:{
        fontFamily: 'Arial, Helvetica, sans-serif',
        borderCollapse: 'collapse',
        width: '30%',
        height: '10%',
        marginLeft: 'auto',
        marginRight: 'auto'
       },
       td:{
        border: '1px solid #ddd',
        padding: '2px',
       },
       th:{
        
        textAlign: 'center',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: '1px solid #ddd',
        padding: '8px',
       },
       header:{
        
        textAlign: 'center',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: '1px solid #ddd',
        padding: '8px',
       }
       
    };

export default ClientTable;