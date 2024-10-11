import React from 'react';
import { Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function Home({ isHighContrast }) {
  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      style={[styles.scrollView, isHighContrast ? styles.highContrastBackground : null]} // Aplicando o estilo condicional
    >
      <Text style={[styles.title, isHighContrast && styles.titleHighContrast]}>QUEM É A LFITNESS?</Text>
      
      <Image
        source={require('./assets/Leandro.png')}
        style={styles.image}
        alt="Leandro Coimbra"
      />
      
      <Text style={[styles.name, isHighContrast && styles.nameHighContrast]}>Leandro Coimbra</Text>
      
      <Text style={[styles.description, isHighContrast && styles.descriptionHighContrast]}>
        " Com 12 anos de experiência no mercado fitness, sou especializado em diversas áreas, incluindo Personal Training, Massoterapia, Auriculoterapia e Pilates. Ao longo da minha trajetória, tenho me dedicado a aprimorar minhas habilidades e a oferecer um acompanhamento completo e eficaz para cada aluno, garantindo que suas metas de saúde e bem-estar sejam atingidas de forma segura e eficiente. "
      </Text>
      
      <Text style={[styles.description, isHighContrast && styles.descriptionHighContrast]}>
        " Desenvolvo programas de treinamento totalmente personalizados, adaptados às necessidades individuais de cada aluno. Minha abordagem considera não apenas os objetivos físicos, mas também o estilo de vida e as preferências pessoais. Atendo em academias, parques, residências, condomínios e, para maior conveniência, ofereço atendimento no entorno do estádio Engenhão e sessões online, permitindo flexibilidade e conforto no acompanhamento dos treinos. "
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    backgroundColor: '#fff', // Cor de fundo padrão
  },
  highContrastBackground: {
    backgroundColor: '#000', // Cor de fundo em alto contraste
  },
  title: {
    fontSize: 32,
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleHighContrast: {
    color: '#fff',
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 150,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nameHighContrast: {
    color: '#fff',
  },
  description: {
    fontSize: 18,
    color: '#34495e',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  descriptionHighContrast: {
    color: '#ddd',
  },
});