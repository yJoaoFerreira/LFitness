import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
        <Ionicons name="settings-outline" size={32} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 50,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 50,
    height: 50,
  },
});