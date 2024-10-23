import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Firebase from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para salvar as informações localmente
  const saveLocalUser = async (email, senha) => {
    try {
      const userData = { email, senha };
      await AsyncStorage.setItem('localUser', JSON.stringify(userData));
      console.log('Usuário salvo localmente:', userData);
      navigation.replace('Login'); // Redireciona para login
    } catch (e) {
      setError('Erro ao salvar localmente.');
    }
  };

  // Função para sincronizar os dados locais com o Firebase
  const syncLocalUserToFirebase = async () => {
    try {
      const localUser = await AsyncStorage.getItem('localUser');
      if (localUser !== null) {
        const { email, senha } = JSON.parse(localUser);
        const auth = getAuth(Firebase);
        // Tenta criar o usuário no Firebase usando os dados salvos localmente
        await createUserWithEmailAndPassword(auth, email, senha);
        console.log('Dados locais sincronizados com o Firebase.');
        // Remover os dados locais após a sincronização bem-sucedida
        await AsyncStorage.removeItem('localUser');
      }
    } catch (error) {
      console.error('Erro ao sincronizar dados com o Firebase:', error);
    }
  };

  // Checar se há dados locais para sincronizar quando o componente monta
  useEffect(() => {
    syncLocalUserToFirebase();
  }, []);

  const handleRegister = async () => {
    setError('');

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    const auth = getAuth(Firebase);
    setLoading(true);

    try {
      // Tentativa de registrar no Firebase
      await createUserWithEmailAndPassword(auth, email, senha);
      setLoading(false);
      navigation.replace('Login'); // Redireciona para login
    } catch (error) {
      // Se der erro no Firebase, salva localmente
      setLoading(false);
      setError('Firebase não disponível. Salvando localmente...');
      await saveLocalUser(email, senha); // Chama a função para salvar localmente
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Coloque seu E-Mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Coloque sua Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />

          <Text style={styles.label}>Confirmar Senha:</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Confirme sua Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.formButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </Pressable>

          <Pressable style={styles.subButton} onPress={() => navigation.replace('Login')}>
            <Text style={styles.subButtonText}>Já tenho uma conta</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  label: {
    paddingVertical: 5,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#333',
    marginBottom: 10,
  },
  formInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  formButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  subButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  subButtonText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#3498db',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default Register;