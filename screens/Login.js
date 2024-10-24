import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase from '../firebaseConfig';

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedSenha = await AsyncStorage.getItem('senha');
        if (storedEmail !== null) setEmail(storedEmail);
        if (storedSenha !== null) setSenha(storedSenha);
      } catch (e) {
        console.log('Erro ao carregar credenciais salvas:', e);
      }
    };

    loadStoredCredentials();
  }, []);

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const formData = [
    { label: 'Email:', placeholder: 'Coloque seu E-Mail', value: email, onChange: setEmail, secureTextEntry: false },
    { 
      label: 'Senha:', 
      placeholder: 'Coloque sua Senha', 
      value: senha, 
      onChange: setSenha, 
      secureTextEntry: !senhaVisivel,
      isPassword: true,
    }
  ];

  const renderFormItem = ({ item }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.formInput}
          placeholder={item.placeholder}
          value={item.value}
          secureTextEntry={item.secureTextEntry}
          onChangeText={item.onChange}
          autoCapitalize="none"
          keyboardType={item.secureTextEntry ? 'default' : 'email-address'}
        />
        {item.isPassword && (
          <TouchableOpacity onPress={toggleSenhaVisivel} style={styles.eyeIcon}>
            <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const handleLogin = () => {
    setLoading(true);
    
    if (email.endsWith('@admin.com')) {
      if (email === 'leandro@admin.com' && senha === '123456') {
        console.log('Login realizado com sucesso via sistema local (Admin)!');
        
        saveCredentials(email, senha);
  
        setTimeout(() => {
          setLoading(false);
          route.params.funcLogar(true);
        }, 2500);
      } else {
        setLoading(false);
        setError('Usuário ou senha incorretos no sistema local (Admin)');
      }
  
    } else if (email.endsWith('@alunos.com')) {
      if (email === 'fernando@alunos.com' && senha === '123456') {
        console.log('Login realizado com sucesso via sistema local (Aluno)!');
  
        saveCredentials(email, senha);
  
        setTimeout(() => {
          setLoading(false);
          route.params.funcLogar(true);
        }, 2500);
      } else {
        setLoading(false);
        setError('Usuário ou senha incorretos no sistema local (Aluno)');
      }
  
    } else {
      const auth = getAuth(Firebase);
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('Usuário autenticado via Firebase:', user);
          
          saveCredentials(email, senha);
  
          setTimeout(() => {
            setLoading(false);
            route.params.funcLogar(true);
          }, 2500);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
          console.error('Erro ao logar no Firebase:', error);
        });
    }
  };

  const saveCredentials = async (email, senha) => {
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      console.log('Credenciais salvas com sucesso');
    } catch (e) {
      console.log('Erro ao salvar credenciais:', e);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.formContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          {loading ? (
            <ActivityIndicator size="large" color="#3498db" />
          ) : (
            <>
              <FlatList
                data={formData}
                keyExtractor={(item) => item.label}
                renderItem={renderFormItem}
              />
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Pressable style={styles.formButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Logar</Text>
              </Pressable>

              <View style={styles.subContainer}>
                <Pressable style={styles.subButton} onPress={() => navigation.push('TrocarSenha')}>
                  <Text style={styles.subButtonText}>Esqueci Senha</Text>
                </Pressable>
                <Pressable style={styles.subButton} onPress={() => navigation.push('Registrar')}>
                  <Text style={styles.subButtonText}>Novo Usuário</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    paddingVertical: 5,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  formButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  subButton: {
    padding: 10,
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

export default Login;