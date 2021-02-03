import React, { useState,useEffect} from 'react'
import {View,StyleSheet,Text,Alert,Picker} from 'react-native'
import TextInput from '../components/TextInput'
import { TouchableOpacity } from 'react-native-gesture-handler';
import UserTable from '../components/UserTable';
import Button from '../components/Button'
import {Dialog,Portal} from 'react-native-paper';






 const Device = ({ navigation }) => {
   let [email, setEmail] = useState({ value: '', error: '' })
   let [password, setPassword] = useState({ value: '', error: '' })
   let [username, setUsername] = useState({ value: '', error: '' })
  // const [inputVal, setInputVal] = useState('test');
   const [isDialogVisible, setIsDialogVisible] = useState(false);
   const [ClientVisible, setIsclientVisible] = React.useState(false);
   const [data, setData] = useState([]); 
   const [selectedValue, setselectedValue] = useState(""); 
  
   const clients=[];
   const Api=  localStorage.getItem('token');
   const NavigatClientScreen =() =>
   {
      
      navigation.reset({
         index: 0,
         routes: [{ name: 'ClientScreen' }],
          })
   }
   const NavigatUserScreen =() =>
   {
      
      navigation.reset({
         index: 0,
         routes: [{ name: 'Dashboard' }],
          })
   }
   const NavigatDeviceScreen =() =>
   {
      
      navigation.reset({
         index: 0,
         routes: [{ name: 'Device' }],
          })
   }
   console.log(Api)
   const fetchData =() =>{
     
          
         
      fetch("https://staging-analytics.weradiate.com/apidbm/client", {
         method: 'GET',
         headers: {
           "Accept": "application/json",
           "Authorization":  "Bearer "+Api.replace(/['"]+/g, '')+"",
      }})
         .then((response) => response.json())
         .then((responseJson) => {
            clients.push("Select the Clients");
          
            for (var i=0;i<responseJson.length;i++)
            {
             const json=responseJson[i].cname;
             
             clients.push(json);
          
            
            
            }
            
          setData(clients)
         localStorage.setItem('clients',clients); 
           
         })
         .catch((error) => {
            console.error(error);
         });
         
      
      }    
      useEffect(() => {
        fetchData();
    }, []);
 
  

 return(
 
<View>
 <View style={styles.container}>
 

<TouchableOpacity  ><Text  onPress={() => setIsclientVisible(true)} onPress={NavigatUserScreen} style={styles.touchopacity}>User</Text></TouchableOpacity>
<TouchableOpacity ><Text  onDismiss={() => setIsclientVisible(false)} visible={ClientVisible} onPress={NavigatClientScreen}style={styles.touchopacity}>Client</Text></TouchableOpacity>
<TouchableOpacity><Text style={styles.touchopacity}>Configuration</Text></TouchableOpacity>
<TouchableOpacity><Text style={styles.touchopacity} onPress={NavigatDeviceScreen}>Device</Text></TouchableOpacity>

</View>
<Button mode="contained" style={styles.button} onPress={() => setIsDialogVisible(true)}>Add Device</Button>
<Button mode="contained" style={styles.button} onPress={() => setIsDialogVisible(true)}>Remove Device</Button>
<Button mode="contained" style={styles.button} onPress={() => setIsDialogVisible(true)}>Replace Device</Button>
<Button mode="contained" style={styles.button} onPress={() => setIsDialogVisible(true)}>Add Device</Button>
         <Portal>
          <Dialog style={{width:'40%',marginLeft: 'auto',
      marginRight: 'auto'}}
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title style={{marginLeft: 'auto',
      marginRight: 'auto'}}>Add User</Dialog.Title>
            <Dialog.Content style={{marginLeft: 'auto',
      marginRight: 'auto'}}>
            <Picker
                selectedValue={selectedValue}
                style={{width: '100%',
       
        marginVertical: 12,}}
                onValueChange={(itemValue) => setselectedValue(itemValue)} >
                {
                 data.map((value, key)=>
                 
                  <Picker.Item label={value} value={value} key={key} />
                )}
              </Picker>
            <TextInput
        label="User name"
        returnKeyType="next"
        value={username.value}
       
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="Text"
        textContentType="Text"
        keyboardType="Text"
      
      />
      <TextInput 
        label="Password"
        
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
       <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
      
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />
            </Dialog.Content>
            <Dialog.Actions  >
            <Button mode="contained" style={{width:'20%' ,
         marginVertical: 10,
         paddingVertical: 2,marginLeft: 'auto',
         marginRight: 'auto' }}onPress={() => setIsDialogVisible(false)}>
        Submit
      </Button>   
      <Button mode="contained" style={{width:'20%' ,
         marginVertical: 10,
         paddingVertical: 2,marginLeft: 'auto',
         marginRight: 'auto'}} onPress={() => setIsDialogVisible(false)}>
        Cancel
      </Button>   
            </Dialog.Actions>
          </Dialog>
          </Portal>
</View>

 
  
)
 }
const styles=StyleSheet.create(
   {
      container:{
         width: '100%',
         height: 45,
         backgroundColor: '#606070',
         flexDirection:'row',

      },
      button:{
         width:'15%' ,
         marginVertical: 10,
         paddingVertical: 2,marginLeft: 'auto',
         marginRight: 'auto'
      },
      row:{
          flexDirection:'row'
      },
      dilog:{width:'40%',marginLeft: 'auto',
      marginRight: 'auto'},
      dilog_content:{marginLeft: 'auto',
      marginRight: 'auto'},
      touchopacity:{
         color:'white',fontSize:20,padding: 10
      }
      
   }
)
 

export default Device
