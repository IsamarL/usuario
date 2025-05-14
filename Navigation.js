import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListarProductos from './Screens/ListarProductos';
import AgregarProducto from './Screen/AgregarProducto';

const Stack = createStackNavigator();

export default function Navegacion() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarProductos" component={ListarProductos} options={{ title: 'Lista de Productos' }} />
      <Stack.Screen name="AgregarProducto" component={AgregarProducto} options={{ title: 'Agregar Producto' }} />
    </Stack.Navigator>
  );
}