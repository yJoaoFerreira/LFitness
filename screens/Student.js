import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Student = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [alunoData, setAlunoData] = useState({
    Nome: '',
    Peso: '',
    Altura: '',
    DorArticulacao: false,
    TipoDor: '',
    Hipertenso: false,
    Restricao: '',
    PreferenciaTreino: ''
  });

  useEffect(() => {
    const fetchAlunoData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const email = user.email;
          const alunoDocRef = doc(db, 'Alunos', email);
          const alunoDoc = await getDoc(alunoDocRef);

          if (alunoDoc.exists()) {
            const data = alunoDoc.data();
            setAlunoData({
              Nome: data.Nome || 'N/A',
              Peso: data.Peso || 'N/A',
              Altura: data.Altura || 'N/A',
              DorArticulacao: data.DorArticulacao || false,
              TipoDor: data.TipoDor || 'N/A',
              Hipertenso: data.Hipertenso || false,
              Restricao: data.Restricao || 'N/A',
              PreferenciaTreino: data.PreferenciaTreino || 'N/A'
            });
          } else {
            console.log('Documento não encontrado.');
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados de avaliação:', error);
      }
    };

    fetchAlunoData();
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
            <Text style={styles.modalText}>Nome: {alunoData.Nome}</Text>
            <Text style={styles.modalText}>Peso: {alunoData.Peso}</Text>
            <Text style={styles.modalText}>Altura: {alunoData.Altura}</Text>
            <Text style={styles.modalText}>Dor Articular: {alunoData.DorArticulacao ? 'Sim' : 'Não'}</Text>
            {alunoData.dorArticulacao && (
              <Text style={styles.modalText}>Tipo de Dor: {alunoData.TipoDor}</Text>
            )}
            <Text style={styles.modalText}>Hipertenso: {alunoData.Hipertenso ? 'Sim' : 'Não'}</Text>
            <Text style={styles.modalText}>Restrições: {alunoData.Restricao}</Text>
            <Text style={styles.modalText}>Preferência de Treino: {alunoData.PreferenciaTreino}</Text>

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