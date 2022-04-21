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

  desk = (uid:string, deskObjId:number) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}`);

  column = (
    uid:string,
    deskObjId:number,
    columnObjId:number,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}/columns/${columnObjId}`);

  columnPosition = (
    uid:string,
    deskObjId:number,
    columnObjId:number,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}/columns/${columnObjId}/position`);

  task = (
    uid:string,
    deskObjId:number,
    columnObjId:number,
    taskObjId:number,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}/columns/${columnObjId}/tasks/${taskObjId}`);

  taskCompleted = (
    uid:string,
    deskObjId:number,
    columnObjId:number,
    taskObjId:number,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}/columns/${columnObjId}/tasks/${taskObjId}/completed`);

  taskPosition = (
    uid:string,
    deskObjId:number,
    columnObjId:number,
    taskObjId:number,
  ) => this.db.ref(`users/${uid.slice(1)}/desks/${deskObjId}/columns/${columnObjId}/tasks/${taskObjId}/position`);

  sendRequest = (
    uid:string,
    sender:string,
    taskObjId:number,
  ) => this.db.ref(`users/${uid}/requests/received/${sender}/tasks/${taskObjId}`);

  setRequestComplete = (
    uid:string,
    sender:string,
    taskObjId:number,
  ) => this.db.ref(`users/${uid}/requests/received/${sender}/tasks/${taskObjId}/completed`);

  sendedTask = (
    uid:string,
    receiver:string,
    taskObjId:number,
  ) => this.db.ref(`users/${uid}/requests/sended/${receiver}/tasks/${taskObjId}`);

  requesterName = (
    uid:string,
    sender:string,
  ) => this.db.ref(`users/${uid}/requests/received/${sender}/sender/`);

  senderName = (
    uid:string,
    receiver:string,
  ) => this.db.ref(`users/${uid}/requests/sended/${receiver}/sender/`);

  senderTaskList = (
    uid:string,
    receiver:string,
  ) => this.db.ref(`users/${uid}/requests/received/${receiver}/tasks`);

  appointee = (
    uid:string,
    appointee:string,
  ) => this.db.ref(`users/${uid.slice(1)}/assignments/${appointee}`);

  assignment = (
    uid:string,
    appointee:string,
    assignment:string,
  ) => this.db.ref(`users/${uid.slice(1)}/assignments/${appointee}/tasks/${assignment}`);
}

export default Firebase;
