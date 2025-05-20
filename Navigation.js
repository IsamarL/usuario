import { createStackNavigator } from '@react-navigation/stack';
import ListarProductos from './Screens/ListarProducto'
import AgregarProducto from './Screens/AgregarProducto'

const Stack = createStackNavigator();

export default function Navegacion() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListarProductos" component={ListarProductos} options={{ title: 'Lista de Productos' }} />
      <Stack.Screen name="AgregarProducto" component={AgregarProducto} options={{ title: 'Agregar Producto' }} />
    </Stack.Navigator>
  );
}