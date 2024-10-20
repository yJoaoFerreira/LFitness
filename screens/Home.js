import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation, route }) => {
  const { funcLogar, isHighContrast } = route.params;

  const deslogar = () => {
    funcLogar(false);
    navigation.replace("Login");
  };

  // useFocusEffect para garantir que a tela atualize corretamente quando voltar ao foco
  useFocusEffect(
    React.useCallback(() => {
      navigation.setParams({ isHighContrast });
    }, [isHighContrast])
  );

  const styles = createStyles(isHighContrast);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo à Home!</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Aluno")}>
          <Text style={styles.buttonText}>Ir para Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={deslogar}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (isHighContrast) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isHighContrast ? '#000000' : '#f0f0f0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: isHighContrast ? '#FFFFFF' : '#333',
  },
  button: {
    backgroundColor: isHighContrast ? '#00FF00' : '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: isHighContrast ? '#000' : '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: isHighContrast ? '#FF4C4C' : '#FF4C4C',
  },
});

export default Home;