import React from 'react';
import { View, Text, Button } from 'react-native';

const Student = ({ navigation }) => (
  <View>
    <Text>Aluno</Text>
    <Button title="Voltar para Home" onPress={() => navigation.goBack()} />
  </View>
);

export default Student;