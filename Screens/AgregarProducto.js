import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AgregarProducto() {
  const [nombre, setNombre] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const guardarNuevo = () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    const nuevoCliente = { nombre };
    route.params.agregarNuevo(nuevoCliente);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del producto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Laptop, Celular, etc."
        value={nombre}
        onChangeText={setNombre}
      />
      <TouchableOpacity style={styles.botonGuardar} onPress={guardarNuevo}>
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.textoBoton}> Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 10, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20
  },
  botonGuardar: {
    backgroundColor: '#2196f3',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10
  }
});