import React from 'react';
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native';

export default function About() {
  return (
    <View style={styles.containerWrapper}> 
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
        <Text style={styles.title}>O QUE É A LFITNESS?</Text>

        <Image
          source={require('../assets/Leandro.png')}
          style={styles.image}
          alt="Leandro"
        />

        <Text style={styles.name}>Leandro Coimbra</Text>

        <Text style={styles.description}>
          Com mais de 12 anos de experiência no mercado, sou especializado em diversas áreas, incluindo Personal Training, Massoterapia, Auriculoterapia e Pilates. Ao longo da minha trajetória, me dedico a aprimorar minhas habilidades e a oferecer um acompanhamento completo e eficaz para cada aluno, garantindo que suas metas de saúde e bem-estar sejam atingidas de forma segura e eficiente. Desenvolvo programas de treinamento totalmente personalizados, adaptados às necessidades individuais de cada aluno, considerando não apenas os objetivos físicos, mas também o estilo de vida e as preferências pessoais.
        </Text>

        <Text style={styles.description}>
          Atendo em academias, parques, residências, condomínios e, para maior conveniência, ofereço atendimento no entorno do estádio Engenhão e sessões online, permitindo flexibilidade e conforto no acompanhamento dos treinos. O nosso aplicativo de treinamento foi criado justamente para auxiliar praticantes de atividades físicas em seus treinos diários, fornecendo uma plataforma acessível e personalizada para que você possa atingir suas metas de forma eficiente e segura.
        </Text>

        <Text style={styles.description}>
          Com uma interface simples e funcional, você pode acessar suas rotinas de treino, acompanhar seu progresso e receber dicas personalizadas de um profissional muito mais que capacitado. Acompanhe seus resultados e ajuste seus objetivos ao longo do tempo com o suporte que você merece.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 150,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    color: '#25D366',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 18,
    color: '#aaaaaa',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});