import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import Routes from '../../../constants/routerLinks';
import SingOut from '../../pages/singOut';
import { NavBarProps } from '../../../types/navBar';

const NavBar = (props:NavBarProps) => {
  const { isAuthorized, isAdmin } = props;

  return (
    <nav>
      <div className="nav-wrapper paddings1">
        <NavLink to={Routes.welcome} className="brand-logo">
          Mach Trello
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isAuthorized ? (
            <>
              <li>
                <NavLink to={Routes.userPage}>User</NavLink>
              </li>
              {isAdmin && (
              <li>
                <NavLink to={Routes.admin}>Admin</NavLink>
              </li>
              )}
              <li>
                <SingOut />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={Routes.singIn}>Sing In</NavLink>
              </li>
              <li>
                <NavLink to={Routes.singUp}>Sing Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
