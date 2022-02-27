import { HTMLAttributes } from 'react';

export interface StartButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  disabled: boolean | '';
  onClick: () => void;
}
