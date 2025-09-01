import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [specialty, setSpecialty] = useState("");

  const register = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario creado:", user);

      await updateProfile(user, { displayName: name });

      // Guardar edad y especialidad en Firestore, con merge para no borrar otros campos si existieran
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { age, specialty }, { merge: true });

      console.log("Perfil guardado:", { name, age, specialty });

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error en registro:", error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <TextInput placeholder="Edad" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Especialidad" value={specialty} onChangeText={setSpecialty} style={styles.input} />
      <Button title="Registrar" onPress={register} />
      <Text onPress={() => navigation.navigate("Login")} style={styles.link}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  link: { color: "blue", marginTop: 10, textAlign: "center" },
});
