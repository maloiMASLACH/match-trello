import React from 'react';
import { ColumnType } from '../../types/globalTypes';

const ColumnValueContext = React.createContext<ColumnType>({ tasks: [], columnName: '', id: 0 });

export default ColumnValueContext;
