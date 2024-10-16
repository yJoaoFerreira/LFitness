import { useState } from 'react';
import { View, Text,TextInput,Pressable,Linking } from 'react-native';
import styles from '../../Styles';

export default function EsqueciSenha() {
   const[emailConfirma,setEmailConfirma]=useState("");
   const recuperaSenha = () => {
     const url = 'https://www.youtube.com/watch?v=E1jeVVp1Yhk';
     Linking.openURL(url).catch(err => console.error('Erro ao abri o link',err));
   };
  
  return (
    <View style={styles.container} >
      <Text style={{paddingVertical:5,fontWeight:'700',textTransform:'uppercase'}}>Confirma o seu E-Mail:</Text>
      <TextInput style={styles.forminput}
       placeholder="Coloque seu E-Mail"
       keyboardType="email-address"
       autoCapitalize="none"
       autoComplete="email"
       onChangeText={newEmailConfirma=>setEmailConfirma(newEmailConfirma)}
       defaultValue={emailConfirma}/>
       <Pressable style={styles.formbutton} onPress={recuperaSenha}> 
         <Text style={{fontWeight:'700',textTransform:'uppercase'}}>Redefinir Senha</Text>
         </Pressable>
    </View>
  );
 
}
