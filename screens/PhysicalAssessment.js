import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, Alert, View, FlatList, ScrollView } from 'react-native';

export default function PhysicalAssessment() {
  const [form, setForm] = useState({
    peso: '',
    altura: '',
    imc: '',
    circAbdominal: '',
    bracoEsquerdo: '',
    bracoDireito: '',
    pernaEsquerda: '',
    pernaDireita: '',
    idadeCorporal: '',
  });

  const fields = [
    { label: 'Peso atual (kg)', name: 'peso', placeholder: 'Peso atual (kg)', keyboardType: 'numeric' },
    { label: 'Altura (cm)', name: 'altura', placeholder: 'Altura (cm)', keyboardType: 'numeric' },
    { label: 'IMC (calculado automaticamente)', name: 'imc', placeholder: 'IMC (calculado automaticamente)', editable: false },
    { label: 'Circunferência Abdominal (cm)', name: 'circAbdominal', placeholder: 'Circunferência Abdominal (cm)', keyboardType: 'numeric' },
    { label: 'Braço (Esquerdo) (cm)', name: 'bracoEsquerdo', placeholder: 'Braço (Esquerdo) (cm)', keyboardType: 'numeric' },
    { label: 'Braço (Direito) (cm)', name: 'bracoDireito', placeholder: 'Braço (Direito) (cm)', keyboardType: 'numeric' },
    { label: 'Perna (Esquerda) (cm)', name: 'pernaEsquerda', placeholder: 'Perna (Esquerda) (cm)', keyboardType: 'numeric' },
    { label: 'Perna (Direita) (cm)', name: 'pernaDireita', placeholder: 'Perna (Direita) (cm)', keyboardType: 'numeric' },
    { label: 'Idade Corporal', name: 'idadeCorporal', placeholder: 'Idade Corporal', keyboardType: 'numeric' },
  ];

  useEffect(() => {
    const peso = parseFloat(form.peso);
    const altura = parseFloat(form.altura) / 100;
    if (peso && altura) {
      const imc = (peso / (altura * altura)).toFixed(2);
      setForm(prevForm => ({ ...prevForm, imc }));
    } else {
      setForm(prevForm => ({ ...prevForm, imc: '' }));
    }
  }, [form.peso, form.altura]);

  const handleChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    Alert.alert('Formulário Enviado', 'Suas medidas foram salvas com sucesso!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{item.label}:</Text>
      <TextInput
        style={styles.input}
        placeholder={item.placeholder}
        value={form[item.name]}
        onChangeText={(value) => handleChange(item.name, value)}
        keyboardType={item.keyboardType}
        editable={item.editable !== false}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.paragraph}>
        Gostaria de saber suas medidas corporais?
      </Text>

      <View style={styles.flatListContainer}>
        <FlatList
          data={fields}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      </View>

      <Button title="Enviar Medidas" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
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
});