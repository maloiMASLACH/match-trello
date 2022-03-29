import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/pages/singIn';
import NavBar from './components/blocks/navbar';
import routes from './constants/routerLinks';
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
import LocalStorageKeys from './constants/localStorageKeys';
import themes from './constants/themes';

const App = () => {
  const firebase = useContext(FirebaseContext);

  const [theme, setTheme] = useState(
    localStorage.getItem(LocalStorageKeys.theme) || themes[0],
  );
  const [user, setUser] = useState<AuthUserType>({
    isVerified: false,
    isAdmin: false,
    uid: '',
  });

  const handleTheme = (value: string) => {
    localStorage.setItem(LocalStorageKeys.theme, value);

    setTheme(value);
  };

  useEffect(() => {
    FetchURLInfo(setUser, firebase);
  }, []);

  return (
    <BrowserRouter>
      <AuthUserContext.Provider value={user}>
        <div className={`page ${theme}Page`}>
          <NavBar isAuthorized={!!user.uid} isAdmin={user.isAdmin} />
          <div className="container">
            <Routes>
              <Route element={<WelcomePage />} path={routes.welcome} />
              <Route element={<ErrorPage />} path="*" />
              <Route element={<SingInForm />} path={routes.singIn} />
              <Route element={<SingUpForm />} path={routes.singUp} />
              <Route element={<AppPage />} path={`${routes.app}/:uid`} />
              <Route
                element={<UserPage handleTheme={handleTheme} />}
                path={routes.userPage}
              />
              <Route element={<PasswordForget />} path={routes.passForget} />
              <Route element={<PasswordReset />} path={routes.passReset} />
              <Route element={<AdminPage />} path={routes.admin} />
            </Routes>
          </div>
        </div>
      </AuthUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
