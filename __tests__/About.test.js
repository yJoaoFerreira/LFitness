import React from 'react';
import { render } from '@testing-library/react-native';
import About from '../screens/About';

describe('About Screen', () => {
  test('deve renderizar o título corretamente', () => {
    const { getByText } = render(<About />);
    expect(getByText('O QUE É A LFITNESS?')).toBeTruthy();
  });

  test('deve renderizar o nome "Leandro Coimbra"', () => {
    const { getByText } = render(<About />);
    expect(getByText('Leandro Coimbra')).toBeTruthy();
  });

  test('deve renderizar a descrição principal', () => {
    const { getByText } = render(<About />);
    expect(getByText(/Com mais de 12 anos de experiência/)).toBeTruthy();
  });

  test('deve renderizar todas as seções de descrição', () => {
    const { getAllByText } = render(<About />);
    const descriptions = getAllByText(/Com|Atendo|Com uma interface/);
    expect(descriptions.length).toBe(3); // Verifica se existem 3 blocos de texto
  });
});