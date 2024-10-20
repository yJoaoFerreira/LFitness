import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Firebase from '../firebaseConfig';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    },
    { 
      label: 'Confirmar Senha:', 
      placeholder: 'Confirme sua Senha', 
      value: confirmarSenha, 
      onChange: setConfirmarSenha, 
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

  const handleRegister = () => {
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    
    const auth = getAuth(Firebase);
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário registrado:', user);
        setLoading(false);
        navigation.replace('Login');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error('Erro ao registrar:', error);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <>
          <FlatList
            data={formData}
            keyExtractor={(item) => item.label}
            renderItem={renderFormItem}
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null} {/* Exibir mensagem de erro */}

          <Pressable style={styles.formButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </Pressable>

          <View style={styles.subContainer}>
            <Pressable style={styles.subButton} onPress={() => navigation.replace('Login')}>
              <Text style={styles.subButtonText}>Já tenho uma conta</Text>
            </Pressable>
          </View>
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
    justifyContent: 'center',
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

export default Register;
