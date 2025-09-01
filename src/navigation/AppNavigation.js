import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

import SplashScreen from "../screens/SplashScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

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
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Editar Perfil" }} />
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
