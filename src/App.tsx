import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/pages/singIn';
import NavBar from './components/blocks/navbar';
import * as router from './constants/routerLinks';
import UserPage from './components/pages/userPage';
import { FirebaseContext } from './utils/fireBase';
import AuthUserContext from './utils/sessionHandler';
import SingUpForm from './components/pages/singUp';
import AppPage from './components/pages/appPage';
import PasswordForget from './components/pages/passwordPages/passwordForget';
import PasswordReset from './components/pages/passwordPages/passwordReset';
import WelcomePage from './components/pages/welcomePage';
import AdminPage from './components/pages/adminPage';
import FetchURLInfo from './utils/fetchURLInfo';
import { AuthUserType } from './types/globalTypes';
import ErrorPage from './components/pages/errorPage';

const App = () => {
  const firebase = useContext(FirebaseContext);

  const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
  const [user, setUser] = useState<AuthUserType>({
    isVerified: false, isAdmin: false, uid: '',
  });
  useEffect(() => {
    FetchURLInfo((userObj) => setUser(userObj), firebase);
  }, []);

  return (
    <BrowserRouter>
      <AuthUserContext.Provider value={user}>
        <div className={`page ${theme}`}>
          <NavBar isAuthorized={!!user.uid} isAdmin={user.isAdmin} />
          <div className="container">
            <Routes>
              <Route element={<WelcomePage />} path={router.welcome} />
              <Route element={<ErrorPage />} path="*" />
              <Route element={<SingInForm />} path={router.singIn} />
              <Route element={<SingUpForm />} path={router.singUp} />
              <Route element={<AppPage />} path={`${router.app}/:uid`} />
              <Route
                element={(
                  <UserPage
                    setTheme={(newTheme: string) => setTheme(newTheme)}
                  />
)}
                path={router.userPage}
              />
              <Route element={<PasswordForget />} path={router.passForget} />
              <Route element={<PasswordReset />} path={router.passReset} />
              <Route element={<AdminPage />} path={router.admin} />
            </Routes>
          </div>
        </div>
      </AuthUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
