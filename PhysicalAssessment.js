import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TextInput, StyleSheet, Button, Alert, View } from 'react-native';

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

  return (
    <ScrollView contentContainerStyle={[styles.container, isHighContrast ? styles.highContrastBackground : null]}>
      <Text style={[styles.paragraph, isHighContrast && styles.paragraphHighContrast]}>
        Gostaria de saber suas medidas corporais?
      </Text>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Peso atual (kg):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Peso atual (kg)"
          value={form.peso}
          onChangeText={(value) => handleChange('peso', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Altura (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Altura (cm)"
          value={form.altura}
          onChangeText={(value) => handleChange('altura', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>IMC (calculado automaticamente):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="IMC (calculado automaticamente)"
          value={form.imc}
          editable={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Circunferência Abdominal (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Circunferência Abdominal (cm)"
          value={form.circAbdominal}
          onChangeText={(value) => handleChange('circAbdominal', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Braço (Esquerdo) (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Braço (Esquerdo) (cm)"
          value={form.bracoEsquerdo}
          onChangeText={(value) => handleChange('bracoEsquerdo', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Braço (Direito) (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Braço (Direito) (cm)"
          value={form.bracoDireito}
          onChangeText={(value) => handleChange('bracoDireito', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Perna (Esquerda) (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Perna (Esquerda) (cm)"
          value={form.pernaEsquerda}
          onChangeText={(value) => handleChange('pernaEsquerda', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Perna (Direita) (cm):</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Perna (Direita) (cm)"
          value={form.pernaDireita}
          onChangeText={(value) => handleChange('pernaDireita', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, isHighContrast && styles.labelHighContrast]}>Idade Corporal:</Text>
        <TextInput
          style={[styles.input, isHighContrast && styles.inputHighContrast]}
          placeholder="Idade Corporal"
          value={form.idadeCorporal}
          onChangeText={(value) => handleChange('idadeCorporal', value)}
          keyboardType="numeric"
        />
      </View>

      <Button title="Enviar Medidas" onPress={handleSubmit} />
    </ScrollView>
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
});
