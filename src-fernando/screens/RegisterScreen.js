import { useState } from 'react';
import { View, Text,TextInput,Pressable } from 'react-native';
import styles from './Styles';

export default function NovoUsuario() {
    
   const[nomeNovo,setNomeNovo]=useState("");
   const[emailNovo,setEmailNovo]=useState("");
   const[senhaNovo,setSenhaNovo]=useState("");
  
 
     
  return (
    
    <View style={styles.container} >
      <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>Nome Completo:</Text>
      <TextInput style={styles.forminput}
       onChangeText={newNomeNovo=>setNomeNovo(newNomeNovo)}
       defaultValue={nomeNovo}/>
      <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>E-Mail:</Text>
      <TextInput style={styles.forminput}
       placeholder="Coloque seu E-Mail"
       keyboardType="email-address"
       autoCapitalize="none"
       autoComplete="email"
       onChangeText={newEmailNovo=>setEmailNovo(newEmailNovo)}
       defaultValue={emailNovo}/>
       <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>Senha:</Text>
      <TextInput style={styles.forminput}
       placeholder="Coloque sua Senha"
       autoCapitalize="none"
       secureTextEntry
       onChangeText={newSenhaNovo=>setSenhaNovo(newSenhaNovo)}
       defaultValue={senhaNovo}/>
     
      <Pressable style={styles.formbutton} onPress={() => route.params.funcLogar(true)}> 
         <Text style={{fontWeight:'700',textTransform:'uppercase'}}>Criar uma Nova Conta</Text>
         </Pressable>
    </View>
  );
 
}
