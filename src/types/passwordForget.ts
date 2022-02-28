import { NavigateFunction } from 'react-router-dom';
import Firebase from '../utils/fireBase';

export interface OnSubmitProps {
  mail: string;
  nav: NavigateFunction;
  firebase: Firebase;
}
