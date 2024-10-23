import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Switch, Linking, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';

export default function Training({ isHighContrast }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [dorArticulacao, setDorArticulacao] = useState(false);
  const [tipoDor, setTipoDor] = useState('');
  const [hipertenso, setHipertenso] = useState(false);
  const [restricao, setRestricao] = useState('');
  const [treinoCasa, setTreinoCasa] = useState(false);
  const [treinoAcademia, setTreinoAcademia] = useState(false);

  const whatsappNumber = '5521970952662'; // Número do Fernando
  const message = `Olá, gostaria de mais informações!
  Peso: ${peso}
  Altura: ${altura}
  Sente dor nas articulações? ${dorArticulacao ? 'Sim' : 'Não'}
  ${dorArticulacao ? `Tipo de dor: ${tipoDor}` : ''}
  Hipertenso? ${hipertenso ? 'Sim' : 'Não'}
  Restrição: ${restricao}
  Preferência de treino: ${treinoCasa ? 'Casa' : treinoAcademia ? 'Academia' : 'Não especificado'}`;

  const handleWhatsAppPress = () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp', err));
  };

  const data = [
    {
      key: 'peso',
      label: 'Peso (kg):',
      placeholder: 'Peso (kg)',
      value: peso,
      onChangeText: setPeso,
      type: 'input',
    },
    {
      key: 'altura',
      label: 'Altura (cm):',
      placeholder: 'Altura (cm)',
      value: altura,
      onChangeText: setAltura,
      type: 'input',
    },
    {
      key: 'dorArticulacao',
      label: 'Sente dor nas articulações?',
      value: dorArticulacao,
      onValueChange: setDorArticulacao,
      type: 'switch',
    },
    {
      key: 'hipertenso',
      label: 'Hipertenso?',
      value: hipertenso,
      onValueChange: setHipertenso,
      type: 'switch',
    },
    {
      key: 'restricao',
      label: 'Tem alguma restrição?',
      placeholder: 'Restrições',
      value: restricao,
      onChangeText: setRestricao,
      type: 'input',
    },
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'input') {
      return (
        <View style={styles.inputContainer}>
          <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>{item.label}</Text>
          <TextInput
            style={[styles.input, isHighContrast && styles.inputHighContrast]}
            placeholder={item.placeholder}
            keyboardType="numeric"
            value={item.value}
            onChangeText={item.onChangeText}
            placeholderTextColor={isHighContrast ? '#999' : '#888'}
          />
        </View>
      );
    } else if (item.type === 'switch') {
      return (
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, isHighContrast && styles.labelHighContrast]}>
            {item.label}
          </Text>
          <Switch value={item.value} onValueChange={item.onValueChange} />
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.title, isHighContrast && styles.titleHighContrast]}>
          Consultoria Online
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />

        {dorArticulacao && (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>
              Qual dor você sente?
            </Text>
            <TextInput
              style={[styles.input, isHighContrast && styles.inputHighContrast]}
              placeholder="Descreva a dor"
              value={tipoDor}
              onChangeText={setTipoDor}
              placeholderTextColor={isHighContrast ? '#999' : '#888'}
            />
          </View>
        )}

        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Treino em Casa"
            checked={treinoCasa}
            onPress={() => {
              setTreinoCasa(!treinoCasa);
              setTreinoAcademia(false); // Desmarcar "Treino na Academia"
            }}
            checkedColor={isHighContrast ? '#ddd' : '#25D366'}
            uncheckedColor={isHighContrast ? '#999' : '#ccc'}
          />
          <CheckBox
            title="Treino na Academia"
            checked={treinoAcademia}
            onPress={() => {
              setTreinoAcademia(!treinoAcademia);
              setTreinoCasa(false); // Desmarcar "Treino em Casa"
            }}
            checkedColor={isHighContrast ? '#ddd' : '#25D366'}
            uncheckedColor={isHighContrast ? '#999' : '#ccc'}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleWhatsAppPress}>
          <Icon name="whatsapp" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Enviar Informações</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  checkboxContainer: {
    width: '100%',
    marginVertical: 10,
  },
});