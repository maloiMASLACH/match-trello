import { NavigateFunction } from 'react-router-dom';
import Firebase from '../../../utils/fireBase';

export interface CheckIsCorrectProps {
  mail: string;
  password: string;
  setVisibly: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OnSubmitProps {
  mail: string;
  password: string;
  nav: NavigateFunction;
  firebase: Firebase;
}
