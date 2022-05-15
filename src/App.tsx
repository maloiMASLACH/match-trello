import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/blocks/navbar';
import {
  WelcomePage, ErrorPage, SingInForm, SingUpForm,
  AppPage, UserPage, PasswordForget, PasswordReset, AdminPage,
} from './components/pages';
import { LocalStorageKeys, RouterLinks, voidAuthUser } from './constants';
import themes from './constants/themes';
import { AuthUserType } from './types';
import { FirebaseContext, fetchURLInfo, AuthUserContext } from './utils';

const App = () => {
  const firebase = useContext(FirebaseContext);

  const [theme, setTheme] = useState(
    localStorage.getItem(LocalStorageKeys.Theme) || themes[0],
  );
  const [user, setUser] = useState<AuthUserType>(voidAuthUser);

  const handleTheme = (option: ChangeEvent<HTMLSelectElement>) => {
    localStorage.setItem(LocalStorageKeys.Theme, option.target.value);

    setTheme(option.target.value);
  };

  useEffect(() => {
    fetchURLInfo(setUser, firebase);
  }, []);

  return (
    <BrowserRouter>
      <AuthUserContext.Provider value={user}>
        <div className="page" data-theme={theme}>
          <NavBar isAuthorized={!!user.userId} isAdmin={user.isAdmin} />
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
