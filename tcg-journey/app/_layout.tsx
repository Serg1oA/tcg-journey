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
        <Stack.Screen name="index" options={{ headerTitle: "TCG Journey" }} />
        <Stack.Screen name="pokemon/index" options={{ headerTitle: "Pokémon TCG" }} />
        <Stack.Screen name="lorcana/index" options={{ headerTitle: "Lorcana" }} />
        <Stack.Screen name="gwent/index" options={{ headerTitle: "Gwent" }} />

        <Stack.Screen name="pokemon/clock" options={{ headerTitle: "Pokémon TCG | Clocks" }} />
        <Stack.Screen name="pokemon/clocksingle" options={{ headerTitle: "Pokémon TCG | Single Clock" }} />
        <Stack.Screen name="pokemon/clockstopwatch" options={{ headerTitle: "Pokémon TCG | Stopwatch" }} />
        <Stack.Screen name="pokemon/clocktwoplayer" options={{ headerTitle: "Pokémon TCG | 2-Player Clock" }} />
        <Stack.Screen name="pokemon/decks" options={{ headerTitle: "Pokémon TCG | Decks" }} />
        <Stack.Screen name="pokemon/history" options={{ headerTitle: "Pokémon TCG | History" }} />
        <Stack.Screen name="pokemon/players" options={{ headerTitle: "All Players" }} />
        <Stack.Screen name="pokemon/result" options={{ headerTitle: "Pokémon TCG | Result Input" }} />
        
        <Stack.Screen name="lorcana/clock" options={{ headerTitle: "Lorcana | Clocks" }} />
        <Stack.Screen name="lorcana/clocksingle" options={{ headerTitle: "Lorcana | Single Clock" }} />
        <Stack.Screen name="lorcana/clockstopwatch" options={{ headerTitle: "Lorcana | Stopwatch" }} />
        <Stack.Screen name="lorcana/clocktwoplayer" options={{ headerTitle: "Lorcana | 2-Player Clock" }} />
        <Stack.Screen name="lorcana/decks" options={{ headerTitle: "Lorcana | Decks" }} />
        <Stack.Screen name="lorcana/history" options={{ headerTitle: "Lorcana | History" }} />
        <Stack.Screen name="lorcana/lore" options={{ headerTitle: "Lorcana | Lore Counter" }} />
        <Stack.Screen name="lorcana/players" options={{ headerTitle: "All Players" }} />
        <Stack.Screen name="lorcana/result" options={{ headerTitle: "Lorcana | Result Input" }} />

        <Stack.Screen name="gwent/clock" options={{ headerTitle: "Gwent | Clocks" }} />
        <Stack.Screen name="gwent/clocksingle" options={{ headerTitle: "Gwent | Single Clock" }} />
        <Stack.Screen name="gwent/clockstopwatch" options={{ headerTitle: "Gwent | Stopwatch" }} />
        <Stack.Screen name="gwent/clocktwoplayer" options={{ headerTitle: "Gwent | 2-Player Clock" }} />
        <Stack.Screen name="gwent/decks" options={{ headerTitle: "Gwent | Decks" }} />
        <Stack.Screen name="gwent/history" options={{ headerTitle: "Gwent | History" }} />
        <Stack.Screen name="gwent/players" options={{ headerTitle: "All Players" }} />
        <Stack.Screen name="gwent/result" options={{ headerTitle: "Gwent | Result Input" }} />
        <Stack.Screen name="gwent/strength" options={{ headerTitle: "Gwent | Strength Counter" }} />
      </Stack>
    </StorageProvider>
  );
}