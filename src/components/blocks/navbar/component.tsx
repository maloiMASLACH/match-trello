import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import routes from '../../../constants/routerLinks';
import SingOut from '../../pages/singOut';
import { NavBarProps } from '../../../types/navBar';

const NavBar = (props:NavBarProps) => {
  const { isAuthorized, isAdmin } = props;

  return (
    <nav>
      <div className="nav-wrapper paddings1">
        <NavLink to={routes.welcome} className="brand-logo">
          Mach Trello
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isAuthorized ? (
            <>
              <li>
                <NavLink to={routes.userPage}>User</NavLink>
              </li>
              {isAdmin && (
              <li>
                <NavLink to={routes.admin}>Admin</NavLink>
              </li>
              )}
              <li>
                <SingOut />
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={routes.singIn}>Sing In</NavLink>
              </li>
              <li>
                <NavLink to={routes.singUp}>Sing Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
