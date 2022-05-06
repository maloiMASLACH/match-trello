import { AuthUserType } from '../../types';
import Firebase from '../fireBase';

const FetchURLInfo = (
  setUser: (el: AuthUserType) => void,
  firebase: Firebase,
) => {
  firebase.auth.onAuthStateChanged((authUser) => {
    let userIsAdmin = false;

    firebase
      .setAdmin(authUser?.uid || '')
      .once('value', (snapshot) => {
        userIsAdmin = snapshot.val();
      })
      .then(() => {
        setUser({
          isVerified: authUser?.emailVerified || false,
          isAdmin: userIsAdmin,
          userId: authUser?.uid || '',
          userMail: authUser?.email || '',
        });
      });
  });
};

export default FetchURLInfo;
