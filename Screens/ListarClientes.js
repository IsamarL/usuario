import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../BaseDatos/Firebase";
import Navigation from "../Navigation";

export default function ListarCliente({ navigation }) {
  const [clientes, setClientes] = useState([]);

  const [busquedaCedula, setBusquedaCedula] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      LeerDatos();
    });

    return unsubscribe;
  }, [Navigation]);

  const LeerDatos = async () => {
    try {
      const q = query(collection(db, "clientes"));
      const querySnapshot = await getDocs(q);
      const d = [];
      querySnapshot.forEach((doc) => {
        d.push(doc.data());
      });
      setClientes(d);
    } catch (error) {
      console.error("Error leyendo datos:", error);
    }
  };

  const eliminarCliente = async (cedula) => {
    try {
      await deleteDoc(doc(db, "clientes", cedula));
      Alert.alert("Éxito", "Cliente eliminado correctamente");
      LeerDatos();
    } catch (error) {
      console.error("Error eliminando cliente:", error);
      Alert.alert("Error", "No se pudo eliminar el cliente");
    }
  };

  const filtrarPorCedula = (texto) => {
    setBusquedaCedula(texto);
    if (texto === "") {
      setClientesFiltrados(clientes);
    } else {
      const resultado = clientes.filter((cliente) =>
        cliente.cedula.toLowerCase().includes(texto.toLowerCase())
      );
      setClientesFiltrados(resultado);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Clientes</Text>

      <TextInput
        placeholder="Buscar por cédula"
        style={styles.input}
        value={busquedaCedula}
        onChangeText={filtrarPorCedula}
      />

      {clientes.length === 0 ? (
        <Text style={styles.alert}>No hay registro...❗😥😥😥❗</Text>
      ) : (
        <FlatList
          data={clientesFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.Datos}>
              <View style={styles.botones}>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "⚠ Confirmar eliminación ⚠",
                      "¿Estás seguro de que deseas eliminar este cliente?",
                      [
                        { text: "Cancelar ❌", style: "cancel" },
                        {
                          text: "Eliminar ✔",
                          onPress: () => eliminarCliente(item.cedula),
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <Entypo name="remove-user" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("GuardarCliente", { cliente: item })
                  }
                  style={{ marginRight: 10 }}
                >
                  <Entypo name="pencil" size={24} color="blue" />
                </TouchableOpacity>
              </View>

              <Text>Cédula: {item.cedula}</Text>
              <Text>Nombre: {item.nombre}</Text>
              <Text>Apellidos: {item.apellidos}</Text>
              <Text>Fecha Nacimiento: {item.fechaNacimiento}</Text>
              <Text>Sexo: {item.sexo}</Text>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("GuardarCliente")}
        style={styles.agregar}
      >
        <Entypo name="add-user" size={30} color="#2980b9" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    textAlign: "center",
  },
  Datos: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  alert: {
    color: "#7f8c8d",
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  agregar: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
