import React from 'react';
import { voidColumn } from '../../constants';
import { ColumnType } from '../../types';

const ColumnValueContext = React.createContext<ColumnType>(voidColumn);

export default ColumnValueContext;
