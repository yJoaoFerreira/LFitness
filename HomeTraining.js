import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function HomeTraining({ isHighContrast }) {
  return (
    <View style={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.heading, isHighContrast && styles.headingHighContrast]}>
        Treino em Casa
      </Text>
      <Text style={[styles.paragraph, isHighContrast && styles.paragraphHighContrast]}>
        Não está com tempo para ir à academia? Podemos treinar em casa!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  highContrastBackground: {
    backgroundColor: '#000',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 10,
  },
  headingHighContrast: {
    color: '#fff',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
  },
  paragraphHighContrast: {
    color: '#ddd',
  },
});