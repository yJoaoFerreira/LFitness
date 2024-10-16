import { useState } from 'react';
import { View, Pressable, Text,TextInput} from 'react-native';
import styles from '../../Styles';



const Login = ({ navigation,route }) => {
   const[text,setText]=useState("");
   const[senha,setSenha]=useState("");
  return (
    
    <View style={styles.container} >
      <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>Usuario:</Text>
      <TextInput style={styles.forminput}
       placeholder="Coloque seu E-Mail"
       keyboardType="email-address"
       autoCapitalize="none"
       autoComplete="email"
       onChangeText={newText=>setText(newText)}
       defaultValue={text}/>
       <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>Senha:</Text>
      <TextInput style={styles.forminput}
       placeholder="Coloque sua Senha"
       autoCapitalize="none"
       secureTextEntry
       onChangeText={newSenha=>setSenha(newSenha)}
       defaultValue={senha}/>
     
      <Pressable style={styles.formbutton} onPress={() => route.params.funcLogar(true)}> 
         <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>Logar</Text>
         </Pressable>
     
    
      <View style={styles.subcontainer}>
      <Pressable style={styles.subbutton} onPress={() => navigation.push("Esqueci Senha")}> 
         <Text style={{fontWeight:'700',textTransform:'uppercase'}}>{'Esqueci Senha'}</Text>
         </Pressable>   
      <Pressable style={styles.subbutton} onPress={() => navigation.push("Novo Usuario")}> 
         <Text style={{fontWeight:'700',textTransform:'uppercase'}}>{'Novo Usuario'}</Text>
         </Pressable>
         </View>
      </View>  
  );
};

export default Login;
