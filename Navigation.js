import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ListarClientes from './Screens/ListarClientes';
import GuardarCliente from './Screens/GuardarCliente'; 
const Stack = createStackNavigator();

function StackMenu() {
  return (
    <Stack.Navigator initialRouteName="ListarClientes">
      <Stack.Screen 
        name="ListarClientes" 
        component={ListarClientes} 
        options={{ title: 'Lista de Clientes' }} 
      />
      <Stack.Screen 
        name="GuardarCliente" 
        component={GuardarCliente} 
        options={{ title: 'Agregar Cliente' }} 
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackMenu />
    </NavigationContainer>
  );
}
