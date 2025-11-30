import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Href } from "expo-router";
import ClockIcon from '../../assets/icons/clock.svg';
import CardsIcon from '../../assets/icons/cards.svg';
import PeopleIcon from '../../assets/icons/people.svg';
import StarIcon from '../../assets/icons/star.svg';
import PencilIcon from '../../assets/icons/pencil.svg';
import ScrollIcon from '../../assets/icons/scroll.svg';

const GAME_COLOR = 'pink';

export default function LorcanaToolkit() {
  const router = useRouter();

  const tools = [
    { id: 'clock', name: 'Clock', Icon: ClockIcon, route: '/lorcana/clock' as Href },
    { id: 'decks', name: 'Decks', Icon: CardsIcon, route: '/lorcana/decks' as Href },
    { id: 'players', name: 'Players', Icon: PeopleIcon, route: '/lorcana/players' as Href },
    { id: 'lore', name: 'Lore Counter', Icon: StarIcon, route: '/lorcana/lore' as Href },
    { id: 'result', name: 'Result Input', Icon: PencilIcon, route: '/lorcana/result' as Href },
    { id: 'history', name: 'History', Icon: ScrollIcon, route: '/lorcana/history' as Href }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {tools.map(tool => (
          <TouchableOpacity
            key={tool.id}
            onPress={() => router.push(tool.route)}
            style={[
              styles.toolButton,
              { borderColor: GAME_COLOR }
            ]}
          >
            <tool.Icon width={32} height={32} stroke="#fff" />
            <Text style={styles.toolText}>{tool.name}</Text>
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
  toolButton: {
    backgroundColor: '#000',
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    gap: 16
  },
  toolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  }
});