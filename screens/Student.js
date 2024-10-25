import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

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
    PreferenciaTreino: '',
    Link: ''
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
              PreferenciaTreino: data.PreferenciaTreino || 'N/A',
              Link: data.Link || ''
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

  const handleOpenLink = () => {
    let { Link } = alunoData;
    if (Link) {
      if (!Link.startsWith('http://') && !Link.startsWith('https://')) {
        Link = `http://${Link}`;
      }
      Linking.openURL(Link).catch(err => console.error('Erro ao abrir o link:', err));
    } else {
      alert('Link não disponível.');
    }
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
            <Text style={styles.modalText}>Peso: {alunoData.Peso} kg</Text>
            <Text style={styles.modalText}>Altura: {alunoData.Altura} cm</Text>
            <Text style={styles.modalText}>Dor Articular: {alunoData.DorArticulacao ? 'Sim' : 'Não'}</Text>
            {alunoData.DorArticulacao && (
              <Text style={styles.modalText}>Tipo de Dor: {alunoData.TipoDor}</Text>
            )}
            <Text style={styles.modalText}>Hipertenso: {alunoData.Hipertenso ? 'Sim' : 'Não'}</Text>
            <Text style={styles.modalText}>Restrições: {alunoData.Restricao}</Text>
            <Text style={styles.modalText}>Preferência de Treino: {alunoData.PreferenciaTreino}</Text>

            <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
              <Text style={styles.buttonText}>Ver Exercícios</Text>
            </TouchableOpacity>

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
    backgroundColor: '#A0BAB7',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#7A918E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: '#A0BAB7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Student;