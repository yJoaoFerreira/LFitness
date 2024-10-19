import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Importando as telas
import Register from './screens/Register';
import Login from './screens/Login';
import Training from './screens/Training';
import Settings from './screens/Settings';
import About from './screens/About';
import Student from './screens/Student';
import Home from './screens/Home';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator para a navegação interna
const HomeStack = ({ route }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={Home} 
      initialParams={{ funcLogar: route.params.funcLogar }} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen name="Aluno" component={Student} />
  </Stack.Navigator>
);

// Drawer Navigator para a navegação lateral
const DrawerNav = ({ funcLogar }) => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={(props) => <HomeStack {...props} route={{ params: { funcLogar } }} />} />
    <Drawer.Screen name="Treino" component={Training} />
    <Drawer.Screen name="Configurações" component={Settings} />
    <Drawer.Screen name="Sobre Mim" component={About} />
  </Drawer.Navigator>
);

const App = () => {
  const [estaLogado, setLogado] = useState(false);

  return (
    <NavigationContainer>
      {estaLogado ? (
        <DrawerNav funcLogar={setLogado} />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} initialParams={{ funcLogar: setLogado }} />
          <Stack.Screen name="Registrar" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;