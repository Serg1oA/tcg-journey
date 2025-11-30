import ResultInput from '../components/ResultInput';

const GAME_COLOR = 'lightsalmon';

export default function GwentResult() {
  return <ResultInput game="gwent" gameColor={GAME_COLOR} />;
}