import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import {
  welcome, singIn, singUp, userPage,
} from '../../constants/routerLinks';
import AuthUserContext from '../../utils/sessionHandler';
import SingOut from '../pages/singOut/singOut';

const NavBarNoUser = function () {
  return (
    <nav>
      <div className="nav-wrapper  yellow darken-4 paddings1">
        <NavLink to={welcome} className="brand-logo ">Mach Trello</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to={singIn}>Sing In</NavLink></li>
          <li><NavLink to={singUp}>Sing Up</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

const NavBarWithUser = function () {
  return (
    <nav>
      <div className="nav-wrapper  yellow darken-4 paddings1">
        <NavLink to={welcome} className="brand-logo ">Mach Trello</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to={userPage}>User</NavLink></li>
          <li><SingOut /></li>
        </ul>
      </div>
    </nav>
  );
};

const NavBar = function () {
  return (
    <div>
      <AuthUserContext.Consumer>
        {(value) => (value ? <NavBarWithUser /> : <NavBarNoUser />)}

      </AuthUserContext.Consumer>
    </div>
  );
};

export default NavBar;
