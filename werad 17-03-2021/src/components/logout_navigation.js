Logutmodule = ({ selectedValue }) => {
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

const NavigatClientScreen = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'ClientScreen' }],
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
    routes: [{ name: 'Device' }],
  })
}
