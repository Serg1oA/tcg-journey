
# TCG Companion App

### A mobile toolkit for Pokémon TCG, Lorcana, and Gwent players

## 🎴 What is this project about?

A React Native mobile app that provides essential tools for tabletop card game players. Features include game clocks, deck management, player tracking, score counters, match result recording, and statistics tracking across popular card games.

## 💻 Technologies Utilized

- **Framework**: React Native, Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Storage**: AsyncStorage for persistent data
- **UI Components**: React Native core components
- **Icons**: react-native-svg with custom SVG icons
- **State Management**: React Context API

## ✨ Current Features / Functionality

- **Game Selection**: Dedicated toolkits for Pokémon TCG, Lorcana, and Gwent
- **Clock Systems**:
  - 2-player alternating timer
  - Single game countdown timer
  - Stopwatch for tracking game duration
  - Customizable time settings
- **Deck Management**: Add, edit, and delete deck names per game
- **Player Management**: Maintain a global list of players
- **Score Counters**:
  - Lorcana: Lore counter (0-20) with victory indication
  - Gwent: Strength counter with melee/ranged/artillery tracking and totals
- **Match Recording**: Log match results with player and deck selections
- **Match History**: Browse, edit, and delete past match records

## 🛠️ Upcoming Features / Improvements

- Improved clock editing features (allow user to enter a different min:sec value for each clock)
- "Stats" section to view player and deck win totals and win rates
- FAQ section with game-specific rule references, e.g.: how Confusion works in Pokémon TCG
- Additional game support (Magic: The Gathering, Yu-Gi-Oh!)
- Cloud sync across devices

#### SVG Credits:

- SVG Repo: swords, bow, clock, scroll, people
- game-icons.net: catapult
- Software Mansion: star
- zest: home
- Dazzle UI: pause
