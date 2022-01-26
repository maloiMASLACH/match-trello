import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import {
  welcome, singIn, singUp, userPage,
} from '../../constants/routerLinks';
import SingOut from '../singOut/singOut';
import { User } from '../../constants/interfaces';

interface NavBarProps{
  setUser:React.Dispatch<React.SetStateAction<User>>,
  user:User
}

interface NavBarWithUserProps{
  setUser:React.Dispatch<React.SetStateAction<User>>,
}

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

const NavBarWithUser = function (props:NavBarWithUserProps) {
  const { setUser } = props;
  return (
    <nav>
      <div className="nav-wrapper  yellow darken-4 paddings1">
        <NavLink to={welcome} className="brand-logo ">Mach Trello</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to={userPage}>User</NavLink></li>
          <li><SingOut setUser={setUser} /></li>
        </ul>
      </div>
    </nav>
  );
};

const NavBar = function (props:NavBarProps) {
  const { setUser, user } = props;
  console.log({ user });
  return (<div>{user.email ? <NavBarWithUser setUser={setUser} /> : <NavBarNoUser />}</div>);
};

export default NavBar;
