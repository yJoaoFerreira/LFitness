import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function Student() {
  const source = {
    html: `
    <p style="text-align:center;">Alunos</p>
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
