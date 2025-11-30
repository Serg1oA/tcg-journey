import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStorage } from '../context/StorageContext';

interface DecksManagerProps {
  game: 'pokemon' | 'lorcana' | 'gwent';
  gameColor: string;
}

export default function DecksManager({ game, gameColor }: DecksManagerProps) {
  const router = useRouter();
  const { decks, addDeck, updateDeck, deleteDeck } = useStorage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [editingDeck, setEditingDeck] = useState<{ id: string; name: string } | null>(null);

  const gameDecks = decks.filter(deck => deck.game === game);

  const handleAddDeck = () => {
    if (newDeckName.trim()) {
      addDeck(game, newDeckName.trim());
      setNewDeckName('');
      setShowAddModal(false);
    }
  };

  const handleEditDeck = () => {
    if (editingDeck && newDeckName.trim()) {
      updateDeck(editingDeck.id, newDeckName.trim());
      setNewDeckName('');
      setEditingDeck(null);
      setShowEditModal(false);
    }
  };

  const handleDeleteDeck = (id: string, name: string) => {
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteDeck(id)
        }
      ]
    );
  };

  const openEditModal = (id: string, name: string) => {
    setEditingDeck({ id, name });
    setNewDeckName(name);
    setShowEditModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          style={[styles.addButton, { borderColor: gameColor }]}
        >
          <Text style={styles.addButtonText}>+ Add Deck</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {gameDecks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No decks yet</Text>
            <Text style={styles.emptyStateSubtext}>Tap "+ Add Deck" to create your first deck</Text>
          </View>
        ) : (
          gameDecks.map(deck => (
            <View key={deck.id} style={[styles.deckItem, { borderColor: gameColor }]}>
              <Text style={styles.deckName}>{deck.name}</Text>
              <View style={styles.deckActions}>
                <TouchableOpacity
                  onPress={() => openEditModal(deck.id, deck.name)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteDeck(deck.id, deck.name)}
                  style={styles.actionButton}
                >
                  <Text style={[styles.actionButtonText, { color: '#FF4444' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Modal */}
      <Modal visible={showAddModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { borderColor: gameColor }]}>
            <Text style={styles.modalTitle}>Add New Deck</Text>
            <TextInput
              value={newDeckName}
              onChangeText={setNewDeckName}
              placeholder="Enter deck name"
              placeholderTextColor="#666"
              style={[styles.modalInput, { borderColor: gameColor }]}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  setNewDeckName('');
                }}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddDeck}
                style={[styles.modalConfirmButton, { borderColor: gameColor }]}
              >
                <Text style={styles.modalConfirmText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={showEditModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { borderColor: gameColor }]}>
            <Text style={styles.modalTitle}>Edit Deck</Text>
            <TextInput
              value={newDeckName}
              onChangeText={setNewDeckName}
              placeholder="Enter deck name"
              placeholderTextColor="#666"
              style={[styles.modalInput, { borderColor: gameColor }]}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowEditModal(false);
                  setNewDeckName('');
                  setEditingDeck(null);
                }}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditDeck}
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
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  addButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
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
  deckItem: {
    backgroundColor: '#000',
    padding: 16,
    marginBottom: 16,
    borderWidth: 2
  },
  deckName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  deckActions: {
    flexDirection: 'row',
    gap: 12
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
    width: '80%',
    borderWidth: 2
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalInput: {
    backgroundColor: '#000',
    color: 'white',
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 2
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12
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