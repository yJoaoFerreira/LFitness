import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../screens/Home';

describe('Home Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    replace: jest.fn(),
  };

  const mockFuncLogar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza corretamente', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={{ params: { funcLogar: mockFuncLogar } }} />);
    
    expect(getByText(/Bem-vindo à Home!/i)).toBeTruthy();
    expect(getByText(/Ir para Alunos/i)).toBeTruthy();
    expect(getByText(/Logout/i)).toBeTruthy();
  });

  test('navega para Alunos quando o botão é pressionado', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={{ params: { funcLogar: mockFuncLogar } }} />);
    
    fireEvent.press(getByText(/Ir para Alunos/i));
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Aluno');
  });

  test('chama função de Logar e navega para Login quando o botão Logout é pressionado', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={{ params: { funcLogar: mockFuncLogar } }} />);
    
    fireEvent.press(getByText(/Logout/i));
    
    expect(mockFuncLogar).toHaveBeenCalledWith(false);
    expect(mockNavigation.replace).toHaveBeenCalledWith('Login');
  });
});