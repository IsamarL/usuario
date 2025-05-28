import { useState, useEffect } from "react";
import { View, TextInput, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../BaseDatos/Firebase";

export default function GuardarCliente() {
  const navigation = useNavigation();
  const route = useRoute();
  const clienteExistente = route.params?.cliente;

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");

  useEffect(() => {
    if (clienteExistente) {
      setCedula(clienteExistente.cedula || "");
      setNombre(clienteExistente.nombre || "");
      setApellidos(clienteExistente.apellidos || "");
      setFechaNacimiento(clienteExistente.fechaNacimiento || "");
      setSexo(clienteExistente.sexo || "");
    }
  }, [clienteExistente]);

  const guardarNuevo = async () => {
    if (!cedula || !nombre || !apellidos || !fechaNacimiento || !sexo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const clienteData = {
        cedula,
        nombre,
        apellidos,
        fechaNacimiento,
        sexo,
      };

      await setDoc(doc(db, "clientes", cedula), clienteData);
      Alert.alert("Éxito", clienteExistente ? "Cliente actualizado" : "Cliente guardado");
      navigation.goBack();
    } catch (error) {
      console.error("Error guardando cliente:", error);
      Alert.alert("Error", "No se pudo guardar el cliente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cédula:</Text>
      <TextInput style={styles.input} value={cedula} onChangeText={setCedula} />

      <Text style={styles.label}>Nombre:</Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

      <Text style={styles.label}>Apellidos:</Text>
      <TextInput style={styles.input} value={apellidos} onChangeText={setApellidos} />

      <Text style={styles.label}>Fecha de Nacimiento:</Text>
      <TextInput style={styles.input} value={fechaNacimiento} onChangeText={setFechaNacimiento} />

      <Text style={styles.label}>Sexo:</Text>
      <TextInput style={styles.input} value={sexo} onChangeText={setSexo} />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarNuevo}>
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.textoBoton}>{clienteExistente ? "Actualizar" : "Guardar"}</Text>
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
