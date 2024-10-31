import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet, ActivityIndicator, Image } from 'react-native';

const ChangePassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      const auth = getAuth(Firebase);
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('E-mail de redefinição de senha enviado com sucesso!');
    } catch (err) {
      setError('Erro ao enviar o e-mail de redefinição de senha. Verifique o e-mail e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {loading ? (
        <ActivityIndicator size="large" color="#1a73e8" />
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
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  formButton: {
    backgroundColor: '#A0BAB7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
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
  errorText: {
    color: '#D0021B',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  successText: {
    color: 'green',
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default ChangePassword;