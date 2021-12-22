import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SingInForm from './components/singIn/singIn';
import SingUpForm from './components/singUp/singUp';
import NavBar from './components/navbar/navBar';
import WelcomePage from './components/welcomePage/welcomePage';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route element={<WelcomePage />} path="/" />
          <Route element={<SingInForm />} path="/singin" />
          <Route element={<SingUpForm />} path="/singup" />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
