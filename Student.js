import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Student({ isHighContrast }) {
  const navigation = useNavigation();
  const whatsappNumber = '5511999999999';
  const message = 'Olá, gostaria de mais informações!';

  const handleWhatsAppPress = () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp', err));
  };

  const goToPhysicalAssessment = () => {
    navigation.navigate('Avaliação Física');
  };

  return (
    <View style={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.title, isHighContrast && styles.titleHighContrast]}>
        Alunos
      </Text>

      <TouchableOpacity style={styles.button} onPress={goToPhysicalAssessment}>
        <Text style={styles.buttonText}>Ir para Avaliação Física</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleWhatsAppPress}>
        <Text style={styles.buttonText}>Enviar Mensagem no WhatsApp</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#34495e',
  },
  titleHighContrast: {
    color: '#ddd',
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#25D366',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});