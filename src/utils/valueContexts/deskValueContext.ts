import React from 'react';
import { DeskType } from '../../types/globalTypes';

const DeskValueContext = React.createContext<DeskType | null>(null);

export default DeskValueContext;
