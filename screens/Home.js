import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Chamada Fetch API do projeto "Me Motive!"
// Créditos: https://github.com/moraislucas/MeMotive
import phrases from '../services/phrases.json';

const Home = ({ navigation, route }) => {
  const { funcLogar } = route.params;
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    setRandomQuote(phrases[randomIndex]);
  }, []);

  const deslogar = () => {
    funcLogar(false);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo à Home!</Text>

        {randomQuote && (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>❝ {randomQuote.quote} ❞</Text>
            <Text style={styles.quoteAuthor}>- {randomQuote.author}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Aluno")}>
          <Text style={styles.buttonText}>Área de Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={deslogar}>
          <Text style={styles.buttonText}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
  },
  quoteContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  quoteText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#333333',
    textAlign: 'center',
  },
  quoteAuthor: {
    fontSize: 15,
    color: '#777777',
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#A0BAB7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#7A918E',
  },
});

export default Home;