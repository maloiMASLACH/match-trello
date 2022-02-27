import { HTMLAttributes } from 'react';

export interface InputBlockProps extends HTMLAttributes<HTMLElement> {
  id: string;
  value: string;
  label: string;
  type: string;
}
