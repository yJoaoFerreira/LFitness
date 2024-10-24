import React from 'react';
import { render } from '@testing-library/react-native';
import About from '../screens/About';

describe('tela Sobre', () => {
  test('renderiza o título', () => {
    const { getByText } = render(<About />);
    const titleElement = getByText(/O QUE É A LFITNESS?/i);
    expect(titleElement).toBeTruthy();
  });

  test('renderiza o nome', () => {
    const { getByText } = render(<About />);
    const nameElement = getByText(/Leandro Coimbra/i);
    expect(nameElement).toBeTruthy();
  });

  test('renderiza os textos de descrição', () => {
    const { getAllByText } = render(<About />);
    const descriptionTexts = [
      /Com mais de 12 anos de experiência no mercado/i,
      /Atendo em academias, parques, residências/i,
      /Com uma interface simples e funcional/i,
    ];
    
    descriptionTexts.forEach(text => {
      const descriptionElement = getAllByText(text);
      expect(descriptionElement.length).toBeGreaterThan(0);
    });
  });
});
