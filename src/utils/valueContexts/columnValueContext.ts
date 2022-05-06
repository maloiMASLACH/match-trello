import React from 'react';
import { ColumnType } from '../../types';

const ColumnValueContext = React.createContext<ColumnType>({
  tasks: [],
  columnName: '',
  deskObjId: '',
  id: 0,
  position: 0,
});

export default ColumnValueContext;
