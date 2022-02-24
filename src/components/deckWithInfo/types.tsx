import { DeckType, User } from '../../constants/interfaces';

export interface DeckWithInfoProps {
  deckInfo: DeckType;
  deckName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
