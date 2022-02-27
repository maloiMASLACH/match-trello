import { DeckType, User } from './globalTypes';

export interface DeckWithInfoProps {
  deckInfo: DeckType;
  deckName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
