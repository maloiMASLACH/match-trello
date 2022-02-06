import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/pages/singIn/singIn';
import NavBar from './components/navbar/navBar';
import * as router from './constants/routerLinks';
import UserPage from './components/pages/userPage/userPage';
import Firebase from './utils/fireBase';
import AuthUserContext from './utils/sessionHandler';
import SingUpForm from './components/pages/singUp/singUp';
import AppPage from './components/pages/appPage/appPage';
import PasswordForget from './components/pages/passwordPages/passwordForget/passwordForget';
import PasswordReset from './components/pages/passwordPages/passwordReset/passwordReset';
import WelcomePage from './components/pages/welcomePage/welcomePage';
import AdminPage from './components/pages/adminPage/adminPage';
import FetchInfo from './utils/fetchInfo/fetchInfo';

interface AppProps{
  firebase: Firebase
}

const App = function (props:AppProps) {
  const { firebase } = props;
  const userType = new Firebase().auth.currentUser;
  const [user, setUser] = useState < typeof userType | null>(null);
  const [usersLinks, setUsers] = useState <string[]>([]);
  useEffect(() => {
    FetchInfo(firebase, setUser, setUsers);
  }, []);
  return (
    <BrowserRouter>
      <AuthUserContext.Provider value={user}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route element={<WelcomePage />} path={router.welcome} />
            <Route element={<SingInForm />} path={router.singIn} />
            <Route element={<SingUpForm />} path={router.singUp} />
            {usersLinks.map((path) => <Route path={path} element={<AppPage path={path} />} />)}
            <Route element={<UserPage />} path={router.userPage} />
            <Route element={<PasswordForget />} path={router.passForget} />
            <Route element={<PasswordReset />} path={router.passReset} />
            <Route element={<AdminPage />} path={router.admin} />
          </Routes>
        </div>
      </AuthUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
