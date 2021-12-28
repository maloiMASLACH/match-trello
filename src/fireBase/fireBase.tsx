import app from 'firebase/compat/app';
import 'firebase/compat/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGE_SENDLER_ID,
};

const firebase = app.initializeApp(config);
const auth = firebase.auth();

export const doCreateUserWithEmailAndPassword = (email:string, password:string) => {
  auth.createUserWithEmailAndPassword(email, password);
};

export const doSignInWithEmailAndPassword = (email:string, password:string) => {
  auth.signInWithEmailAndPassword(email, password);
};
export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email:string) => auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password:string) => {
  if (auth.currentUser) {
    auth.currentUser.updatePassword(password);
  }
};

export default firebase;
