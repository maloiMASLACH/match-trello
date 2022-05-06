import React from 'react';
import { UserType } from '../../types';

const UserValueContext = React.createContext<UserType>({
  desks: [],
  mail: '',
  name: '',
  isAdmin: false,
  uid: '',
});

export default UserValueContext;
