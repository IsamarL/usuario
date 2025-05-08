import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ListarScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla de Listar Usuarios</Text>

      <Button
        title="Volver al Registro"
        onPress={() => navigation.navigate('Registro')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});