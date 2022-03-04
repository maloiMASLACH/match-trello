import React from 'react';
import { ColumnType } from '../../types/globalTypes';

const ColumnValueContext = React.createContext<ColumnType | null>(null);

export default ColumnValueContext;
