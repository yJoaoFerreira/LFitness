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

  test('renders correctly', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={{ params: { funcLogar: mockFuncLogar } }} />);
    
    // Verifica se o título e os botões estão renderizados corretamente
    expect(getByText(/Bem-vindo à Home!/i)).toBeTruthy();
    expect(getByText(/Ir para Alunos/i)).toBeTruthy();
    expect(getByText(/Logout/i)).toBeTruthy();
  });

  test('navigates to Alunos when button is pressed', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={{ params: { funcLogar: mockFuncLogar } }} />);
    
    fireEvent.press(getByText(/Ir para Alunos/i));
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Aluno'); // Verifica se a navegação para Aluno foi chamada
  });

  test('calls funcLogar and navigates to Login when Logout button is pressed', () => {
    const { getByText } = render(<Home navigation={mockNavigation} route={{ params: { funcLogar: mockFuncLogar } }} />);
    
    fireEvent.press(getByText(/Logout/i));
    
    expect(mockFuncLogar).toHaveBeenCalledWith(false); // Verifica se funcLogar foi chamado com false
    expect(mockNavigation.replace).toHaveBeenCalledWith('Login'); // Verifica se a navegação para Login foi chamada
  });
});