import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';

const Drawer = createDrawerNavigator();

export default function Header({ navigation }) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Função para alternar o tema de contraste
  const toggleTheme = () => {
    setIsHighContrast(!isHighContrast);
  };

  return (
    <View style={[styles.header, isHighContrast ? styles.highContrast : null]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>

      <Image source={require('./assets/logo.png')} style={styles.logo} />

      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons name="contrast" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
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
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  highContrast: {
    backgroundColor: '#000',
    borderBottomColor: '#fff',
  },
  logo: {
    width: 50,
    height: 50,
  },
});
