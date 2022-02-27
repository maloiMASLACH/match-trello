import { HTMLAttributes } from 'react';

export interface InputBlockProps extends HTMLAttributes<HTMLElement> {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
}
