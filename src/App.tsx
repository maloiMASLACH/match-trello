import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/pages/singIn';
import NavBar from './components/blocks/navbar';
import RouterLinks from './constants/routerLinks';
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
    localStorage.getItem(LocalStorageKeys.Theme) || themes[0],
  );
  const [user, setUser] = useState<AuthUserType>({
    isVerified: false,
    isAdmin: false,
    uid: '',
  });

  const handleTheme = (value: string) => {
    localStorage.setItem(LocalStorageKeys.Theme, value);

    setTheme(value);
  };

  useEffect(() => {
    FetchURLInfo(setUser, firebase);
  }, []);

  return (
    <BrowserRouter>
      <AuthUserContext.Provider value={user}>
        <div className="page" data-theme={theme}>
          <NavBar isAuthorized={!!user.uid} isAdmin={user.isAdmin} />
          <div className="container">
            <Routes>
              <Route element={<WelcomePage />} path={RouterLinks.Welcome} />
              <Route element={<ErrorPage />} path="*" />
              <Route element={<SingInForm />} path={RouterLinks.SingIn} />
              <Route element={<SingUpForm />} path={RouterLinks.SingUp} />
              <Route element={<AppPage />} path={`${RouterLinks.App}/:uid`} />
              <Route
                element={<UserPage handleTheme={handleTheme} />}
                path={RouterLinks.UserPage}
              />
              <Route element={<PasswordForget />} path={RouterLinks.PassForget} />
              <Route element={<PasswordReset />} path={RouterLinks.PassReset} />
              <Route element={<AdminPage />} path={RouterLinks.Admin} />
            </Routes>
          </div>
        </div>
      </AuthUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
