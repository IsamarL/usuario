import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
// Al principio del archivo:
import { collection, addDoc } from "firebase/firestore";
import { db } from "../BaseDatos/Firebase";    // <-- esta ruta es crucial


export default function GuardarCliente() {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const navigation = useNavigation();

  const guardarNuevo = async () => {
    if (
      !cedula.trim() ||
      !nombre.trim() ||
      !apellidos.trim() ||
      !fechaNacimiento.trim() ||
      !sexo.trim()
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      await addDoc(collection(db, "clientes"), {
        cedula,
        nombre,
        apellidos,
        fechaNacimiento,
        sexo,
      });
      Alert.alert("Éxito", "Cliente guardado correctamente");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el cliente");
      console.error("Error guardando cliente:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cédula:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 603-092464-1000M"
        value={cedula}
        onChangeText={setCedula}
      />

      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Apellidos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />

      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <TextInput
        style={styles.input}
        placeholder="AAAA-MM-DD"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />

      <Text style={styles.label}>Sexo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Masculino / Femenino"
        value={sexo}
        onChangeText={setSexo}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarNuevo}>
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.textoBoton}> Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, marginBottom: 10, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
  },
  botonGuardar: {
    backgroundColor: "#2196f3",
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
