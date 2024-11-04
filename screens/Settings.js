import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const Settings = () => {
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email;

        try {
          setLoading(true);
          await updateDoc(doc(db, 'Alunos', userEmail), {
            Foto: result.assets[0].base64,
          });
          setLoading(false);
          alert('Foto de perfil atualizada com sucesso!');
        } catch (error) {
          setLoading(false);
          console.error('Erro ao atualizar a foto de perfil:', error);
          alert('Erro ao atualizar a foto de perfil.');
        }
      } else {
        alert('Usuário não autenticado.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configurações</Text>

        <Pressable style={styles.pictureButton} onPress={handleImagePicker}>
          <Ionicons name="camera-outline" size={18} color="#666" />
          <Text style={styles.pictureButtonText}>Escolher Foto de Perfil</Text>
        </Pressable>
        
        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.noProfileImageText}>Nenhuma foto de perfil selecionada</Text>
        )}

        <Text style={styles.label}>Alterar o tamanho da fonte (Grande ou Pequeno)</Text>
        <Pressable onPress={() => setChange1(!change1)}>
          <MaterialCommunityIcons
            name={change1 ? "toggle-switch" : "toggle-switch-off"}
            size={50}
            color={change1 ? '#25D366' : '#ccc'}
          />
        </Pressable>

        <Text style={styles.label}>Alterar tipo de visualização (Light ou Dark)</Text>
        <Pressable onPress={() => setChange2(!change2)}>
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
    backgroundColor: '#f0f0f0',
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
    color: '#333333',
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
  },
  pictureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  pictureButtonText: {
    marginLeft: 5,
    color: '#666',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15,
  },
  noProfileImageText: {
    color: '#888',
    marginBottom: 10,
  },
});

export default Settings;