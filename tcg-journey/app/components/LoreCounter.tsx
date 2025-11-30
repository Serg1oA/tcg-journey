import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ResetIcon from '../../assets/icons/reset.svg';
import HomeIcon from '../../assets/icons/home.svg';

interface LoreCounterProps {
  gameColor: string;
}

export default function LoreCounter({ gameColor }: LoreCounterProps) {
  const router = useRouter();
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const handleReset = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  const getBackgroundColor = (score: number) => {
    if (score >= 20) return '#4CAF50'; // Green when won
    return '#000';
  };

  return (
    <View style={styles.container}>
      {/* Player 2 (Top) */}
      <TouchableOpacity
        onPress={() => setPlayer2Score(prev => prev + 1)}
        onLongPress={() => setPlayer2Score(prev => Math.max(0, prev - 1))}
        style={[
          styles.playerSection,
          { 
            backgroundColor: getBackgroundColor(player2Score),
            transform: [{ rotate: '180deg' }]
          }
        ]}
      >
        <Text style={styles.scoreText}>{player2Score}</Text>
        <Text style={[
          styles.playerLabel,
          { color: player2Score >= 20 ? 'white' : '#888' }
        ]}>
          Player 2 {player2Score >= 20 && '🏆'}
        </Text>
        <Text style={styles.instructionText}>
          Tap +1 • Hold -1
        </Text>
      </TouchableOpacity>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={handleReset}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <ResetIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <HomeIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
      </View>

      {/* Player 1 (Bottom) */}
      <TouchableOpacity
        onPress={() => setPlayer1Score(prev => prev + 1)}
        onLongPress={() => setPlayer1Score(prev => Math.max(0, prev - 1))}
        style={[
          styles.playerSection,
          { backgroundColor: getBackgroundColor(player1Score) }
        ]}
      >
        <Text style={styles.scoreText}>{player1Score}</Text>
        <Text style={[
          styles.playerLabel,
          { color: player1Score >= 20 ? 'white' : '#888' }
        ]}>
          Player 1 {player1Score >= 20 && '🏆'}
        </Text>
        <Text style={styles.instructionText}>
          Tap +1 • Hold -1
        </Text>
      </TouchableOpacity>
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
  scoreText: {
    fontSize: 96,
    fontWeight: 'bold',
    color: 'white'
  },
  playerLabel: {
    fontSize: 20,
    marginTop: 8
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
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
  }
});