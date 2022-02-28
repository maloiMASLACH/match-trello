import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/pages/singIn';
import NavBar from './components/blocks/navbar';
import * as router from './constants/routerLinks';
import UserPage from './components/pages/userPage';
import Firebase from './utils/fireBase';
import AuthUserContext from './utils/sessionHandler';
import SingUpForm from './components/pages/singUp';
import AppPage from './components/pages/appPage';
import PasswordForget from './components/pages/passwordPages/passwordForget';
import PasswordReset from './components/pages/passwordPages/passwordReset';
import WelcomePage from './components/pages/welcomePage';
import AdminPage from './components/pages/adminPage';
import FetchInfo from './utils/fetchURIInfo';

interface AppProps {
  firebase: Firebase;
}

const App = (props: AppProps) => {
  const { firebase } = props;

  const userType = new Firebase().auth.currentUser;
  const [user, setUser] = useState<typeof userType | null>(null);
  const [usersLinks, setUsers] = useState<string[]>([]);

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
            {usersLinks.map((path) => (
              <Route path={path} element={<AppPage path={path} />} />
            ))}
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
