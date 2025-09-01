import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Entrar" onPress={login} />
      <Text onPress={() => navigation.navigate("Register")} style={styles.link}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});
