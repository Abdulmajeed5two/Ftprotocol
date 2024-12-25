import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FTPServerScreen from './src/Ftp'

const App = () => {
  return (
    <View style={styles.container}>
      <FTPServerScreen />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
})