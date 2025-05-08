import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function RegistroScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [sexo, setSexo] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const guardarUsuario = () => {
    const nuevoUsuario = {
      cedula,
      nombres,
      apellidos,
      fechaNacimiento,
      sexo
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    Alert.alert("Usuario registrado");

    // Limpiar campos
    
    setCedula('');
    setNombres('');
    setApellidos('');
    setFechaNacimiento('');
    setSexo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulario de Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        value={nombres}
        onChangeText={setNombres}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento (dd/mm/aaaa)"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />

      <Picker
        selectedValue={sexo}
        onValueChange={(itemValue) => setSexo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione sexo" value="" />
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
        <Picker.Item label="Otro" value="Otro" />
      </Picker>

      <Button title="Registrar" onPress={guardarUsuario} />

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Button
          title="Ir a Listar Usuarios"
          onPress={() => navigation.navigate('Listar')}
        />
        <Ionicons name="list" size={30} color="blue" style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  picker: {
    height: 50,
    marginVertical: 10
  }
});