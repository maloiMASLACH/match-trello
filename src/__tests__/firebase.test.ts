import { unmountComponentAtNode } from 'react-dom';
import app from 'firebase/compat/app';
import Firebase from '../utils/fireBase';

const container = document.createElement('div');
beforeEach(() => {
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});
const onAuthStateChanged = jest.fn();

const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve('result of createUserWithEmailAndPassword'));

const signInWithEmailAndPassword = jest.fn(() => Promise.resolve('result of signInWithEmailAndPassword'));

jest.mock('firebase/compat/app', () => ({
  auth: jest.fn().mockImplementation(() => ({
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  })),
  database: jest.fn().mockReturnThis(),
  currentUser: {
    email: 'test',
    uid: '123',
    emailVerified: true,
  },

  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(() => ({
    user: {
      sendEmailVerification: jest.fn(),
    },
  })),
  initializeApp: jest.fn(),
}));

describe('Test for signup (email,password)', () => {
  it('createUserWithEmailAndPassword ()', async () => { // this works
    await new Firebase().doCreateUserWithEmailAndPassword('mail', 'pass');
    expect(app.auth().createUserWithEmailAndPassword).toBeCalledWith('mail', 'pass');
  });
});
