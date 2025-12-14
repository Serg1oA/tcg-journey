import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import PauseIcon from '../../assets/icons/pause.svg';
import ResetIcon from '../../assets/icons/reset.svg';
import PencilIcon from '../../assets/icons/pencil.svg';
import HomeIcon from '../../assets/icons/home.svg';

interface TwoPlayerClockProps {
  gameColor: string;
}

export default function TwoPlayerClock({ gameColor }: TwoPlayerClockProps) {
  const router = useRouter();
  const [player1Time, setPlayer1Time] = useState(720);
  const [player2Time, setPlayer2Time] = useState(720);
  const [activePlayer, setActivePlayer] = useState<1 | 2 | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editMinutes, setEditMinutes] = useState('12');

  useEffect(() => {
    if (activePlayer && !isPaused) {
      const timer = setInterval(() => {
        if (activePlayer === 1) {
          setPlayer1Time(prev => Math.max(0, prev - 1));
        } else {
          setPlayer2Time(prev => Math.max(0, prev - 1));
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activePlayer, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayerPress = (player: 1 | 2) => {
    if (activePlayer === player) {
      setActivePlayer(player === 1 ? 2 : 1);
    } else {
      setActivePlayer(player);
    }
  };

  const handleReset = () => {
    setPlayer1Time(720);
    setPlayer2Time(720);
    setActivePlayer(null);
    setIsPaused(false);
  };

  const handleEdit = () => {
    const newTime = parseInt(editMinutes) * 60;
    if (!isNaN(newTime) && newTime > 0) {
      if (activePlayer === 1) {
        setPlayer1Time(newTime);
      } else if (activePlayer === 2) {
        setPlayer2Time(newTime);
      } else {
        setPlayer1Time(newTime);
        setPlayer2Time(newTime);
      }
    }
    setShowEdit(false);
  };

  return (
    <View style={styles.container}>
      {/* Player 2 (Top) */}
      <TouchableOpacity
        onPress={() => handlePlayerPress(2)}
        style={[
          styles.playerSection,
          { 
            backgroundColor: activePlayer === 2 ? gameColor : '#000',
            transform: [{ rotate: '180deg' }]
          }
        ]}
      >
        <Text style={[
          styles.timeText,
          { 
            color: activePlayer === 2 ? '#000' : (player2Time === 0 ? '#FF4444' : 'white')
          }
        ]}>
          {formatTime(player2Time)}
        </Text>
        <Text style={[
          styles.playerLabel,
          { color: activePlayer === 2 ? '#000' : '#888' }
        ]}>
          Player 2
        </Text>
      </TouchableOpacity>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setIsPaused(!isPaused)}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <PauseIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <ResetIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEdit(true)}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <PencilIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <HomeIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
      </View>

      {/* Player 1 (Bottom) */}
      <TouchableOpacity
        onPress={() => handlePlayerPress(1)}
        style={[
          styles.playerSection,
          { backgroundColor: activePlayer === 1 ? gameColor : '#000' }
        ]}
      >
        <Text style={[
          styles.timeText,
          { 
            color: activePlayer === 1 ? '#000' : (player1Time === 0 ? '#FF4444' : 'white')
          }
        ]}>
          {formatTime(player1Time)}
        </Text>
        <Text style={[
          styles.playerLabel,
          { color: activePlayer === 1 ? '#000' : '#888' }
        ]}>
          Player 1
        </Text>
      </TouchableOpacity>

      {/* Edit Modal */}
      <Modal visible={showEdit} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { borderColor: gameColor }]}>
            <Text style={styles.modalTitle}>Set Time (minutes)</Text>
            <TextInput
              value={editMinutes}
              onChangeText={setEditMinutes}
              keyboardType="number-pad"
              style={[styles.modalInput, { borderColor: gameColor }]}
              placeholder="12"
              placeholderTextColor="#666"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setShowEdit(false)}
                style={styles.modalCancelButton}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleEdit}
                style={[styles.modalConfirmButton, { borderColor: gameColor }]}
              >
                <Text style={styles.modalConfirmText}>Set</Text>
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
  playerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 72,
    fontWeight: 'bold'
  },
  playerLabel: {
    fontSize: 20,
    marginTop: 8
  },
  controls: {
    backgroundColor: '#000',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333'
  },
  controlButton: {
    padding: 8,
    borderWidth: 2
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
    fontSize: 18,
    textAlign: 'center',
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