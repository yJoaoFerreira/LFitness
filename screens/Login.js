import React from 'react';
import { View, Button } from 'react-native';

const Login = ({ navigation, route }) => {
  return (
    <View>
      <Button onPress={() => route.params.funcLogar(true)} title='Logar' />
      <Button onPress={() => navigation.navigate("Registrar")} title='Registrar' />
    </View>
  );
};

export default Login;