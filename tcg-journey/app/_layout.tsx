import { Stack } from "expo-router";
import { StorageProvider } from "./context/StorageContext";

export default function RootLayout() {
  return (
    <StorageProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
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