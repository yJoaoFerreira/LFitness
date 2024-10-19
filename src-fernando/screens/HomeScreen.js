import { View, Pressable,Text} from 'react-native';
import styles from './Styles';





const Home = ({ navigation, route }) => {
  const deslogar = () => {
    route.params.funcLogar(false);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.formbutton} onPress={() => navigation.push("Consulta")}>
        <Text>Consulta</Text> 
        </Pressable>
      <Pressable style={styles.formbutton} onPress={() => navigation.push("Avaliação Fisica")}>
        <Text>{'Avalição Fisica'}</Text> 
        </Pressable> 
      <Pressable style={styles.formbutton} onPress={() => navigation.push("Aluno")}>
        <Text>Aluno</Text> 
        </Pressable>     
      <Pressable  style={styles.formbutton} onPress={deslogar}> 
         <Text>Logout</Text>
         </Pressable>
      
    </View>
  );
};

export default Home;
