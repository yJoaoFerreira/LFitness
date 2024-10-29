import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../screens/Home';

describe('Home Screen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
  };

  const mockFuncLogar = jest.fn();

  const mockRoute = {
    params: {
      funcLogar: mockFuncLogar,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o título corretamente', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={mockRoute} />);
    expect(getByText('Bem-vindo à Home!')).toBeTruthy();
  });

  test('navegar para a tela "Aluno" ao pressionar o botão Área de Alunos', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('Área de Alunos'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Aluno');
  });

  test('chamar funcLogar e navigation.replace ao pressionar o botão de deslogar', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={mockRoute} />);
    fireEvent.press(getByText('Deslogar'));
    expect(mockFuncLogar).toHaveBeenCalledWith(false);
    expect(mockNavigation.replace).toHaveBeenCalledWith('Login');
  });
});