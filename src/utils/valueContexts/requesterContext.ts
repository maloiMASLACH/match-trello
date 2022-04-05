import React from 'react';
import { SenderType } from '../../types/requestPage';

const RequesterContext = React.createContext<SenderType>({
  mail: '',
  key: '',
});

export default RequesterContext;
