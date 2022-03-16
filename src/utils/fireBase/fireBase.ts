import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

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

  desk = (uid:string, deskObjName:string) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjName}`);

  column = (
    uid:string,
    deskObjName:string,
    columnObjName:string,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjName}/columns/${columnObjName}`);

  columnId = (
    uid:string,
    deskObjName:string,
    columnObjName:string,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjName}/columns/${columnObjName}/id`);

  task = (
    uid:string,
    deskObjName:string,
    columnObjName:string,
    taskObjName:string,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjName}/columns/${columnObjName}/tasks/${taskObjName}`);

  taskCompleted = (
    uid:string,
    deskObjName:string,
    columnObjName:string,
    taskObjName:string,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjName}/columns/${columnObjName}/tasks/${taskObjName}/completed`);

  taskId = (
    uid:string,
    deskObjName:string,
    columnObjName:string,
    taskObjName:string,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjName}/columns/${columnObjName}/tasks/${taskObjName}/id`);
}

export default Firebase;
