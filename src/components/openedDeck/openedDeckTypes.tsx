import { DeckType, User, ColonType } from '../../constants/interfaces';
import Firebase from '../../utils/fireBase';

export interface OpenedDeckProps {
  deckInfo: DeckType;
  deckName: string;
  setOpenDeck: React.Dispatch<React.SetStateAction<boolean>>;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
}
export interface ColonProps {
  colon: ColonType;
  deckName: string;
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  currentCard: ColonType | null;
  setCurrentCard: React.Dispatch<React.SetStateAction<ColonType | null>>;
  firebase: Firebase;
}
export interface ChangeNameFieldProps {
  userState: User;
  setUserState: React.Dispatch<React.SetStateAction<User>>;
  deckName: string;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
  firebase: Firebase;
}
