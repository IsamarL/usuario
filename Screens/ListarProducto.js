import React, { useState } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../BasedeDatos/Firebase'; // Asegúrate de que la ruta sea correcta


export default function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
  const probarConexion = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      console.log('✅ Conexión exitosa con Firebase. Documentos encontrados:');
      querySnapshot.forEach((doc) => {
        console.log(`🟢 ${doc.id}:`, doc.data());
      });
    } catch (error) {
      console.error('❌ Error al conectar con Firebase:', error);
    }
  };

  probarConexion();
}, []);


 const eliminarProducto = (index) => {
  const nuevosProductos = [...productos];

    nuevosProductos.splice(index, 1);
            
    setProductos(nuevosProductos);
 }

/*
  const eliminarProducto = (index) => {
    console.log("Eliminar producto en índice:", index);
    Alert.alert(
      "Confirmación",
      "¿Está seguro de que desea eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            const nuevosProductos = [...productos];
            nuevosProductos.splice(index, 1);
            
            setProductos(nuevosProductos);
          }
        }
      ]
    );
  };*/

  const agregarNuevo = (nuevoCliente) => {
    setProductos([...productos, nuevoCliente]);
  };

  const irAgregarProducto = () => {
    navigation.navigate("AgregarProducto", { agregarNuevo });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.textoVacio}>No hay productos registrados.</Text>}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.textoItem}>{item.nombre}</Text>
            <TouchableOpacity onPress={() => eliminarProducto(index)}>
              <Icon name="trash" size={24} color="#ff5252" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.botonAgregar} onPress={irAgregarProducto}>
        <Icon name="plus-circle" size={24} color="#fff" />
        <Text style={styles.textoBoton}> Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0f7fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  textoItem: {
    fontSize: 16,
    color: '#00796b'
  },
  botonAgregar: {
    marginTop: 20,
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  textoVacio: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20
  }
});