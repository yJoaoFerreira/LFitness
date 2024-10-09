import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.menuText}>Menu de Nav</Text>
        <Text style={styles.logoText}>Logotipo</Text>
        <Text style={styles.themeText}>Contraste</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Preenche toda a tela
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row', // Organiza os elementos na horizontal
    justifyContent: 'space-between', // Distribui o espaço entre os itens
    alignItems: 'center', // Alinha os itens verticalmente
    paddingHorizontal: 20, // Adiciona um espaçamento lateral
    paddingTop: 40, // Adiciona um espaçamento no topo
    height: 80, // Define a altura do cabeçalho
    backgroundColor: '#f8f8f8', // Cor de fundo do cabeçalho
    borderBottomWidth: 1, // Linha na parte inferior do cabeçalho
    borderBottomColor: '#ddd', // Cor da linha inferior
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto (no espaço disponível para ele)
  },
  themeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
