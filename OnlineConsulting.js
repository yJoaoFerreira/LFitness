import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

export default function OnlineConsulting() {
  const source = {
    html: `
    <p style="text-align:center;">Você gostaria de treinar sendo orientado e supervisionado por mim?</p>
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
