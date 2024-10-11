import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, onToggleTheme, isHighContrast }) {
  return (
    <View style={[styles.header, isHighContrast ? styles.highContrast : styles.default]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>

      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <TouchableOpacity onPress={onToggleTheme}>
        <Ionicons name="contrast" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  highContrast: {
    backgroundColor: '#000',
    borderBottomColor: '#fff',
  },
  default: {
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 50,
    height: 50,
  },
});