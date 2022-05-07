import React from 'react';
import { voidDesk } from '../../constants';
import { DeskType } from '../../types';

const DeskValueContext = React.createContext<DeskType>(voidDesk);

export default DeskValueContext;
