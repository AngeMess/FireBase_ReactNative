import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../config/firebase";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const SettingItem = ({ icon, title, subtitle, type = "arrow", value, onValueChange, color = "#667eea" }) => (
    <View style={styles.settingItem}>
      <View style={[styles.settingIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {type === "switch" ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#e0e0e0", true: color + "40" }}
          thumbColor={value ? color : "#f4f3f4"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </View>
  );

  const SectionHeader = ({ title, icon }) => (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color="#667eea" />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const showComingSoon = () => {
    Alert.alert("Próximamente", "Esta función estará disponible en futuras actualizaciones.");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <View style={styles.content}>
        {/* Sección General */}
        <SectionHeader title="General" icon="settings-outline" />
        <View style={styles.section}>
          <SettingItem
            icon="notifications-outline"
            title="Notificaciones"
            subtitle="Recibe alertas importantes"
            type="switch"
            value={notifications}
            onValueChange={setNotifications}
            color="#667eea"
          />
          <SettingItem
            icon="moon-outline"
            title="Modo Oscuro"
            subtitle="Cambia la apariencia de la app"
            type="switch"
            value={darkMode}
            onValueChange={setDarkMode}
            color="#764ba2"
          />
          <SettingItem
            icon="sync-outline"
            title="Sincronización Automática"
            subtitle="Mantén tus datos actualizados"
            type="switch"
            value={autoSync}
            onValueChange={setAutoSync}
            color="#4ecdc4"
          />
        </View>

        {/* Sección Seguridad */}
        <SectionHeader title="Seguridad" icon="shield-checkmark-outline" />
        <View style={styles.section}>
          <SettingItem
            icon="finger-print-outline"
            title="Autenticación Biométrica"
            subtitle="Usa huella o Face ID"
            type="switch"
            value={biometrics}
            onValueChange={setBiometrics}
            color="#f093fb"
          />
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="key-outline"
              title="Cambiar Contraseña"
              subtitle="Actualiza tu contraseña"
              color="#ffa726"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="lock-closed-outline"
              title="Verificación en Dos Pasos"
              subtitle="Mayor seguridad para tu cuenta"
              color="#ff7043"
            />
          </TouchableOpacity>
        </View>

        {/* Sección Privacidad */}
        <SectionHeader title="Privacidad" icon="eye-outline" />
        <View style={styles.section}>
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="document-text-outline"
              title="Política de Privacidad"
              subtitle="Lee nuestros términos"
              color="#66bb6a"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="trash-outline"
              title="Eliminar Datos"
              subtitle="Borra toda tu información"
              color="#ff5252"
            />
          </TouchableOpacity>
        </View>

        {/* Sección Soporte */}
        <SectionHeader title="Soporte" icon="help-circle-outline" />
        <View style={styles.section}>
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="chatbubble-outline"
              title="Contactar Soporte"
              subtitle="¿Necesitas ayuda?"
              color="#667eea"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="star-outline"
              title="Calificar App"
              subtitle="Comparte tu opinión"
              color="#ffa726"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showComingSoon}>
            <SettingItem
              icon="information-circle-outline"
              title="Acerca de"
              subtitle="Versión 1.0.0"
              color="#4ecdc4"
            />
          </TouchableOpacity>
        </View>

        {/* Sección Peligrosa */}
        <View style={styles.dangerSection}>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={() => {
              Alert.alert(
                "Cerrar Sesión",
                "¿Estás seguro de que quieres cerrar sesión?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Cerrar Sesión", style: "destructive", onPress: () => auth.signOut() }
                ]
              );
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#ff5252" />
            <Text style={styles.dangerButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  dangerSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ff5252",
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff5252",
    marginLeft: 8,
  },
});
