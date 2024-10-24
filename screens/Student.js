import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Student = () => {
  const navigation = useNavigation();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [studentData, setStudentData] = useState({
    peso: '',
    altura: '',
    dorArticulacao: false,
    tipoDor: '',
    hipertenso: false,
    restricao: '',
    treinoCasa: false,
    treinoAcademia: false
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('studentData');
        if (storedData) {
          setStudentData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Erro ao buscar dados de avaliação', error);
      }
    };

    fetchStudentData();
  }, []);

  const openPhysicalAssessment = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconback}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Área do Aluno</Text>

      <TouchableOpacity style={styles.button} onPress={openPhysicalAssessment}>
        <Text style={styles.buttonText}>Ver Avaliação Física</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Avaliação Física</Text>
            <Text style={styles.modalText}>Peso: {studentData.peso || 'N/A'}</Text>
            <Text style={styles.modalText}>Altura: {studentData.altura || 'N/A'}</Text>
            <Text style={styles.modalText}>Dor Articular: {studentData.dorArticulacao ? 'Sim' : 'Não'}</Text>
            {studentData.dorArticulacao && <Text style={styles.modalText}>Tipo de Dor: {studentData.tipoDor || 'N/A'}</Text>}
            <Text style={styles.modalText}>Hipertenso: {studentData.hipertenso ? 'Sim' : 'Não'}</Text>
            <Text style={styles.modalText}>Restrição: {studentData.restricao || 'Nenhuma'}</Text>
            <Text style={styles.modalText}>
              Preferência de Treino: {studentData.treinoCasa ? 'Casa' : studentData.treinoAcademia ? 'Academia' : 'Não especificado'}
            </Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  iconback: {
    position: 'absolute',
    top: 10,
    left: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 30,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Student;
