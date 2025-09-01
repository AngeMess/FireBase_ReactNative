import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../config/firebase";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const user = auth.currentUser;
  const [greeting, setGreeting] = useState("");
  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Buenos días";
      if (hour < 18) return "Buenas tardes";
      return "Buenas noches";
    };
    setGreeting(getGreeting());
  }, []);

  const QuickActionCard = ({ icon, title, subtitle, color, onPress, size = "normal" }) => {
    const cardWidth = size === "large" ? width - 40 : (width - 60) / 2;
    
    return (
      <TouchableOpacity
        style={[styles.quickActionCard, { width: cardWidth }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[color, color + "CC"]}
          style={[styles.cardGradient, { width: cardWidth }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardIcon}>
            <Ionicons name={icon} size={32} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const StatCard = ({ icon, value, label, color }) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const RecentActivityItem = ({ icon, title, time, color }) => (
    <View style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greetingText}>{greeting}</Text>
            <Text style={styles.userName}>{user?.displayName || "Usuario"}</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Estadísticas rápidas */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="time-outline"
          value="5 días"
          label="Activo"
          color="#667eea"
        />
        <StatCard
          icon="checkmark-circle-outline"
          value="12"
          label="Completadas"
          color="#4ecdc4"
        />
        <StatCard
          icon="trending-up-outline"
          value="85%"
          label="Progreso"
          color="#f093fb"
        />
      </View>

      {/* Acciones rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            icon="person-outline"
            title="Mi Perfil"
            subtitle="Ver y editar información"
            color="#667eea"
            onPress={() => navigation.navigate("Profile")}
          />
          <QuickActionCard
            icon="settings-outline"
            title="Configuración"
            subtitle="Ajustes de la app"
            color="#764ba2"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            icon="analytics-outline"
            title="Estadísticas"
            subtitle="Ver tu progreso"
            color="#4ecdc4"
            onPress={() => {}}
          />
          <QuickActionCard
            icon="help-circle-outline"
            title="Ayuda"
            subtitle="Soporte y FAQ"
            color="#ffa726"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Actividad reciente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        <View style={styles.activityContainer}>
          <RecentActivityItem
            icon="person-outline"
            title="Perfil actualizado"
            time="Hace 2 horas"
            color="#667eea"
          />
          <RecentActivityItem
            icon="shield-checkmark-outline"
            title="Inicio de sesión exitoso"
            time="Hace 5 horas"
            color="#4ecdc4"
          />
          <RecentActivityItem
            icon="settings-outline"
            title="Configuración modificada"
            time="Ayer"
            color="#f093fb"
          />
        </View>
      </View>

      {/* Explorar más */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explorar</Text>
        <QuickActionCard
          icon="compass-outline"
          title="Descubrir Nuevas Funciones"
          subtitle="Explora todo lo que puedes hacer"
          color="#ff7043"
          size="large"
          onPress={() => {}}
        />
      </View>

      {/* Espaciado inferior */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  notificationButton: {
    position: "relative",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff5252",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  quickActionCard: {
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardGradient: {
    padding: 20,
    minHeight: 120,
    justifyContent: "center",
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  activityContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#666",
  },
  bottomSpacing: {
    height: 100,
  },
});
