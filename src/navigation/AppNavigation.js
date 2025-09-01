import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import SplashScreen from "../screens/SplashScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import NotificationsScreen from "../screens/NotificationsScreen.js";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabContainer}>
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.tabBar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIconName = () => {
            switch (route.name) {
              case 'HomeTab':
                return isFocused ? 'home' : 'home-outline';
              case 'ProfileTab':
                return isFocused ? 'person' : 'person-outline';
              case 'NotificationsTab':
                return isFocused ? 'notifications' : 'notifications-outline';
              case 'SettingsTab':
                return isFocused ? 'settings' : 'settings-outline';
              default:
                return 'circle';
            }
          };

          const getLabel = () => {
            switch (route.name) {
              case 'HomeTab':
                return 'Inicio';
              case 'ProfileTab':
                return 'Perfil';
              case 'NotificationsTab':
                return 'Alertas';
              case 'SettingsTab':
                return 'Ajustes';
              default:
                return label;
            }
          };

          return (
            <View key={index} style={styles.tabItem}>
              {isFocused && (
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.activeTabBackground}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
              )}
              <View
                style={[
                  styles.tabButton,
                  isFocused && styles.activeTab,
                ]}
              >
                <Ionicons
                  name={getIconName()}
                  size={24}
                  color={isFocused ? '#ffffff' : '#999999'}
                  onPress={onPress}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused && styles.activeTabLabel,
                  ]}
                  onPress={onPress}
                >
                  {getLabel()}
                </Text>
              </View>
            </View>
          );
        })}
      </LinearGradient>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{ title: "Inicio" }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
      <Tab.Screen 
        name="NotificationsTab" 
        component={NotificationsScreen}
        options={{ title: "Notificaciones" }}
      />
      <Tab.Screen 
        name="SettingsTab" 
        component={SettingsScreen}
        options={{ title: "Configuración" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setTimeout(() => setLoading(false), 2000); // Splash 2s
    });
    return unsubscribe;
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen} 
              options={{ 
                title: "Editar Perfil",
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#667eea',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} 
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeTabBackground: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  activeTab: {
    // Estilos adicionales para tab activo si es necesario
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
