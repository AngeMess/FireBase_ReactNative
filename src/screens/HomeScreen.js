import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user?.displayName || "Usuario"}</Text>
      <Text>Email: {user?.email}</Text>

      {/* Botón para ir a la pantalla de editar perfil */}
      <Button
        title="Editar Perfil"
        onPress={() => navigation.navigate("EditProfile")}
      />

      {/* Botón para cerrar sesión */}
      <Button
        title="Cerrar sesión"
        onPress={() => signOut(auth)}
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});
