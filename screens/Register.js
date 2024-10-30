import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet, ActivityIndicator, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../services/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  const handleRegister = async () => {
    setError('');
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    if (!nome) {
      setError('O campo nome é obrigatório.');
      return;
    }
    if (senha.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const userEmail = userCredential.user.email;
      await setDoc(doc(db, 'Alunos', userEmail), { Nome: nome });
      setLoading(false);
      navigation.replace('Login');
    } catch (error) {
      setLoading(false);
      setError('Erro ao registrar o usuário. Tente novamente.');
      console.error('Erro ao registrar:', error);
    }
  };

  const handdleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}> 
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          {loading ? (
            <ActivityIndicator size="large" color="#4A90E2" />
          ) : (
            <>
              <Pressable style={styles.pictureButton} onPress={handdleImagePicker}>
                <Ionicons name="camera-outline" size={18} color="#666" />
                <Text style={styles.pictureButtonText}>Escolher Foto</Text>
              </Pressable>
              
              {image ? <Image source={{ uri: image }} style={styles.profileImage} /> : null}
              
              <Text style={styles.label}>Nome:</Text>
              <TextInput style={styles.formInput} placeholder="Digite seu Nome" value={nome} onChangeText={setNome} />

              <Text style={styles.label}>Email:</Text>
              <TextInput style={styles.formInput} placeholder="Digite seu E-Mail" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

              <Text style={styles.label}>Senha:</Text>
              <TextInput style={styles.formInput} placeholder="Digite sua Senha" value={senha} onChangeText={setSenha} secureTextEntry={true} />

              {/* Aviso de senha mínima */}
              <Text style={styles.passwordHint}>A senha deve ter no mínimo 6 caracteres.</Text>

              <Text style={styles.label}>Confirmar Senha:</Text>
              <TextInput style={styles.formInput} placeholder="Confirme sua Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={true} />

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    paddingVertical: 5,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#333333',
    marginBottom: 10,
  },
  formInput: {
    height: 40,
    borderColor: '#A0BAB7',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
  },
  passwordHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  formButton: {
    backgroundColor: '#A0BAB7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
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
    color: '#7A918E',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  errorText: {
    color: '#D0021B',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  pictureButton: {
    backgroundColor: '#dcdcdc', // Botão discreto
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  pictureButtonText: {
    color: '#666', // Texto mais suave
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 5, // Espaço para o ícone
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Register;