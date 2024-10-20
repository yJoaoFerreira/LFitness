import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from './screens/Login';
import Register from './screens/Register';
import ChangePassword from './screens/ChangePassword';
import Training from './screens/Training';
import Settings from './screens/Settings';
import About from './screens/About';
import Student from './screens/Student';
import Home from './screens/Home';
import Header from './components/Header';
import Loading from './components/Loading';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation, route, isHighContrast, onToggleTheme }) => (
  

  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={Home} 
      initialParams={{ funcLogar: route.params?.funcLogar }} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={onToggleTheme} 
            isHighContrast={isHighContrast} 
          />
        ),
      }}
    />
    <Stack.Screen 
      name="Aluno" 
      component={Student} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={onToggleTheme} 
            isHighContrast={isHighContrast}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const SettingsStack = ({ navigation, isHighContrast, onToggleTheme }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Configurações" 
      component={Settings} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={onToggleTheme} 
            isHighContrast={isHighContrast} 
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const TrainingStack = ({ navigation, isHighContrast, onToggleTheme }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Treino" 
      component={Training} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={onToggleTheme} 
            isHighContrast={isHighContrast}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const AboutStack = ({ navigation, isHighContrast, onToggleTheme }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Sobre Mim" 
      component={About} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={onToggleTheme} 
            isHighContrast={isHighContrast}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const DrawerNav = ({ funcLogar, isHighContrast, onToggleTheme }) => (
  <Drawer.Navigator>
    <Drawer.Screen 
      name="Home" 
      component={(props) => <HomeStack {...props} route={{ params: { funcLogar } }} isHighContrast={isHighContrast} onToggleTheme={onToggleTheme} />} 
      options={{ headerShown: false }} 
    />
    <Drawer.Screen 
      name="Treino" 
      component={(props) => <TrainingStack {...props} isHighContrast={isHighContrast} onToggleTheme={onToggleTheme} />}  
      options={{ headerShown: false }} 
    />
    <Drawer.Screen 
      name="Configurações" 
      component={(props) => <SettingsStack {...props} isHighContrast={isHighContrast} onToggleTheme={onToggleTheme} />}  
      options={{ headerShown: false }}  
    />
    <Drawer.Screen 
      name="Sobre Mim" 
      component={(props) => <AboutStack {...props} isHighContrast={isHighContrast} onToggleTheme={onToggleTheme} />}  
      options={{ headerShown: false }} 
    />
  </Drawer.Navigator>
);

const App = () => {
  const [estaLogado, setLogado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const onToggleTheme = () => {
    setIsHighContrast(prevState => !prevState);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {estaLogado ? (
        <DrawerNav funcLogar={setLogado} isHighContrast={isHighContrast} onToggleTheme={onToggleTheme} />
      ) : (
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login} 
            initialParams={{ funcLogar: setLogado }} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
            name="Registrar" 
            component={Register} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
            name="TrocarSenha" 
            component={ChangePassword} 
            options={{ headerShown: false }}  
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;