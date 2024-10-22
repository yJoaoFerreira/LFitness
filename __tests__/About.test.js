import React from 'react';
import { render } from '@testing-library/react-native';
import About from '../screens/About';

describe('About Screen', () => {
  test('renders the title', () => {
    const { getByText } = render(<About />);
    const titleElement = getByText(/O QUE É A LFITNESS?/i);
    expect(titleElement).toBeTruthy(); // Verifica se o título está na tela
  });

  test('renders the name', () => {
    const { getByText } = render(<About />);
    const nameElement = getByText(/Leandro Coimbra/i);
    expect(nameElement).toBeTruthy(); // Verifica se o nome está na tela
  });

  test('renders the description texts', () => {
    const { getAllByText } = render(<About />);
    const descriptionTexts = [
      /Com mais de 12 anos de experiência no mercado/i,
      /Atendo em academias, parques, residências/i,
      /Com uma interface simples e funcional/i,
    ];
    
    descriptionTexts.forEach(text => {
      const descriptionElement = getAllByText(text);
      expect(descriptionElement.length).toBeGreaterThan(0); // Verifica se cada descrição está na tela
    });
  });
});
