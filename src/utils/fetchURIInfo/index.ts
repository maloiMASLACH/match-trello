import React from 'react';
import { UserType } from '../../types/globalTypes';
import Firebase from '../fireBase';

const userType = new Firebase().auth.currentUser;

const FetchInfo = (
  firebase: Firebase,
  setUser: React.Dispatch<React.SetStateAction<typeof userType | null>>,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>,
) => firebase.auth.onAuthStateChanged((authUser) => {
  setUser(authUser);

  if (authUser?.email === 'admin@gmail.com') {
    firebase.users().once('value', (snapshot) => {
      const allUsers: UserType[] = Object.values(snapshot.val());
      const usersUid: string[] = [];

      allUsers.map((userInfo: UserType) => usersUid.push(userInfo.uid));

      setUsers(usersUid);
    });
  } else {
    setUsers([authUser!.uid]);
  }
});

export default FetchInfo;
