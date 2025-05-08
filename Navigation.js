import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importa las pantallas
import RegistroScreen from './screens/RegistroScreen';
import ListarScreen from './screens/ListarScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registro">
        <Stack.Screen name="Registro" component={RegistroScreen} />
        <Stack.Screen name="Listar" component={ListarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
