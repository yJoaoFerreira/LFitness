import React from 'react';
import { Text,View,StyleSheet,Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useState} from 'react';

const Config = () => {
 const [change1,setchange1] = useState(false);
 const [change2,setchange2] = useState(false);

 return(
   <View style={styles.container}>
    <View style={styles.content}>
     <Text style={styles.title}>Configurações </Text>
    <Text style={{fontSize:15,fontWeight:'bold'}}>Alterar o tamanho da fonte (Grande ou Pequeno) </Text>
    {change1 ?(
      <Pressable onPress={() => setchange1(!change1)}>
       <MaterialCommunityIcons name="toggle-switch" size={50} color="black"  />
      </Pressable>
    ) : (  
      <Pressable  onPress={() => setchange1(!change1)}>
       <MaterialCommunityIcons name="toggle-switch-off" size={50} color="black"  />
      </Pressable>
    )}
    <Text style={{fontSize:15,fontWeight:'bold'}}>Alterar tipo de visualização (Light ou Dark) </Text> 
    {change2 ?(
      <Pressable onPress={() => setchange2(!change2)}>
       <MaterialCommunityIcons name="toggle-switch" size={50} color="black"  />
      </Pressable>
    ) : (
      <Pressable  onPress={() => setchange2(!change2)}>
       <MaterialCommunityIcons name="toggle-switch-off" size={50} color="black"  />
      </Pressable>
    )}
    </View>
   </View>
 ); 
}; 

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
   content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
   title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },

 });
export default Config;