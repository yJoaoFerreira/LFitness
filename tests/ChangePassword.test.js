import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChangePassword from '../screens/ChangePassword';
import { sendPasswordResetEmail } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

jest.mock('../firebaseConfig', () => jest.fn());

describe('Componente ChangePassword', () => {
  const mockNavigation = { replace: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza corretamente', () => {
    const { getByText } = render(<ChangePassword navigation={mockNavigation} />);
    
    expect(getByText(/Digite seu email para trocar a senha:/i)).toBeTruthy();
    expect(getByText(/Enviar Email/i)).toBeTruthy();
    expect(getByText(/Voltar para Login/i)).toBeTruthy();
  });

  test('mostra mensagem de sucesso no envio de email bem-sucedido', async () => {
    sendPasswordResetEmail.mockResolvedValueOnce();
    const { getByText, getByPlaceholderText } = render(<ChangePassword navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText(/Coloque seu E-Mail/i), 'test@example.com');
    fireEvent.press(getByText(/Enviar Email/i));

    await waitFor(() => {
      expect(getByText(/Email de redefinição de senha enviado com sucesso!/i)).toBeTruthy();
    });
  });

  test('mostra mensagem de erro em caso de falha no envio de e-mail', async () => {
    const errorMessage = 'Error: Email não encontrado.';
    sendPasswordResetEmail.mockRejectedValueOnce(new Error(errorMessage));
    const { getByText, getByPlaceholderText } = render(<ChangePassword navigation={mockNavigation} />);

    fireEvent.changeText(getByPlaceholderText(/Coloque seu E-Mail/i), 'test@example.com');
    fireEvent.press(getByText(/Enviar Email/i));

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });

  test('navega para a tela de Login quando "Voltar para Login" é pressionado', () => {
    const { getByText } = render(<ChangePassword navigation={mockNavigation} />);

    fireEvent.press(getByText(/Voltar para Login/i));

    expect(mockNavigation.replace).toHaveBeenCalledWith('Login');
  });
});
