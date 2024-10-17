import { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from './src/screens/LoginScreen';
import Home from './src/screens/HomeScreen';
import Consulta from './src/screens/Consultancy';
import AvalicaoFisica from './src/screens/Assessment';
import Aluno from './src/screens/StudentScreen';
import EsqueciSenha from './src/screens/ForgetPassword';
import NovoUsuario from './src/screens/RegisterScreen';

const Stack = createStackNavigator();

export default function Routes(){
    const [EstaLogado, setLogado] = useState(false);

  return (
     <NavigationContainer>
      {EstaLogado ? (
        
              
                    <Stack.Navigator >
                      <Stack.Screen  name="Home" options={{ headerShown: true }} component={Home} initialParams={{ funcLogar: setLogado }} />
                      <Stack.Screen name="Consulta" component={Consulta} options={{headerShown: true}} />
                      <Stack.Screen name="Avaliação Fisica" component={AvalicaoFisica} options={{headerShown: true}} />
                      <Stack.Screen name="Aluno" component={Aluno} options={{headerShown: true}} />
                    </Stack.Navigator>
                  
             
                
              
            
          
          
        
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} initialParams={{ funcLogar: setLogado }} />
          <Stack.Screen name="Esqueci Senha" component={EsqueciSenha} options={{ headerShown: true }}/>
          <Stack.Screen name="Novo Usuario" component={NovoUsuario} options={{ headerShown: true }} />
        </Stack.Navigator>
      )}
      
     </NavigationContainer> 
  );
        
    
}
