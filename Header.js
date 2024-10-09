import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'; // Sua tela de Home

const Drawer = createDrawerNavigator();

export default function Header({ navigation }) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Função para alternar o tema de contraste
  const toggleTheme = () => {
    setIsHighContrast(!isHighContrast);
  };

  return (
    <View style={[styles.header, isHighContrast ? styles.highContrast : null]}>
      {/* Menu de Navegação */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Logo Centralizada */}
      <Image source={require('./assets/logo.png')} style={styles.logo} />

      {/* Botão de Alto-Contraste */}
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons name="contrast" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>
    </View>
  );
}

// Definindo o DrawerNavigator
export function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        {/* Outras telas podem ser adicionadas aqui */}
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
    paddingTop: 40, // Espaçamento no topo
    height: 80, // Altura do cabeçalho
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  highContrast: {
    backgroundColor: '#000', // Fundo preto para alto contraste
    borderBottomColor: '#fff', // Borda branca para alto contraste
  },
  logo: {
    width: 50,
    height: 50, // Define o tamanho da logo
  },
});
