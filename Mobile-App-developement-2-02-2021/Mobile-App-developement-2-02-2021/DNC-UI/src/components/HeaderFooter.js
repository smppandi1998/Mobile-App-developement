import React from 'react'
import { Text } from 'react-native-paper'
import { View } from 'react-native'
class HeaderFooter extends React.Component {
  render() {
    return (
      <View
        style={{
          overflow: 'hidden',
          backgroundColor: '#f1f1f1',
          paddingHorizontal: '2%',
          paddingVertical: '2%',
        }}
      >
        <Text style={{ marginLeft: 850, fontSize: 40, color: '#800080' }}>
          MCCI-DNC
        </Text>
      </View>
    )
  }
}
export default HeaderFooter
