import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={formData}
        keyExtractor={(item) => item.label}
        renderItem={renderFormItem}
      />

      <Pressable style={styles.formButton} onPress={() => route.params.funcLogar(true)}>
        <Text style={styles.buttonText}>Logar</Text>
      </Pressable>

      <View style={styles.subContainer}>
        <Pressable style={styles.subButton} onPress={() => navigation.push('Esqueci Senha')}>
          <Text style={styles.subButtonText}>Esqueci Senha</Text>
        </Pressable>
        <Pressable style={styles.subButton} onPress={() => navigation.push('Novo Usuario')}>
          <Text style={styles.subButtonText}>Novo Usuário</Text>
        </Pressable>
      </View>
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
});

export default Login;