import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useStorage } from '../context/StorageContext';

interface PlayersManagerProps {
  gameColor: string;
}

export default function PlayersManager({ gameColor }: PlayersManagerProps) {
  const router = useRouter();
  const { players, addPlayer, updatePlayer, deletePlayer } = useStorage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [editingPlayer, setEditingPlayer] = useState<{ id: string; name: string } | null>(null);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      addPlayer(newPlayerName.trim());
      setNewPlayerName('');
      setShowAddModal(false);
    }
  };

  const handleEditPlayer = () => {
    if (editingPlayer && newPlayerName.trim()) {
      updatePlayer(editingPlayer.id, newPlayerName.trim());
      setNewPlayerName('');
      setEditingPlayer(null);
      setShowEditModal(false);
    }
  };

  const handleDeletePlayer = (id: string, name: string) => {
    Alert.alert(
      'Delete Player',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deletePlayer(id)
        }
      ]
    );
  };

  const openEditModal = (id: string, name: string) => {
    setEditingPlayer({ id, name });
    setNewPlayerName(name);
    setShowEditModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          style={[styles.addButton, { borderColor: gameColor }]}
        >
          <Text style={styles.addButtonText}>+ Add Player</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {players.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No players yet</Text>
            <Text style={styles.emptyStateSubtext}>Tap "+ Add Player" to create your first player</Text>
          </View>
        ) : (
          players.map(player => (
            <View key={player.id} style={[styles.playerItem, { borderColor: gameColor }]}>
              <Text style={styles.playerName}>{player.name}</Text>
              <View style={styles.playerActions}>
                <TouchableOpacity
                  onPress={() => openEditModal(player.id, player.name)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeletePlayer(player.id, player.name)}
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
            <Text style={styles.modalTitle}>Add New Player</Text>
            <TextInput
              value={newPlayerName}
              onChangeText={setNewPlayerName}
              placeholder="Enter player name"
              placeholderTextColor="#666"
              style={[styles.modalInput, { borderColor: gameColor }]}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowAddModal(false);
                  setNewPlayerName('');
                }}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddPlayer}
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
            <Text style={styles.modalTitle}>Edit Player</Text>
            <TextInput
              value={newPlayerName}
              onChangeText={setNewPlayerName}
              placeholder="Enter player name"
              placeholderTextColor="#666"
              style={[styles.modalInput, { borderColor: gameColor }]}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowEditModal(false);
                  setNewPlayerName('');
                  setEditingPlayer(null);
                }}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEditPlayer}
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
  playerItem: {
    backgroundColor: '#000',
    padding: 16,
    marginBottom: 16,
    borderWidth: 2
  },
  playerName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  playerActions: {
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