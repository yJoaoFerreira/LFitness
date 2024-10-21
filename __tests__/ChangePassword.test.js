import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChangePassword from '../screens/ChangePassword';
import { sendPasswordResetEmail } from 'firebase/auth';

// Mock do Firebase e da função de redefinição de senha
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

// Mock do Firebase para evitar erros
jest.mock('../firebaseConfig', () => jest.fn());

describe('ChangePassword Component', () => {
  const mockNavigation = { replace: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByText } = render(<ChangePassword navigation={mockNavigation} />);
    
    expect(getByText(/Digite seu email para trocar a senha:/i)).toBeTruthy();
    expect(getByText(/Enviar Email/i)).toBeTruthy();
    expect(getByText(/Voltar para Login/i)).toBeTruthy();
  });

  test('shows success message on successful email send', async () => {
    sendPasswordResetEmail.mockResolvedValueOnce(); // Simula sucesso ao enviar o email
    const { getByText, getByPlaceholderText } = render(<ChangePassword navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText(/Coloque seu E-Mail/i), 'test@example.com');
    fireEvent.press(getByText(/Enviar Email/i));

    await waitFor(() => {
      expect(getByText(/Email de redefinição de senha enviado com sucesso!/i)).toBeTruthy();
    });
  });

  test('shows error message on failed email send', async () => {
    const errorMessage = 'Error: Email não encontrado.';
    sendPasswordResetEmail.mockRejectedValueOnce(new Error(errorMessage)); // Simula falha ao enviar o email
    const { getByText, getByPlaceholderText } = render(<ChangePassword navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText(/Coloque seu E-Mail/i), 'test@example.com');
    fireEvent.press(getByText(/Enviar Email/i));

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy(); // Verifica se a mensagem de erro está visível
    });
  });

  test('navigates to Login screen when "Voltar para Login" is pressed', () => {
    const { getByText } = render(<ChangePassword navigation={mockNavigation} />);

    fireEvent.press(getByText(/Voltar para Login/i));

    expect(mockNavigation.replace).toHaveBeenCalledWith('Login'); // Verifica se a navegação para Login foi chamada
  });
});
