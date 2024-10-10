import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function Home() {
  const source = {
    html: `
    <h1 style="text-align:center;">Bem-vindo ao Home!</h1>
    <p style="text-align:center; color:blue;">Este é um exemplo de conteúdo HTML renderizado no React Native.</p>
    <img src="https://via.placeholder.com/150" alt="Exemplo de imagem" />
    `
  };

  const { width } = useWindowDimensions();

  return (
    <RenderHtml
      contentWidth={width}
      source={source}
    />
  );
}
