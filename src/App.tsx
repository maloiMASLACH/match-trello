import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/singIn/singIn';
import SingUpForm from './components/singUp/singUp';
import NavBar from './components/navbar/navBar';
import WelcomePage from './components/welcomePage/welcomePage';
import AppPage from './components/appPage/appPage';
import * as router from './constants/routerLinks';
import UserPage from './components/userPage/userPage';
import Firebase from './utils/fireBase';
import AuthUserContext from './utils/sessionHandler';

interface AppProps{
  firebase: Firebase
}

const App = function (props:AppProps) {
  const { firebase } = props;
  const userType = new Firebase().auth.currentUser;
  const [user, setUser] = useState < typeof userType | null>(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });
  });
  return (
    <BrowserRouter>
      <AuthUserContext.Provider value={user}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route element={<WelcomePage />} path={router.welcome} />
            <Route element={<SingInForm />} path={router.singIn} />
            <Route element={<SingUpForm />} path={router.singUp} />
            <Route element={<AppPage />} path={router.app} />
            <Route element={<UserPage />} path={router.userPage} />
          </Routes>
        </div>
      </AuthUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
