import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import Header from './Header';

import HomeTraining from './HomeTraining'; 
import OnlineConsulting from './OnlineConsulting';
import PhysicalAssessment from './PhysicalAssessment';
import Student from './Student';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation }) => <Header navigation={navigation} />, // Usa o Header em todas as telas
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Student" component={Student} options={{ title: 'Alunos' }} />
        <Drawer.Screen name="PhysicalAssessment" component={PhysicalAssessment} options={{ title: 'Avaliação Física' }} />
        <Drawer.Screen name="OnlineConsulting" component={OnlineConsulting} options={{ title: 'Consulta Online' }} />
        <Drawer.Screen name="HomeTraining" component={HomeTraining} options={{ title: 'Treino em Casa' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
