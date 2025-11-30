import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Deck {
  id: string;
  game: 'pokemon' | 'lorcana' | 'gwent';
  name: string;
}

export interface Player {
  id: string;
  name: string;
}

export interface GameResult {
  id: string;
  game: 'pokemon' | 'lorcana' | 'gwent';
  player1: string;
  player1Deck: string;
  player2: string;
  player2Deck: string;
  winner: string;
  date: string;
}

interface StorageContextType {
  decks: Deck[];
  players: Player[];
  results: GameResult[];
  addDeck: (game: 'pokemon' | 'lorcana' | 'gwent', name: string) => void;
  updateDeck: (id: string, name: string) => void;
  deleteDeck: (id: string) => void;
  addPlayer: (name: string) => void;
  updatePlayer: (id: string, name: string) => void;
  deletePlayer: (id: string) => void;
  addResult: (result: Omit<GameResult, 'id' | 'date'>) => void;
  updateResult: (id: string, result: Partial<GameResult>) => void;
  deleteResult: (id: string) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [results, setResults] = useState<GameResult[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const decksData = await AsyncStorage.getItem('decks');
      const playersData = await AsyncStorage.getItem('players');
      const resultsData = await AsyncStorage.getItem('results');

      if (decksData) setDecks(JSON.parse(decksData));
      if (playersData) setPlayers(JSON.parse(playersData));
      if (resultsData) setResults(JSON.parse(resultsData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveDecks = async (newDecks: Deck[]) => {
    try {
      await AsyncStorage.setItem('decks', JSON.stringify(newDecks));
      setDecks(newDecks);
    } catch (error) {
      console.error('Error saving decks:', error);
    }
  };

  const savePlayers = async (newPlayers: Player[]) => {
    try {
      await AsyncStorage.setItem('players', JSON.stringify(newPlayers));
      setPlayers(newPlayers);
    } catch (error) {
      console.error('Error saving players:', error);
    }
  };

  const saveResults = async (newResults: GameResult[]) => {
    try {
      await AsyncStorage.setItem('results', JSON.stringify(newResults));
      setResults(newResults);
    } catch (error) {
      console.error('Error saving results:', error);
    }
  };

  const addDeck = (game: 'pokemon' | 'lorcana' | 'gwent', name: string) => {
    const newDeck: Deck = {
      id: Date.now().toString(),
      game,
      name
    };
    saveDecks([...decks, newDeck]);
  };

  const updateDeck = (id: string, name: string) => {
    const updatedDecks = decks.map(deck =>
      deck.id === id ? { ...deck, name } : deck
    );
    saveDecks(updatedDecks);
  };

  const deleteDeck = (id: string) => {
    const filteredDecks = decks.filter(deck => deck.id !== id);
    saveDecks(filteredDecks);
  };

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name
    };
    savePlayers([...players, newPlayer]);
  };

  const updatePlayer = (id: string, name: string) => {
    const updatedPlayers = players.map(player =>
      player.id === id ? { ...player, name } : player
    );
    savePlayers(updatedPlayers);
  };

  const deletePlayer = (id: string) => {
    const filteredPlayers = players.filter(player => player.id !== id);
    savePlayers(filteredPlayers);
  };

  const addResult = (result: Omit<GameResult, 'id' | 'date'>) => {
    const newResult: GameResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    saveResults([newResult, ...results]);
  };

  const updateResult = (id: string, updatedFields: Partial<GameResult>) => {
    const updatedResults = results.map(result =>
      result.id === id ? { ...result, ...updatedFields } : result
    );
    saveResults(updatedResults);
  };

  const deleteResult = (id: string) => {
    const filteredResults = results.filter(result => result.id !== id);
    saveResults(filteredResults);
  };

  return (
    <StorageContext.Provider
      value={{
        decks,
        players,
        results,
        addDeck,
        updateDeck,
        deleteDeck,
        addPlayer,
        updatePlayer,
        deletePlayer,
        addResult,
        updateResult,
        deleteResult
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within StorageProvider');
  }
  return context;
}