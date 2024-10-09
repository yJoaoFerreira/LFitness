import { StyleSheet, Text, View } from "react-native";
import Header from "./Header"; // Certifique-se de que o caminho está correto

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text>Olá, este é o Home!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
