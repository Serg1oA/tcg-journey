import DecksManager from '../components/DecksManager';

const GAME_COLOR = 'pink';

export default function LorcanaDecks() {
  return <DecksManager game="lorcana" gameColor={GAME_COLOR} />;
}