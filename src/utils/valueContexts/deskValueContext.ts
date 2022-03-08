import React from 'react';
import { DeskType } from '../../types/globalTypes';

const DeskValueContext = React.createContext<DeskType>({ columns: [], deskName: '', id: 0 });

export default DeskValueContext;
