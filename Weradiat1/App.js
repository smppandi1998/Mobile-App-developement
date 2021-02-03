import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  Otp,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  UserScreen,
  ClientScreen,Device
} from './src/screens'

const Stack = createStackNavigator()

export default class App extends React.Component{
  render(){
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
            
          }}
        >
          
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="ClientScreen" component={ClientScreen} />
          <Stack.Screen name="Device" component={Device} />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )}
}

