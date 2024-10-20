// Loading.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 200,
    height: 200,
  },
});