import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useStorage, GameResult } from '../context/StorageContext';
import { Picker } from '@react-native-picker/picker';

interface HistoryProps {
  game: 'pokemon' | 'lorcana' | 'gwent';
  gameColor: string;
}

export default function History({ game, gameColor }: HistoryProps) {
  const router = useRouter();
  const { results, decks, players, deleteResult, updateResult } = useStorage();
  const [editingResult, setEditingResult] = useState<GameResult | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPlayer1, setEditPlayer1] = useState('');
  const [editPlayer1Deck, setEditPlayer1Deck] = useState('');
  const [editPlayer2, setEditPlayer2] = useState('');
  const [editPlayer2Deck, setEditPlayer2Deck] = useState('');
  const [editWinner, setEditWinner] = useState('');

  const gameResults = results.filter(r => r.game === game);
  const gameDecks = decks.filter(d => d.game === game);

  const getDeckName = (deckId: string) => {
    const deck = decks.find(d => d.id === deckId);
    return deck ? deck.name : 'Unknown Deck';
  };

  const getPlayerName = (playerId: string) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Unknown Player';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteResult = (id: string) => {
    Alert.alert(
      'Delete Result',
      'Are you sure you want to delete this result?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteResult(id)
        }
      ]
    );
  };

  const openEditModal = (result: GameResult) => {
    setEditingResult(result);
    setEditPlayer1(result.player1);
    setEditPlayer1Deck(result.player1Deck);
    setEditPlayer2(result.player2);
    setEditPlayer2Deck(result.player2Deck);
    setEditWinner(result.winner);
    setShowEditModal(true);
  };

  const handleEditResult = () => {
    if (!editingResult || !editPlayer1 || !editPlayer1Deck || !editPlayer2 || !editPlayer2Deck || !editWinner) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    if (editPlayer1 === editPlayer2) {
      Alert.alert('Invalid Selection', 'Please select different players');
      return;
    }

    if (editPlayer1Deck === editPlayer2Deck) {
      Alert.alert('Invalid Selection', 'Please select different decks');
      return;
    }

    if (editWinner !== editPlayer1 && editWinner !== editPlayer2) {
      Alert.alert('Invalid Selection', 'Winner must be Player 1 or Player 2');
      return;
    }

    updateResult(editingResult.id, {
      player1: editPlayer1,
      player1Deck: editPlayer1Deck,
      player2: editPlayer2,
      player2Deck: editPlayer2Deck,
      winner: editWinner
    });

    setShowEditModal(false);
    setEditingResult(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {gameResults.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No matches yet</Text>
            <Text style={styles.emptyStateSubtext}>Record your first match result</Text>
          </View>
        ) : (
          gameResults.map(result => {
            const winnerName = getPlayerName(result.winner);
            const loserName = getPlayerName(result.winner === result.player1 ? result.player2 : result.player1);
            const winnerDeck = getDeckName(result.winner === result.player1 ? result.player1Deck : result.player2Deck);
            const loserDeck = getDeckName(result.winner === result.player1 ? result.player2Deck : result.player1Deck);

            return (
              <View key={result.id} style={[styles.resultItem, { borderColor: gameColor }]}>
                <View style={styles.resultHeader}>
                  <Text style={styles.dateText}>{formatDate(result.date)}</Text>
                </View>
                
                <View style={styles.outcomeContainer}>
                  <View style={styles.outcomeRow}>
                    <Text style={styles.outcomeLabel}>Winner:</Text>
                    <Text style={[styles.outcomeName, { color: '#4CAF50' }]}>
                      {winnerName}
                    </Text>
                  </View>
                  <View style={styles.deckRow}>
                    <Text style={styles.deckLabel}>Deck:</Text>
                    <Text style={styles.deckText}>{winnerDeck}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.outcomeContainer}>
                  <View style={styles.outcomeRow}>
                    <Text style={styles.outcomeLabel}>Loser:</Text>
                    <Text style={[styles.outcomeName, { color: '#FF4444' }]}>
                      {loserName}
                    </Text>
                  </View>
                  <View style={styles.deckRow}>
                    <Text style={styles.deckLabel}>Deck:</Text>
                    <Text style={styles.deckText}>{loserDeck}</Text>
                  </View>
                </View>

                <View style={styles.resultActions}>
                  <TouchableOpacity
                    onPress={() => openEditModal(result)}
                    style={styles.actionButton}
                  >
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteResult(result.id)}
                    style={styles.actionButton}
                  >
                    <Text style={[styles.actionButtonText, { color: '#FF4444' }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={showEditModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Result</Text>
            
            <ScrollView style={styles.modalScroll}>
              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>Player 1</Text>
                <View style={[styles.modalPicker, { borderColor: gameColor }]}>
                  <Picker
                    selectedValue={editPlayer1}
                    onValueChange={setEditPlayer1}
                    style={styles.picker}
                    dropdownIconColor="white"
                  >
                    {players.map(player => (
                      <Picker.Item key={player.id} label={player.name} value={player.id} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>Player 1 Deck</Text>
                <View style={[styles.modalPicker, { borderColor: gameColor }]}>
                  <Picker
                    selectedValue={editPlayer1Deck}
                    onValueChange={setEditPlayer1Deck}
                    style={styles.picker}
                    dropdownIconColor="white"
                  >
                    {gameDecks.map(deck => (
                      <Picker.Item key={deck.id} label={deck.name} value={deck.id} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>Player 2</Text>
                <View style={[styles.modalPicker, { borderColor: gameColor }]}>
                  <Picker
                    selectedValue={editPlayer2}
                    onValueChange={setEditPlayer2}
                    style={styles.picker}
                    dropdownIconColor="white"
                  >
                    {players.map(player => (
                      <Picker.Item key={player.id} label={player.name} value={player.id} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>Player 2 Deck</Text>
                <View style={[styles.modalPicker, { borderColor: gameColor }]}>
                  <Picker
                    selectedValue={editPlayer2Deck}
                    onValueChange={setEditPlayer2Deck}
                    style={styles.picker}
                    dropdownIconColor="white"
                  >
                    {gameDecks.map(deck => (
                      <Picker.Item key={deck.id} label={deck.name} value={deck.id} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={styles.modalSection}>
                <Text style={styles.modalLabel}>Winner</Text>
                <View style={[styles.modalPicker, { borderColor: gameColor }]}>
                  <Picker
                    selectedValue={editWinner}
                    onValueChange={setEditWinner}
                    style={styles.picker}
                    dropdownIconColor="white"
                  >
                    {editPlayer1 && <Picker.Item label={players.find(p => p.id === editPlayer1)?.name || 'Player 1'} value={editPlayer1} />}
                    {editPlayer2 && <Picker.Item label={players.find(p => p.id === editPlayer2)?.name || 'Player 2'} value={editPlayer2} />}
                  </Picker>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowEditModal(false);
                  setEditingResult(null);
                }}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditResult}
                style={[styles.modalConfirmButton, { borderColor: gameColor }]}
              >
                <Text style={styles.modalConfirmText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  emptyState: {
    alignItems: 'center',
    marginTop: 60
  },
  emptyStateText: {
    color: '#888',
    fontSize: 20,
    marginBottom: 8
  },
  emptyStateSubtext: {
    color: '#666',
    fontSize: 14
  },
  resultItem: {
    backgroundColor: '#000',
    padding: 16,
    marginBottom: 16,
    borderWidth: 2
  },
  resultHeader: {
    marginBottom: 12
  },
  dateText: {
    color: '#888',
    fontSize: 12
  },
  outcomeContainer: {
    marginBottom: 8
  },
  outcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  outcomeLabel: {
    color: '#888',
    fontSize: 14
  },
  outcomeName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  deckRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  deckLabel: {
    color: '#666',
    fontSize: 12
  },
  deckText: {
    color: '#fff',
    fontSize: 14
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12
  },
  resultActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12
  },
  actionButton: {
    padding: 8
  },
  actionButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    padding: 24,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#333'
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalScroll: {
    maxHeight: 400
  },
  modalSection: {
    marginBottom: 16
  },
  modalLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  modalPicker: {
    backgroundColor: '#000',
    borderWidth: 2,
    overflow: 'hidden'
  },
  picker: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#000',
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444'
  },
  modalCancelText: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalConfirmButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 2
  },
  modalConfirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});