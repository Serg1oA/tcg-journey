import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { StorageProvider } from "./context/StorageContext";

export default function RootLayout() {
  useEffect(() => {
    // Hide Android navigation bar on mount
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("overlay-swipe");
    }
  }, []);

  return (
    <StorageProvider>
      <StatusBar hidden={true} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          statusBarHidden: true,
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerTitle: "TCG Journey" }}
        />
        <Stack.Screen name="pokemon/index" options={{ headerTitle: "Pokémon TCG" }} />
        <Stack.Screen name="lorcana/index" options={{ headerTitle: "Lorcana" }} />
        <Stack.Screen name="gwent/index" options={{ headerTitle: "Gwent" }} />
      </Stack>
    </StorageProvider>
  );
}