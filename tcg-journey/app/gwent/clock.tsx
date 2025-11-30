import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter, Href } from "expo-router";

const GAME_COLOR = 'lightsalmon';

export default function GwentClockSelection() {
  const router = useRouter();

  const clockTypes = [
    { 
      id: 'two-player', 
      name: '2-Player Clock', 
      description: 'Alternating player timers',
      route: '/gwent/clocktwoplayer' as Href
    },
    { 
      id: 'single', 
      name: 'Single Clock', 
      description: 'Game time limit',
      route: '/gwent/clocksingle' as Href
    },
    { 
      id: 'stopwatch', 
      name: 'Stopwatch', 
      description: 'Count up timer',
      route: '/gwent/clockstopwatch' as Href
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {clockTypes.map(clock => (
          <TouchableOpacity
            key={clock.id}
            onPress={() => router.push(clock.route)}
            style={[styles.clockButton, { borderColor: GAME_COLOR }]}
          >
            <View>
              <Text style={styles.clockName}>{clock.name}</Text>
              <Text style={styles.clockDescription}>{clock.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  scrollViewContent: {
    padding: 20
  },
  clockButton: {
    backgroundColor: '#000',
    padding: 20,
    marginBottom: 16,
    borderWidth: 2
  },
  clockName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 6
  },
  clockDescription: {
    fontSize: 14,
    color: '#888'
  }
});