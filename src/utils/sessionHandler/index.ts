import React from 'react';
import { voidAuthUser } from '../../constants';
import { AuthUserType } from '../../types';

const AuthUserContext = React.createContext<AuthUserType>(voidAuthUser);

export default AuthUserContext;
