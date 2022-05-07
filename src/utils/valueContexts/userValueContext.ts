import React from 'react';
import { voidUser } from '../../constants';
import { UserType } from '../../types';

const UserValueContext = React.createContext<UserType>(voidUser);

export default UserValueContext;
