import React, { useState } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/singIn/singIn';
import SingUpForm from './components/singUp/singUp';
import NavBar from './components/navbar/navBar';
import WelcomePage from './components/welcomePage/welcomePage';
import AppPage from './components/appPage/appPage';
import * as router from './constants/routerLinks';
import UserPage from './components/userPage/userPage';

const App: React.FC = function () {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <NavBar user={user} />
      <div className="container">
        <Routes>
          <Route element={<WelcomePage />} path={router.welcome} />
          <Route element={<SingInForm />} path={router.singIn} />
          <Route element={<SingUpForm />} path={router.singUp} />
          <Route element={<AppPage />} path={router.app} />
          <Route element={<UserPage />} path={router.userPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
