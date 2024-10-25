import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const Config = () => {
  const [change1, setchange1] = useState(false);
  const [change2, setchange2] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.label}>Alterar o tamanho da fonte (Grande ou Pequeno)</Text>
        <Pressable onPress={() => setchange1(!change1)}>
          <MaterialCommunityIcons 
            name={change1 ? "toggle-switch" : "toggle-switch-off"} 
            size={50} 
            color={change1 ? '#25D366' : '#ccc'} 
          />
        </Pressable>

        <Text style={styles.label}>Alterar tipo de visualização (Light ou Dark)</Text>
        <Pressable onPress={() => setchange2(!change2)}>
          <MaterialCommunityIcons 
            name={change2 ? "toggle-switch" : "toggle-switch-off"} 
            size={50} 
            color={change2 ? '#25D366' : '#ccc'} 
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ffffff',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#aaaaaa',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Config;