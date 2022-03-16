import React from 'react';
import { AuthUserType } from '../../types/globalTypes';

const AuthUserContext = React.createContext<AuthUserType>({
  isVerified: false,
  isAdmin: false,
  uid: '',
});

export default AuthUserContext;
