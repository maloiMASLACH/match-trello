import React from 'react';
import { UserType } from '../../types/globalTypes';

const UserValueContext = React.createContext<UserType | null>(null);

export default UserValueContext;
