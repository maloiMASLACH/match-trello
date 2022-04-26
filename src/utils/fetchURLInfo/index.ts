import { AuthUserType } from '../../types/globalTypes';
import Firebase from '../fireBase';

const FetchURLInfo = (
  setUser: (el: AuthUserType) => void,
  firebase: Firebase,
) => {
  firebase.auth.onAuthStateChanged((authUser) => {
    setUser({
      isVerified: authUser?.emailVerified || false,
      isAdmin: authUser?.uid === 'XyjS1TO9qCYcnRtuy5Oc4Aij1RU2',
      userId: authUser?.uid || '',
      userMail: authUser?.email || '',
    });
  });
};

export default FetchURLInfo;
