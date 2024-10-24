import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';



const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);



  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <>
          <Text style={styles.label}>Digite seu email para trocar a senha:</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Coloque seu E-Mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

          <Pressable style={styles.formButton} onPress={handlePasswordReset}>
            <Text style={styles.buttonText}>Enviar Email</Text>
          </Pressable>

          <Pressable style={styles.subButton} onPress={() => navigation.replace('Login')}>
            <Text style={styles.subButtonText}>Voltar para Login</Text>
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
  successText: {
    color: 'green',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default ChangePassword;