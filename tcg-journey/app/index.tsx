import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, Href } from "expo-router";

export default function Index() {
  const router = useRouter();

  const games = [
    { id: 'pokemon', name: 'Pokémon TCG', color: 'lightskyblue', route: '/pokemon' as Href },
    { id: 'lorcana', name: 'Lorcana', color: 'pink', route: '/lorcana' as Href },
    { id: 'gwent', name: 'Gwent', color: 'lightsalmon', route: '/gwent' as Href }
  ];

  return (
    <View style={styles.container}>
      {games.map(game => (
        <TouchableOpacity
          key={game.id}
          onPress={() => router.push(game.route)}
          style={[
            styles.gameButton,
            { borderColor: game.color }
          ]}
        >
          <Text 
            style={styles.gameButtonText}
          >
            {game.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20
  },

  gameButton: {
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#000',
  },
  
  gameButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  }
});