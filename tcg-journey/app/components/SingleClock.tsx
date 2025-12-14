import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import ResetIcon from '../../assets/icons/reset.svg';
import PencilIcon from '../../assets/icons/pencil.svg';
import HomeIcon from '../../assets/icons/home.svg';

interface SingleClockProps {
  gameColor: string;
}

export default function SingleClock({ gameColor }: SingleClockProps) {
  const router = useRouter();
  const [time, setTime] = useState(720);
  const [isRunning, setIsRunning] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editMinutes, setEditMinutes] = useState('12');
  const [editSeconds, setEditSeconds] = useState('0');

  useEffect(() => {
    if (isRunning && time > 0) {
      const timer = setInterval(() => {
        setTime(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(720);
    setIsRunning(false);
  };

  const handleEdit = () => {
    const mins = parseInt(editMinutes) || 0;
    const secs = parseInt(editSeconds) || 0;
    const newTime = (mins * 60) + secs;
    if (newTime > 0) {
      setTime(newTime);
    }
    setShowEdit(false);
  };

  const handleOpenEdit = () => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    setEditMinutes(mins.toString());
    setEditSeconds(secs.toString());
    setShowEdit(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsRunning(!isRunning)}
        style={[
          styles.clockSection,
          { backgroundColor: time === 0 ? '#8B0000' : (isRunning ? gameColor : '#000') }
        ]}
      >
        <Text style={[
          styles.timeText,
          { 
            color: time === 0 ? '#FF4444' : (isRunning ? '#000' : 'white')
          }
        ]}>
          {formatTime(time)}
        </Text>
        <Text style={[
          styles.statusText,
          { color: time === 0 ? '#FF4444' : (isRunning ? '#000' : '#888') }
        ]}>
          {time === 0 ? 'Time Up!' : (isRunning ? 'Tap to Pause' : 'Tap to Start')}
        </Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={handleOpenEdit}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <PencilIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleReset}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <ResetIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/")}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <HomeIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
      </View>

      <Modal visible={showEdit} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { borderColor: gameColor }]}>
            <Text style={styles.modalTitle}>Set Time</Text>
            
            <View style={styles.timeInputContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Minutes</Text>
                <TextInput
                  value={editMinutes}
                  onChangeText={setEditMinutes}
                  keyboardType="number-pad"
                  style={[styles.modalInput, { borderColor: gameColor }]}
                  placeholder="0"
                  placeholderTextColor="#666"
                />
              </View>
              
              <Text style={styles.separator}>:</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Seconds</Text>
                <TextInput
                  value={editSeconds}
                  onChangeText={setEditSeconds}
                  keyboardType="number-pad"
                  style={[styles.modalInput, { borderColor: gameColor }]}
                  placeholder="0"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

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
  clockSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeText: {
    fontSize: 96,
    fontWeight: 'bold'
  },
  statusText: {
    fontSize: 20,
    marginTop: 16
  },
  controls: {
    backgroundColor: '#000',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
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
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1
  },
  inputLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600'
  },
  separator: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 12
  },
  modalInput: {
    backgroundColor: '#000',
    color: 'white',
    padding: 12,
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 2,
    width: '100%',
    fontWeight: 'bold'
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