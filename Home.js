import { StyleSheet, Text, View } from "react-native";
import Header from "./Header"; // Certifique-se de que o caminho está correto

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.text}>Olá, este é o Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Preenche toda a tela
    justifyContent: 'flex-start', // Inicia o conteúdo do topo
    alignItems: 'center', // Centraliza horizontalmente
  },
  text: {
    marginTop: 20, // Adiciona um espaço acima do texto
  },
});