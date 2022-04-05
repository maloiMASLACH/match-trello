import React from 'react';
import { SenderType } from '../../types/requestPage';

const SenderContext = React.createContext<SenderType>({
  mail: '',
  key: '',
});

export default SenderContext;
