import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Student = () => {
  const navigation = useNavigation();
  const whatsappNumber = '5511999999999';
  const message = 'Olá, gostaria de mais informações!';

  const handleWhatsAppPress = () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp', err));
  };

  const PhysicalAssessment = () => {
    navigation.navigate('Avaliação Física');
  };

  const handleExternalLinkPress = () => {
    const url = 'https://www.example.com/exercicio';
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o link', err));
  };

  return (
    <View style={styles.container}>
       <View style={styles.iconback}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
           <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
       </View>
      <Text style={styles.title}>Área do Aluno</Text>

      <TouchableOpacity style={styles.button} onPress={handleExternalLinkPress}>
        <Text style={styles.buttonText}>Ir para Exercício</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={PhysicalAssessment}>
        <Text style={styles.buttonText}>Ir para Avaliação Física</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppPress}>
        <Icon name="whatsapp" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.whatsappButtonText}>Enviar Mensagem no WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
   iconback:{
   position:'absolute',
   top: 10,
   left:12,
  
  },
});

export default Student;