import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi App - Splash Screen</Text>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
});
