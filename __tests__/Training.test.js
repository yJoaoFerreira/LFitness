import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Training from '../screens/Training'; // Importe o caminho correto da sua tela
import * as Linking from 'react-native/Libraries/Linking/Linking';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());

describe('Training Screen', () => {
  it('renders the title and input fields correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Training isHighContrast={false} />);
    
    // Verifica o título
    expect(getByText('Consultoria Online')).toBeTruthy();

    // Verifica os inputs
    expect(getByPlaceholderText('Peso (kg)')).toBeTruthy();
    expect(getByPlaceholderText('Altura (cm)')).toBeTruthy();
    expect(getByPlaceholderText('Restrições')).toBeTruthy();
  });

  it('opens WhatsApp when the button is pressed', async () => {
    const { getByText } = render(<Training isHighContrast={false} />);
    
    // Simula o clique no botão do WhatsApp
    const whatsappButton = getByText('Enviar Mensagem no WhatsApp');
    fireEvent.press(whatsappButton);

    // Verifica se o Linking.openURL foi chamado com a URL correta
    expect(Linking.openURL).toHaveBeenCalledWith(expect.stringContaining('whatsapp://send'));
  });

  it('opens external link when the button is pressed', () => {
    const { getByText } = render(<Training isHighContrast={false} />);
    
    // Simula o clique no botão de link externo
    const externalLinkButton = getByText('Ir para Exercício');
    fireEvent.press(externalLinkButton);

    // Verifica se o Linking.openURL foi chamado com a URL correta
    expect(Linking.openURL).toHaveBeenCalledWith('https://www.example.com/exercicio');
  });
});