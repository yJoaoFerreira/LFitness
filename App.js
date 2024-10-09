import { StyleSheet, Text, View } from "react-native";
import Header from "./header";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.text}>Oláaa</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Preenche a tela toda
    backgroundColor: "#fff",
  },
  content: {
    flex: 1, // Preenche o espaço restante abaixo do cabeçalho
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
