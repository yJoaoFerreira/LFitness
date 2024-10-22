import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, Button, Alert, View, FlatList } from 'react-native';

export default function PhysicalAssessment({ isHighContrast }) {
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
      <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>{item.label}:</Text>
      <TextInput
        style={[styles.input, isHighContrast && styles.inputHighContrast]}
        placeholder={item.placeholder}
        value={form[item.name]}
        onChangeText={(value) => handleChange(item.name, value)}
        keyboardType={item.keyboardType}
        editable={item.editable !== false} // Handle editable field (like IMC)
      />
    </View>
  );

  return (
    <View style={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.paragraph, isHighContrast && styles.paragraphHighContrast]}>
        Gostaria de saber suas medidas corporais?
      </Text>

      <FlatList
        data={fields}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <Button title="Enviar Medidas" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  highContrastBackground: {
    backgroundColor: '#000',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
    marginBottom: 20,
  },
  paragraphHighContrast: {
    color: '#ddd',
  },
  inputContainer: {
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
});