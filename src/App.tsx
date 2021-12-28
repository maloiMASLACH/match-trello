import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/singIn/singIn';
import SingUpForm from './components/singUp/singUp';
import NavBar from './components/navbar/navBar';
import WelcomePage from './components/welcomePage/welcomePage';
import AppPage from './components/appPage/appPage';
import * as router from './constants/roterLinks';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          {console.log(process.env)}
          <Route element={<WelcomePage />} path={router.welcome} />
          <Route element={<SingInForm />} path={router.singin} />
          <Route element={<SingUpForm />} path={router.singup} />
          <Route element={<AppPage />} path={router.app} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
