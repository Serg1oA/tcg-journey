import DecksManager from '../components/DecksManager';

const GAME_COLOR = 'lightskyblue';

export default function PokemonDecks() {
  return <DecksManager game="pokemon" gameColor={GAME_COLOR} />;
}