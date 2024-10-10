import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function PhysicalAssessment() {
  const source = {
    html: `
    <p style="text-align:center;">Gostaria de saber suas medidas corporais?</p>
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
