import React from 'react';
import Firebase from '../fireBase';

const userType = new Firebase().auth.currentUser;

const AuthUserContext = React.createContext<typeof userType>(null);

export default AuthUserContext;
