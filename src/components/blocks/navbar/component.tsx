import React from 'react';
import './styles.css';
import { NavLink } from 'react-router-dom';
import {
  welcome,
  singIn,
  singUp,
  userPage,
  admin,
} from '../../../constants/routerLinks';
import AuthUserContext from '../../../utils/sessionHandler';
import SingOut from '../../pages/singOut';

const NavBar = () => (
  <div>
    <AuthUserContext.Consumer>
      {
        (value) => (
          <nav>
            <div className="nav-wrapper  yellow darken-4 paddings1">
              <NavLink to={welcome} className="brand-logo">
                Mach Trello
              </NavLink>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {value ? (
                  <>
                    <li>
                      <NavLink to={userPage}>User</NavLink>
                    </li>
                    {value.email === 'admin@gmail.com' && (
                    <li>
                      <NavLink to={admin}>Admin</NavLink>
                    </li>
                    )}
                    <li>
                      <SingOut />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to={singIn}>Sing In</NavLink>
                    </li>
                    <li>
                      <NavLink to={singUp}>Sing Up</NavLink>
                    </li>
                  </>
                ) }
              </ul>
            </div>
          </nav>
        )
      }
    </AuthUserContext.Consumer>
  </div>
);
export default NavBar;
