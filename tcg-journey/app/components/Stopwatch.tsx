import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import PauseIcon from '../../assets/icons/pause.svg';
import ResetIcon from '../../assets/icons/reset.svg';
import HomeIcon from '../../assets/icons/home.svg';

interface StopwatchProps {
  gameColor: string;
}

export default function Stopwatch({ gameColor }: StopwatchProps) {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsRunning(!isRunning)}
        style={[
          styles.stopwatchSection,
          { backgroundColor: isRunning ? gameColor : '#000' }
        ]}
      >
        <Text style={[
          styles.timeText,
          { color: isRunning ? '#000' : 'white' }
        ]}>
          {formatTime(time)}
        </Text>
        <Text style={[
          styles.statusText,
          { color: isRunning ? '#000' : '#888' }
        ]}>
          {isRunning ? 'Running...' : 'Tap to Start'}
        </Text>
      </TouchableOpacity>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() => setIsRunning(!isRunning)}
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
          onPress={() => router.push("/")}
          style={[styles.controlButton, { borderColor: gameColor }]}
        >
          <HomeIcon width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  stopwatchSection: {
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
  }
});