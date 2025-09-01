import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { auth } from "../config/firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function EditProfileScreen({ navigation }) {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [specialty, setSpecialty] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");

      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Datos usuario Firestore:", data);
          setAge(data.age || "");
          setSpecialty(data.specialty || "");
        } else {
          console.log("No existe documento para usuario:", user.uid);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const saveProfile = async () => {
    try {
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }

      if (password.length > 0 && password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }

      if (password.length >= 6) {
        await updatePassword(user, password);
      }

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { age, specialty }, { merge: true });

      alert("Perfil actualizado con éxito");
      navigation.goBack();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Error al actualizar perfil: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        editable={false}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Contraseña (mínimo 6 caracteres)</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Dejar vacío para no cambiar"
      />

      <Text style={styles.label}>Edad</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Especialidad</Text>
      <TextInput
        style={styles.input}
        value={specialty}
        onChangeText={setSpecialty}
      />

      <Button title="Guardar cambios" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
});
