import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import SwordsIcon from '../../assets/icons/swords.svg';
import BowIcon from '../../assets/icons/bow.svg';
import CatapultIcon from '../../assets/icons/catapult.svg';
import ResetIcon from '../../assets/icons/reset.svg';
import HomeIcon from '../../assets/icons/home.svg';

interface StrengthCounterProps {
  gameColor: string;
}

interface PlayerStats {
  melee: number;
  ranged: number;
  artillery: number;
}

export default function StrengthCounter({ gameColor }: StrengthCounterProps) {
  const router = useRouter();
  const [player1, setPlayer1] = useState<PlayerStats>({ melee: 0, ranged: 0, artillery: 0 });
  const [player2, setPlayer2] = useState<PlayerStats>({ melee: 0, ranged: 0, artillery: 0 });

  const handleReset = () => {
    setPlayer1({ melee: 0, ranged: 0, artillery: 0 });
    setPlayer2({ melee: 0, ranged: 0, artillery: 0 });
  };

  const getTotal = (player: PlayerStats) => player.melee + player.ranged + player.artillery;

  const increment = (player: 1 | 2, field: 'melee' | 'ranged' | 'artillery', amount: number) => {
    if (player === 1) {
      setPlayer1(prev => ({ ...prev, [field]: Math.max(0, prev[field] + amount) }));
    } else {
      setPlayer2(prev => ({ ...prev, [field]: Math.max(0, prev[field] + amount) }));
    }
  };

  const StatField = ({ 
    label,
    Icon,
    value, 
    player,
    field
  }: { 
    label: string;
    Icon: React.FC<{ width: number; height: number; stroke: string }>;
    value: number;
    player: 1 | 2;
    field: 'melee' | 'ranged' | 'artillery';
  }) => (
    <View style={styles.statField}>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <Icon width={20} height={20} stroke="#888" />
          <Text style={styles.statLabel}>{label}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => increment(player, field, -10)}
            onLongPress={() => increment(player, field, -1)}
            style={styles.decrementButton}
          >
            <Text style={styles.buttonText}>--</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => increment(player, field, -1)}
            style={styles.decrementButton}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{value}</Text>
          </View>
          <TouchableOpacity
            onPress={() => increment(player, field, 1)}
            style={styles.incrementButton}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => increment(player, field, 10)}
            onLongPress={() => increment(player, field, 1)}
            style={styles.incrementButton}
          >
            <Text style={styles.buttonText}>++</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Player 2 (Top) - Rotated */}
      <View style={[styles.playerSection, { transform: [{ rotate: '180deg' }] }]}>
        <View style={styles.playerHeader}>
          <Text style={styles.playerTitle}>Player 2</Text>
          <View style={[styles.totalBadge, { backgroundColor: gameColor }]}>
            <Text style={styles.totalValue}>{getTotal(player2)}</Text>
          </View>
        </View>
        
        <View style={styles.statsColumn}>
          <StatField label="Artillery" Icon={CatapultIcon} value={player2.artillery} player={2} field="artillery" />
          <StatField label="Ranged" Icon={BowIcon} value={player2.ranged} player={2} field="ranged" />
          <StatField label="Melee" Icon={SwordsIcon} value={player2.melee} player={2} field="melee" />
        </View>
      </View>

      {/* Center Controls */}
      <View style={styles.centerControls}>
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

      {/* Player 1 (Bottom) */}
      <View style={styles.playerSection}>
        <View style={styles.playerHeader}>
          <Text style={styles.playerTitle}>Player 1</Text>
          <View style={[styles.totalBadge, { backgroundColor: gameColor }]}>
            <Text style={styles.totalValue}>{getTotal(player1)}</Text>
          </View>
        </View>
        
        <View style={styles.statsColumn}>
          <StatField label="Melee" Icon={SwordsIcon} value={player1.melee} player={1} field="melee" />
          <StatField label="Ranged" Icon={BowIcon} value={player1.ranged} player={1} field="ranged" />
          <StatField label="Artillery" Icon={CatapultIcon} value={player1.artillery} player={1} field="artillery" />
        </View>
      </View>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12
  },
  playerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  totalBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center'
  },
  totalValue: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold'
  },
  statsColumn: {
    gap: 8
  },
  statField: {
    paddingVertical: 4
  },
  statRow: {
    flexDirection: 'column',
    gap: 8
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 8
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold'
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  decrementButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#333',
    minWidth: 45,
    alignItems: 'center'
  },
  incrementButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#333',
    minWidth: 45,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  valueContainer: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444'
  },
  valueText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  centerControls: {
    backgroundColor: '#000',
    paddingVertical: 8,
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