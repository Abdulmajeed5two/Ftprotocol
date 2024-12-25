import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { NetworkInfo } from 'react-native-network-info';

const FTPServerScreen = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [port, setPort] = useState('2121');
  const [ftpRunning, setFtpRunning] = useState(false);

  const startFTPServer = () => {
    if (!port || isNaN(port)) {
      Alert.alert('Invalid Port', 'Please enter a valid port number.');
      return;
    }

    setFtpRunning(true);
    Alert.alert('FTP Server Started', `Access files via ftp://${ipAddress}:${port}`);
  };

  const stopFTPServer = () => {
    setFtpRunning(false);
    Alert.alert('FTP Server Stopped', 'The server is now offline.');
  };

  const requestPermissions = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.MEDIA_LIBRARY;
    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      Alert.alert('Permissions Granted', 'You can now share files via FTP.');
    } else {
      Alert.alert('Permissions Denied', 'Cannot access files without permissions.');
    }
  };

  const fetchIpAddress = async () => {
    const ip = await NetworkInfo.getIPAddress();
    setIpAddress(ip);
  };

  React.useEffect(() => {
    requestPermissions();
    fetchIpAddress();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FTP Server</Text>
      <Text style={styles.info}>
        {ftpRunning
          ? `FTP Server is running at ftp://${ipAddress}:${port}`
          : 'Server is offline.'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Port (e.g., 2121)"
        value={port}
        onChangeText={setPort}
        keyboardType="numeric"
      />
      <Button
        title={ftpRunning ? 'Stop Server' : 'Start Server'}
        onPress={ftpRunning ? stopFTPServer : startFTPServer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default FTPServerScreen;
