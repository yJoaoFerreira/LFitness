import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Importa ícones
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home'; // Certifique-se de que o caminho está correto

const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      {/* Adicione outras telas conforme necessário */}
    </Drawer.Navigator>
  );
}

export default function Header({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={32} color="black" />
        </TouchableOpacity>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.themeText}>Contraste</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Ocupa toda a largura da tela
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40, // Este valor pode ser ajustado conforme necessário
    height: 80,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 50,
    height: 50,
  },
  themeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});