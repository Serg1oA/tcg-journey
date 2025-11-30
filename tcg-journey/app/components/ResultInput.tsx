import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStorage } from '../context/StorageContext';
import { Picker } from '@react-native-picker/picker';

interface ResultInputProps {
  game: 'pokemon' | 'lorcana' | 'gwent';
  gameColor: string;
}

export default function ResultInput({ game, gameColor }: ResultInputProps) {
  const router = useRouter();
  const { decks, players, addResult } = useStorage();
  const [player1, setPlayer1] = useState('');
  const [player1Deck, setPlayer1Deck] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player2Deck, setPlayer2Deck] = useState('');
  const [winner, setWinner] = useState('');

  const gameDecks = decks.filter(d => d.game === game);

  const handleSubmit = () => {
    if (!player1 || !player1Deck || !player2 || !player2Deck || !winner) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    if (player1 === player2) {
      Alert.alert('Invalid Selection', 'Please select different players');
      return;
    }

    if (player1Deck === player2Deck) {
      Alert.alert('Invalid Selection', 'Please select different decks');
      return;
    }

    if (winner !== player1 && winner !== player2) {
      Alert.alert('Invalid Selection', 'Winner must be Player 1 or Player 2');
      return;
    }

    addResult({
      game,
      player1,
      player1Deck,
      player2,
      player2Deck,
      winner
    });

    Alert.alert('Success', 'Result added to history', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleReset = () => {
    setPlayer1('');
    setPlayer1Deck('');
    setPlayer2('');
    setPlayer2Deck('');
    setWinner('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {gameDecks.length === 0 ? (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Oops... No decks available</Text>
            <Text style={styles.warningSubtext}>Please add decks first</Text>
          </View>
        ) : players.length === 0 ? (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>Oops... No players available</Text>
            <Text style={styles.warningSubtext}>Please add players first</Text>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Player 1</Text>
              <View style={[styles.pickerContainer, { borderColor: gameColor }]}>
                <Picker
                  selectedValue={player1}
                  onValueChange={setPlayer1}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Select Player 1" value="" />
                  {players.map(player => (
                    <Picker.Item key={player.id} label={player.name} value={player.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Player 1 Deck</Text>
              <View style={[styles.pickerContainer, { borderColor: gameColor }]}>
                <Picker
                  selectedValue={player1Deck}
                  onValueChange={setPlayer1Deck}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Select Player 1 Deck" value="" />
                  {gameDecks.map(deck => (
                    <Picker.Item key={deck.id} label={deck.name} value={deck.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Player 2</Text>
              <View style={[styles.pickerContainer, { borderColor: gameColor }]}>
                <Picker
                  selectedValue={player2}
                  onValueChange={setPlayer2}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Select Player 2" value="" />
                  {players.map(player => (
                    <Picker.Item key={player.id} label={player.name} value={player.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Player 2 Deck</Text>
              <View style={[styles.pickerContainer, { borderColor: gameColor }]}>
                <Picker
                  selectedValue={player2Deck}
                  onValueChange={setPlayer2Deck}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Select Player 2 Deck" value="" />
                  {gameDecks.map(deck => (
                    <Picker.Item key={deck.id} label={deck.name} value={deck.id} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Winner</Text>
              <View style={[styles.pickerContainer, { borderColor: gameColor }]}>
                <Picker
                  selectedValue={winner}
                  onValueChange={setWinner}
                  style={styles.picker}
                  dropdownIconColor="white"
                >
                  <Picker.Item label="Select Winner" value="" />
                  {player1 && <Picker.Item label={players.find(p => p.id === player1)?.name || 'Player 1'} value={player1} />}
                  {player2 && <Picker.Item label={players.find(p => p.id === player2)?.name || 'Player 2'} value={player2} />}
                </Picker>
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={handleReset}
                style={styles.resetButton}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.submitButton, { borderColor: gameColor }]}
              >
                <Text style={styles.submitButtonText}>Save Result</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
  warningBox: {
    backgroundColor: '#1A1A1A',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    borderWidth: 2,
    borderColor: 'lightsalmon'
  },
  warningText: {
    color: 'salmon',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  warningSubtext: {
    color: '#888',
    fontSize: 14
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  pickerContainer: {
    backgroundColor: '#000',
    borderWidth: 2,
    overflow: 'hidden'
  },
  picker: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444'
  },
  resetButtonText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold'
  },
  submitButton: {
    flex: 2,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 2
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});