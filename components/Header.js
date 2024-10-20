import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, onToggleTheme, isHighContrast }) {
  return (
    <View style={[styles.header, isHighContrast ? styles.highContrast : styles.default]}>
      {/* Botão do Menu */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Botão de Configurações */}
      <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
        <Ionicons name="settings-outline" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Logo Central */}
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      {/* Botão do Perfil do Aluno */}
      <TouchableOpacity onPress={() => navigation.navigate('Aluno')}>
        <Ionicons name="person-outline" size={32} color={isHighContrast ? '#fff' : '#000'} />
      </TouchableOpacity>

      {/* Botão de Alternar o Tema */}
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
    paddingHorizontal: 25,
    paddingTop: 50,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  highContrast: {
    backgroundColor: '#000', // Fundo preto para alto contraste
    borderBottomColor: '#fff', // Borda branca no alto contraste
  },
  default: {
    backgroundColor: '#f8f8f8', // Fundo padrão claro
  },
  logo: {
    width: 50,
    height: 50,
  },
});