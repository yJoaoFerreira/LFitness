import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function OnlineConsulting({ isHighContrast }) {
  return (
    <View style={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.paragraph, isHighContrast && styles.paragraphHighContrast]}>
        Você gostaria de treinar sendo orientado e supervisionado por mim?
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
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
  },
  paragraphHighContrast: {
    color: '#ddd',
  },
});