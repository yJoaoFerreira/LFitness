import { useState } from 'react';
import { View, Button, Text,TextInput} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();



const Login = ({ route }) => {
   const[text,setText]=useState("");
   const[senha,setSenha]=useState("");
  return (
    
    <View style={{marginVertical:15}}>
      <Text style={{paddingVertical:5}}>Usuario:</Text>
      <TextInput style={{height:40}}
       placeholder="Coloque seu nome de usario"
       onChangeText={newText=>setText(newText)}
       defaultValue={text}/>
       <Text style={{paddingVertical:12}}>Senha:</Text>
      <TextInput style={{height:40}}
       placeholder="Coloque sua Senha"
       onChangeText={newSenha=>setSenha(newSenha)}
       defaultValue={senha}/>
      <Text> </Text>
      <Button  onPress={() => route.params.funcLogar(true)} title='Logar' />
     
    </View>
  );
};





const Home = ({ navigation, route }) => {
  const deslogar = () => {
    route.params.funcLogar(false);
    navigation.replace("Login");
  };

  return (
    <View>
      
      <Button title="Logout" onPress={deslogar} />
    </View>
  );
};



const App = () => {
  const [EstaLogado, setLogado] = useState(false);

  return (
    <NavigationContainer>
      {EstaLogado ? (
        
              
                    <Stack.Navigator >
                      <Stack.Screen  name="Home" options={{ headerShown: true }} component={Home} initialParams={{ funcLogar: setLogado }} />
                      
                    </Stack.Navigator>
                  
             
                
              
            
          
          
        
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} initialParams={{ funcLogar: setLogado }} />
          
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
