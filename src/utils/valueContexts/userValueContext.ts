import React from 'react';
import { UserType } from '../../types/globalTypes';

const UserValueContext = React.createContext<UserType>({
  desks: [],
  mail: '',
  name: '',
  uid: '',
});

export default UserValueContext;
