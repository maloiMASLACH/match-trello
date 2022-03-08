import React from 'react';
import { UserType } from '../../types/globalTypes';
import Firebase from '../fireBase';

const userType = new Firebase().auth.currentUser;

const FetchURLInfo = (
  setUser: (el:typeof userType) => void,
  setUsers:(el:string[]) => void,
  setUserValue: (el:UserType) => void,
  firebase: Firebase,
) => {
  firebase.auth.onAuthStateChanged((authUser) => {
    setUser(authUser);

    firebase.user(authUser!.uid).on('value', (snapshot) => {
      setUserValue(snapshot.val());
    });

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
};

export default FetchURLInfo;
