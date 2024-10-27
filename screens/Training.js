import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, TextInput, Switch, Linking,
  FlatList, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export default function Training() {
  const [Peso, setPeso] = useState('');
  const [Altura, setAltura] = useState('');
  const [DorArticulacao, setDorArticulacao] = useState(false);
  const [TipoDor, setTipoDor] = useState('');
  const [Hipertenso, setHipertenso] = useState(false);
  const [Restricao, setRestricao] = useState('');
  const [TreinoCasa, setTreinoCasa] = useState(false);
  const [TreinoAcademia, setTreinoAcademia] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const whatsappNumber = '5521993507026';

  const handleSaveToFirestore = async () => {
    if (!user) {
      console.error('Usuário não está logado');
      return;
    }

    const alunoData = {
      Peso,
      Altura,
      DorArticulacao,
      TipoDor: DorArticulacao ? TipoDor : '',
      Hipertenso,
      Restricao,
      PreferenciaTreino: TreinoCasa ? 'Casa' : TreinoAcademia ? 'Academia' : 'Não especificado',
      Link: '',
    };

    try {
      await setDoc(doc(db, 'Alunos', user.email), alunoData, { merge: true });
      console.log('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados no Firestore:', error);
    }
  };

  const handleWhatsAppMessage = () => {
    const message = `Olá, gostaria de treinar sendo orientado e supervisionado por você! Aqui estão os meus dados:\n\n` +
      `*Peso:* ${Peso} kg\n\n` +
      `*Altura:* ${Altura} cm\n\n` +
      `*Desconforto nas articulações:* ${DorArticulacao ? 'Sim' : 'Não'}\n\n` +
      `${DorArticulacao ? `*Descrição do desconforto:* ${TipoDor}\n\n` : ''}` +
      `*Histórico de hipertensão arterial:* ${Hipertenso ? 'Sim' : 'Não'}\n\n` +
      `*Restrições em atividades físicas:* ${Restricao || 'Nenhuma'}\n\n` +
      `*Preferência de treino:* ${TreinoCasa ? 'Treino em Casa' : TreinoAcademia ? 'Treino na Academia' : 'Não especificado'}\n\n` +
      `Agradeço pela atenção!`;

    const url = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp', err));
  };

  const handleSaveAndSendMessage = async () => {
    await handleSaveToFirestore();
    handleWhatsAppMessage();
  };

  const data = [
    {
      key: 'peso',
      label: 'Peso (kg):',
      placeholder: 'Peso (kg)',
      value: Peso,
      onChangeText: setPeso,
      type: 'input',
    },
    {
      key: 'altura',
      label: 'Altura (cm):',
      placeholder: 'Altura (cm)',
      value: Altura,
      onChangeText: setAltura,
      type: 'input',
    },
    {
      key: 'dorArticulacao',
      label: 'Sente dor nas articulações?',
      value: DorArticulacao,
      onValueChange: setDorArticulacao,
      type: 'switch',
    },
    {
      key: 'hipertenso',
      label: 'Hipertenso?',
      value: Hipertenso,
      onValueChange: setHipertenso,
      type: 'switch',
    },
    {
      key: 'restricao',
      label: 'Tem alguma restrição?',
      placeholder: 'Restrições',
      value: Restricao,
      onChangeText: setRestricao,
      type: 'input',
    },
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'input') {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChangeText}
            placeholderTextColor="#888"
          />
        </View>
      );
    } else if (item.type === 'switch') {
      return (
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
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
        <Text style={styles.title}>Consultoria Online</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />

        {DorArticulacao && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Qual dor você sente?</Text>
            <TextInput
              style={styles.input}
              placeholder="Descreva a dor"
              value={TipoDor}
              onChangeText={setTipoDor}
              placeholderTextColor="#888"
            />
          </View>
        )}

        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Treino em Casa"
            checked={TreinoCasa}
            onPress={() => {
              setTreinoCasa(!TreinoCasa);
              setTreinoAcademia(false);
            }}
            checkedColor="#25D366"
            uncheckedColor="#ccc"
          />
          <CheckBox
            title="Treino na Academia"
            checked={TreinoAcademia}
            onPress={() => {
              setTreinoAcademia(!TreinoAcademia);
              setTreinoCasa(false);
            }}
            checkedColor="#25D366"
            uncheckedColor="#ccc"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveAndSendMessage}>
          <Icon name="save" size={20} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Salvar Dados e Enviar WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0BAB7',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A0BAB7',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
