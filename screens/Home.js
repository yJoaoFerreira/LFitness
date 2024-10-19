import React from 'react';
import { View, Text, Button } from 'react-native';

const Home = ({ navigation, route }) => {
  const deslogar = () => {
    route.params.funcLogar(false);
    navigation.replace("Login");
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Alunos" onPress={() => navigation.navigate("Aluno")} />
      <Button title="Logout" onPress={deslogar} />
    </View>
  );
};

export default Home;