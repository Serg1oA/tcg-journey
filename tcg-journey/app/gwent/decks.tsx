import DecksManager from '../components/DecksManager';

const GAME_COLOR = 'lightsalmon';

export default function GwentDecks() {
  return <DecksManager game="gwent" gameColor={GAME_COLOR} />;
}