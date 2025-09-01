import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen({ navigation }) {
  const [notifications] = useState([
    {
      id: 1,
      type: "welcome",
      title: "¡Bienvenido a FireBase App!",
      message: "Gracias por unirte a nuestra comunidad. Explora todas las funciones disponibles.",
      time: "2 min",
      read: false,
      icon: "rocket-outline",
      color: "#667eea",
    },
    {
      id: 2,
      type: "security",
      title: "Inicio de sesión exitoso",
      message: "Has iniciado sesión correctamente desde un nuevo dispositivo.",
      time: "1 hora",
      read: false,
      icon: "shield-checkmark-outline",
      color: "#4ecdc4",
    },
    {
      id: 3,
      type: "profile",
      title: "Perfil actualizado",
      message: "Tu información de perfil ha sido actualizada exitosamente.",
      time: "3 horas",
      read: true,
      icon: "person-outline",
      color: "#f093fb",
    },
    {
      id: 4,
      type: "system",
      title: "Nueva función disponible",
      message: "Descubre las nuevas opciones de personalización en configuración.",
      time: "1 día",
      read: true,
      icon: "sparkles-outline",
      color: "#ffa726",
    },
    {
      id: 5,
      type: "reminder",
      title: "Recordatorio de seguridad",
      message: "Considera activar la autenticación en dos pasos para mayor seguridad.",
      time: "2 días",
      read: true,
      icon: "lock-closed-outline",
      color: "#ff7043",
    },
  ]);

  const [filter, setFilter] = useState("all"); // all, unread, read

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  const FilterButton = ({ title, value, active }) => (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={() => setFilter(value)}
    >
      <Text style={[styles.filterButtonText, active && styles.filterButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const NotificationItem = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadItem]}>
      <View style={[styles.notificationIcon, { backgroundColor: item.color + "20" }]}>
        <Ionicons name={item.icon} size={24} color={item.color} />
        {!item.read && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filters}>
            <FilterButton
              title="Todas"
              value="all"
              active={filter === "all"}
            />
            <FilterButton
              title="No leídas"
              value="unread"
              active={filter === "unread"}
            />
            <FilterButton
              title="Leídas"
              value="read"
              active={filter === "read"}
            />
          </View>
        </ScrollView>
      </View>

      {/* Lista de notificaciones */}
      <View style={styles.content}>
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            renderItem={({ item }) => <NotificationItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="notifications-outline" size={64} color="#ccc" />
            </View>
            <Text style={styles.emptyTitle}>No hay notificaciones</Text>
            <Text style={styles.emptyMessage}>
              {filter === "unread" 
                ? "No tienes notificaciones sin leer"
                : filter === "read"
                ? "No hay notificaciones leídas"
                : "Aquí aparecerán tus notificaciones"
              }
            </Text>
          </View>
        )}
      </View>

      {/* Botón de acción flotante */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="checkmark-done" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
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
  settingsButton: {
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
  filtersContainer: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: "#667eea",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadItem: {
    borderLeftWidth: 4,
    borderLeftColor: "#667eea",
  },
  notificationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
  },
  unreadDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff5252",
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: "700",
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
