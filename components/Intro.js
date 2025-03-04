import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const Intro = ({ navigation, onContinue }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isButtonVisible, setButtonVisible] = useState(false);
  const fullText = `Oi, eu sou o Leandro!
  
Seja muito bem-vindo à LFitness!

Estamos muito empolgados em ter você aqui conosco. Aqui você encontrará uma maneira fácil e eficiente de transformar sua jornada. Acompanhe seu progresso com métricas detalhadas por um profissional atensioso e experiente, explore treinos personalizados que se adaptam ao seu nível e objetivos pessoais.

Seja você um iniciante ou um atleta experiente, estou preparado para apoiar cada passo do seu caminho. Prepare-se para alcançar seus objetivos e se tornar a melhor versão de si mesmo!

Vamos juntos nessa jornada!`;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let index = 0;
    const typingInterval = 25;
    const maxLength = fullText.length;

    const fadeIn = () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    };

    const typeText = () => {
      if (index < maxLength) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(intervalId);
        setButtonVisible(true);
      }
    };

    const intervalId = setInterval(typeText, typingInterval);
    fadeIn();

    return () => {
      clearInterval(intervalId);
    };
  }, [fadeAnim, fullText]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.introText}>{displayedText}</Text>
      </Animated.View>
      {isButtonVisible && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onContinue();
            navigation.replace('Login');
          }}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    marginBottom: 20,
  },
  introText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  button: {
    backgroundColor: '#A0BAB7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Intro;