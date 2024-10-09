import { Text, Image, View, } from 'react-native';

export default function Header() {
  return (
    <View>
        {/* Menu de Navegação */}
        <Text>Menu</Text>
        {/* Logo do Site */}
        <Image source={require('../images/logo.png')}/>
        {/* Alternação de Dark e Light Mode */}
        <Text>Dark/Light</Text>
    </View>
  );
}