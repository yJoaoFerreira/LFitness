import { View, Text,SafeAreaView } from 'react-native';
import CheckBox from './IndexConsulta';
import styles from '../../Styles';


const CheckBoxPage = () =>{
     const optionsumporvex = [
     {text: 'Treino em casa', id: 1},
     {text: 'Treino na Academia', id: 2},
     
     ];
  return (
    <SafeAreaView style={styles.safearea}>
      <Text style={styles.titleC}> {"Escolha seu tipo de consulta"} </Text>
      <CheckBox options={optionsumporvex}/>
      
    </SafeAreaView>
   );
 };
 
export default CheckBoxPage;

