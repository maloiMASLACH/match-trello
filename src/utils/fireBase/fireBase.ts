import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import {
  ColumnFirebaseType,
  TaskFirebaseType,
} from '../../types/utils/firebaseTypes';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSEGE_SENDLER_ID,
};

class Firebase {
  auth: app.auth.Auth;

  db: app.database.Database;

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (
    email: string,
    password: string,
  ) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (
    email: string,
    password: string,
  ) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) => this.auth.currentUser!.updatePassword(password);

  user = (uid: string) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  setAdmin = (uid: string) => this.db.ref(`users/${uid}/isAdmin`);

  desk = (uid: string, deskObjId: number) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}`);

  column = (props: ColumnFirebaseType) => this.db.ref(
    `users/${props.uid.slice(1)}/desks/${props.deskObjId}/columns/${
      props.columnObjId
    }`,
  );

  columnPosition = (props: ColumnFirebaseType) => this.db.ref(
    `users/${props.uid.slice(1)}/desks/${props.deskObjId}/columns/${
      props.columnObjId
    }/position`,
  );

  task = (props: TaskFirebaseType) => this.db.ref(
    `users/${props.uid.slice(1)}/desks/${props.deskObjId}/columns/${
      props.columnObjId
    }/tasks/${props.taskObjId}`,
  );

  taskCompleted = (props: TaskFirebaseType) => this.db.ref(
    `users/${props.uid.slice(1)}/desks/${props.deskObjId}/columns/${
      props.columnObjId
    }/tasks/${props.taskObjId}/completed`,
  );

  taskPosition = (props: TaskFirebaseType) => this.db.ref(
    `users/${props.uid.slice(1)}/desks/${props.deskObjId}/columns/${
      props.columnObjId
    }/tasks/${props.taskObjId}/position`,
  );
}

export default Firebase;
