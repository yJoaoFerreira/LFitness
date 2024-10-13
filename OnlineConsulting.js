import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Switch, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar ícone

export default function OnlineConsulting({ isHighContrast }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [dorArticulacao, setDorArticulacao] = useState(false);
  const [hipertenso, setHipertenso] = useState(false);
  const [restricao, setRestricao] = useState('');

  const whatsappNumber = '5511999999999';
  const message = `Olá, gostaria de mais informações!
  Peso: ${peso}
  Altura: ${altura}
  Sente dor nas articulações? ${dorArticulacao ? 'Sim' : 'Não'}
  Hipertenso? ${hipertenso ? 'Sim' : 'Não'}
  Restrição: ${restricao}`;

  const handleWhatsAppPress = () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp', err));
  };

  return (
    <View style={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.title, isHighContrast && styles.titleHighContrast]}>
        Consultoria Online
      </Text>

      {/* Formulário */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Peso (kg):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
          placeholderTextColor={isHighContrast ? '#999' : '#888'}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Altura (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Altura (cm)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
          placeholderTextColor={isHighContrast ? '#999' : '#888'}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, isHighContrast && styles.labelHighContrast]}>
          Sente dor nas articulações?
        </Text>
        <Switch value={dorArticulacao} onValueChange={setDorArticulacao} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, isHighContrast && styles.labelHighContrast]}>
          Hipertenso?
        </Text>
        <Switch value={hipertenso} onValueChange={setHipertenso} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Tem alguma restrição?</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Restrições"
          value={restricao}
          onChangeText={setRestricao}
          placeholderTextColor={isHighContrast ? '#999' : '#888'}
        />
      </View>

      {/* Botão do WhatsApp */}
      <TouchableOpacity style={styles.button} onPress={handleWhatsAppPress}>
        <Icon name="whatsapp" size={20} color="#fff" style={styles.icon} />
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
  inputContainer: {
    width: '100%',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
  },
  labelHighContrast: {
    color: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#34495e',
    width: '100%',
  },
  inputHighContrast: {
    borderColor: '#555',
    backgroundColor: '#333',
    color: '#ddd',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#34495e',
  },
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});