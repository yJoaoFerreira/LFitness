import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './Header';
import Home from './Home';
import HomeTraining from './HomeTraining'; 
import OnlineConsulting from './OnlineConsulting';
import PhysicalAssessment from './PhysicalAssessment';
import Student from './Student';
import Login from './Login';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  const toggleTheme = () => {
    setIsHighContrast(!isHighContrast);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation }) => (
            <Header
              navigation={navigation}
              onToggleTheme={toggleTheme}
              isHighContrast={isHighContrast}
            />
          ),
        }}
      >
        <Drawer.Screen name="Home">
          {() => <Home isHighContrast={isHighContrast} />}
        </Drawer.Screen>
        <Drawer.Screen name="Aluno">
          {() => <Student isHighContrast={isHighContrast} />}
        </Drawer.Screen>
        <Drawer.Screen name="Avaliação Física">
          {() => <PhysicalAssessment isHighContrast={isHighContrast} />}
        </Drawer.Screen>
        <Drawer.Screen name="Consultoria Online">
          {() => <OnlineConsulting isHighContrast={isHighContrast} />}
        </Drawer.Screen>
        <Drawer.Screen name="Treino em Casa">
          {() => <HomeTraining isHighContrast={isHighContrast} />}
        </Drawer.Screen>
        <Drawer.Screen name="Login">
          {() => <Login isHighContrast={isHighContrast} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}