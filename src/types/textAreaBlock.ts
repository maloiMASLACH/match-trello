import { HTMLAttributes } from 'react';

export interface TextAreaProps extends HTMLAttributes<HTMLElement> {
  id: string;
  value: string;
  validation: (value:string) => string;
}
