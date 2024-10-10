import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function HomeTraining() {
  const source = {
    html: `
    <h1 style="text-align:center;">Treino em Casa</h1>
    <p style="text-align:center;">Não está com tempo para ir à academia? Podemos treinar em casa!</p>
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
