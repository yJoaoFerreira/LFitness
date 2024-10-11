import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function PhysicalAssessment({ isHighContrast }) {
  return (
    <View style={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.paragraph, isHighContrast && styles.paragraphHighContrast]}>
        Gostaria de saber suas medidas corporais?
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
