import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Training from '../screens/Training';
import * as Linking from 'react-native/Libraries/Linking/Linking';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());

describe('Training Screen', () => {
  it('renderiza os campos de título e entrada corretamente', () => {
    const { getByText, getByPlaceholderText } = render(<Training isHighContrast={false} />);
    
    expect(getByText('Consultoria Online')).toBeTruthy();

    expect(getByPlaceholderText('Peso (kg)')).toBeTruthy();
    expect(getByPlaceholderText('Altura (cm)')).toBeTruthy();
    expect(getByPlaceholderText('Restrições')).toBeTruthy();
  });

  it('abre o WhatsApp quando o botão é pressionado', async () => {
    const { getByText } = render(<Training isHighContrast={false} />);
    
    const whatsappButton = getByText('Enviar Mensagem no WhatsApp');
    fireEvent.press(whatsappButton);

    expect(Linking.openURL).toHaveBeenCalledWith(expect.stringContaining('whatsapp://send'));
  });

  it('abre link externo quando o botão é pressionado', () => {
    const { getByText } = render(<Training isHighContrast={false} />);
    
    const externalLinkButton = getByText('Ir para Exercício');
    fireEvent.press(externalLinkButton);

    expect(Linking.openURL).toHaveBeenCalledWith('https://www.example.com/exercicio');
  });
});