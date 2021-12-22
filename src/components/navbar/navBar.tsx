import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

const NavBar: React.FunctionComponent = function () {
  return (
    <nav>
      <div className="nav-wrapper  yellow darken-4 paddings1">
        <NavLink to="/" className="brand-logo ">Mach Trello</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/singin">Sing In</NavLink></li>
          <li><NavLink to="/singup">Sing Up</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
