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

const HomeStack = ({ navigation, route }) => (
  <>
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        initialParams={{ funcLogar: route.params?.funcLogar }} 
        options={{
          header: () => (
            <Header 
              navigation={navigation} 
              onToggleTheme={() => {}} 
              isHighContrast={false} 
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
              onToggleTheme={() => {}} 
              isHighContrast={false}
            />
          ),
        }}
      />
    </Stack.Navigator>
  </>
);

const SettingsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Configurações" 
      component={Settings} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={() => {}} 
            isHighContrast={false} 
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const TrainingStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Treino" 
      component={Training} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={() => {}} 
            isHighContrast={false}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const AboutStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Sobre Mim" 
      component={About} 
      options={{
        header: () => (
          <Header 
            navigation={navigation} 
            onToggleTheme={() => {}} 
            isHighContrast={false}
          />
        ),
      }}
    />
  </Stack.Navigator>
);

const DrawerNav = ({ funcLogar }) => (
  <Drawer.Navigator>
    <Drawer.Screen 
      name="Home" 
      component={(props) => <HomeStack {...props} route={{ params: { funcLogar } }} />} 
      options={{ headerShown: false }} 
    />
    <Drawer.Screen 
      name="Treino" 
      component={TrainingStack}  
      options={{ headerShown: false }} 
    />
    <Drawer.Screen 
      name="Configurações" 
      component={SettingsStack}  
      options={{ headerShown: false }}  
    />
    <Drawer.Screen 
      name="Sobre Mim" 
      component={AboutStack}  
      options={{ headerShown: false }} 
    />
  </Drawer.Navigator>
);

const App = () => {
  const [estaLogado, setLogado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {estaLogado ? (
        <DrawerNav funcLogar={setLogado} />
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