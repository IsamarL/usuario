import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, setDoc, doc, query } from "firebase/firestore";
import { db } from "../BaseDatos/Firebase";  // Asegúrate que esta ruta esté bien
import Navigation from "../Navigation";

export default function ListarCliente({ navigation }) {
    const [clientes, setClientes] = useState([{nombre:"summer"}]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
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

    const eliminarCliente = (index) => {
        setClientes(clientes.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            {/* Botón para registrar nuevo cliente */}
            <TouchableOpacity onPress={() => navigation.navigate("GuardarCliente")}>
                <View style={styles.icino}>
                    <Entypo name="add-user" size={30} color="#2980b9" />
                </View>
            </TouchableOpacity>

            <Text style={styles.titulo}>Lista de Clientes</Text>

            {clientes.length === 0 ? (
                <Text style={styles.alert}>No hay registro...❗😥😥😥❗</Text>
            ) : (
                <FlatList
                    data={clientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.Datos}>
                            <TouchableOpacity
                                onPress={() =>
                                    Alert.alert(
                                        "⚠ Confirmar eliminación ⚠",
                                        "¿Estás seguro de que deseas eliminar este cliente?",
                                        [
                                            { text: "Cancelar ❌", style: "cancel" },
                                            { text: "Eliminar ✔", onPress: () => eliminarCliente(index) }
                                        ],
                                        { cancelable: true }
                                    )
                                }
                            >
                                <Ionicons name="trash-bin-sharp" size={30} color="red" style={styles.basura} />
                            </TouchableOpacity>

                            <Text>Cédula: {item.cedula}</Text>
                            <Text>Nombre: {item.nombre}</Text>
                            <Text>Apellidos: {item.apellidos}</Text>
                            <Text>Fecha Nacimiento: {item.fechaNacimiento}</Text>
                            <Text>Sexo: {item.sexo}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#d6eaf8",
    },
    icino: {
        marginTop: 1,
        marginLeft: 300,
        borderRadius: 10,
        borderWidth: 4,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#2980b9",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3498db",
        marginBottom: 10,
        textAlign: "center",
    },
    Datos: {
        backgroundColor: "#85c1e9",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    basura: {
        marginLeft: 300,
    },
    alert: {
        color: "#3498db",
        fontSize: 25,
    }
});
