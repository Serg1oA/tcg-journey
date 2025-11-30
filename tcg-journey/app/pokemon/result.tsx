import ResultInput from '../components/ResultInput';

const GAME_COLOR = 'lightskyblue';

export default function PokemonResult() {
  return <ResultInput game="pokemon" gameColor={GAME_COLOR} />;
}